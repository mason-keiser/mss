require('dotenv/config');
const express = require('express');
const exphbs = require('express-handlebars')
const nodemailer = require('nodemailer')

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query(`select 'successfully connected' as "message"`)
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

// API TO SEND EMAIL TO USER

app.post('/api/send', (req, res, next) => {
  const orderId = Math.floor(1000 + Math.random() * 9000)

  const output = `
  <p>Thank You For Placing An Order With Us</p>
  <h3>Order Details</h3>
  <h3>Order Number #${orderId} </h3>
  <ul>
    <li>Email: ${req.body.email}</li>
    <li>Address: ${req.body.address}</li>
  </ul>
  <div>
    <h2>Mas' Surf Shop</h2>
  </div>
  `

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'masonssurfshop@gmail.com',
      pass: '63Rdbase18!'
    },
  
  });

  const mailOptions = {
    from: '"Mas Surf Shop" <zachariah.harvey54@ethereal.email>',
    to: req.body.email,
    subject: "Thanks for Your Order!",
    text: "Hello world?",
    html: output,
  }

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error)
    } else {
      console.log('email sent')
    }
  });

  
  console.log("Message sent: %s");
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

})

//API TO GET ALL PRODUCTS

app.get('/api/getAllProducts', (req, res, next) => {
  const sql = `
  SELECT * FROM products
  `

  db.query(sql)
  .then(result => {
    if (!result){
      return res.status(400).json({ message: `get products attempt was unsuccessful`})
    }
    return res.status(200).json(result.rows)
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  });

})

// API TO SEARCH DB FOR POSTS BY NAME OR DESCRIPTION

app.get('/api/searchProducts/:word', (req, res, next) => {
  const word= req.params.word + ':*';
  const sql = `
  SELECT * FROM  "products"
  WHERE to_tsvector("name"|| ' ' || "description") @@ to_tsquery($1)
  `;

  db.query(sql, [word])
    .then(result => {
      if (!result.rows[0]) {
        return res.status(200).json({ message: `No notes contain: ${req.params.word}` });
      } else {
        return res.status(200).json(result.rows);
      }
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'An unexpected error occurred.' });
    });
})

// APP TO GET CART

app.get('/api/cart', (req, res, next) => {
  if (!req.session.cartId) {
    return res.status(200).json([])
  }
  const id = [req.session.cartId]
  const cartItems = `
  SELECT "c"."cartItemId",
         "c"."price",
         "c"."quantity",
         "p"."productid",
         "p"."image",
         "p"."name",
         "p"."description"
  FROM "cartItems" AS "c"
  JOIN "products" AS "p" USING ("productid")
  WHERE "c"."cartId" = $1
  `
  db.query(cartItems, id)
    .then(response => res.status(200).json(response.rows))
})

// API TO POST TO CART

app.post('/api/cartPost', (req, res, next) => {
  const productId = parseInt(req.body.productId);
  const quantity = req.body.quantity
  if (!Number.isInteger(productId) || productId <= 0) {
    return res.status(400).json({ error: 'productId must be a positive integer' });
  }
  const checkForPriceSQL = `
  SELECT "price"
  FROM   "products"
  WHERE  "productid" = $1;
  `;

  db.query(checkForPriceSQL, [productId])
    .then(response => {
      if (!response.rows[0]) {
        throw new ClientError(`a product with ID: ${productId} does not exist`, 404);
      }
      const price = response.rows[0].price;
      const newRowSQL = `
      INSERT INTO "carts" ("cartId", "createdAt")
      VALUES      (default, default)
      RETURNING   "cartId";
      `;
      if (req.session.cartId) {
        const currentInfo = { productPrice: price, cartId: req.session.cartId };
        return currentInfo;
      }
      return db.query(newRowSQL)
        .then(response => {
          const newInfo = { productPrice: price, cartId: response.rows[0].cartId };
          return newInfo;
        });

    })
    .then(newInfo => {
      req.session.cartId = newInfo.cartId;
      const cartItemsSQL = `
      INSERT INTO"cartItems" ("cartId", "productid", "price", "quantity")
      VALUES                 ($1, $2, $3, $4)
      RETURNING              "cartItemId";`;
      return db.query(cartItemsSQL, [newInfo.cartId, productId, newInfo.productPrice, quantity]);
    })
    .then(response => {

      const cartItemInfoSQL = `
      SELECT "c"."cartItemId",
             "c"."price",
             "c"."quantity",
             "p"."productid",
             "p"."image",
             "p"."name",
             "p"."description"
      FROM   "cartItems" as "c"
      JOIN   "products" as "p" using ("productid")
      WHERE  "c"."cartItemId" = $1;
      `;
      return db.query(cartItemInfoSQL, [response.rows[0].cartItemId])
        .then(response => res.status(201).json(response.rows));
    })
    .catch(err => next(err));
});

// API TO DELETE CART ITEM

app.delete('/api/deleteItem' , (req, res, next) => {
  const cartItemId = req.body.cartItemId;
  const sql = `
  DELETE FROM "cartItems"
  WHERE "cartItemId" = $1
  RETURNING *
  `

  db.query(sql, [cartItemId])
  .then(result => {
    if (!result.rows[0]) {
      return res.status(200).json({ message: `NO return array` });
    } else {
      return res.status(200).json(result.rows[0]);
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  });
})

// API TO UPDATE ITEM QTY

app.put('/api/updQty', (req, res, next) => {
  const cartItemId = req.body.cartItemId;
  const newQty = req.body.qty;
  const session = req.session.cartId;
  const sql = `
  UPDATE "cartItems"
  SET "quantity" = $1
  WHERE "cartItemId" = $2
  RETURNING *
  `

  const nSql = `
  SELECT * FROM "cartItems"
  INNER JOIN "products" ON "cartItems".productid="products".productid
  WHERE "cartId" = $1
  `

  db.query(sql, [newQty, cartItemId])
  .then(result => {
    if (!result.rows) {
      return res.status(200).json({ message: `NO return array` });
    } else {
      db.query(nSql, [result.rows[0].cartId])
      .then(result => {
        if (!result.rows[0]) {
          return res.status(200).json({ message: `NO return array` });
        } else {
          result.rows.forEach((i) => {
            delete i.description
          })
          return res.status(200).json(result.rows);
        }
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ error: 'An unexpected error occurred.' });
      });
    }
  })
  .catch(err => {
    console.error(err);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  });
})

// API TO POST ORDER

app.post('/api/orders', (req, res, next) => {
  if(!req.session.cartId) {
    throw new ClientError("there isn't a cart connected to this order", 400)
  } else {
    const sql = `
    INSERT INTO "orders" ("cartId", "email", "creditcard", "address")
    VALUES      ($1, $2, $3, $4)
    RETURNING   "creditcard", "email", "address", "orderId", "createdAt"
    `

    const delSQL = `
    DELETE FROM "cartItems"
    WHERE "cartId" = $1
    `
    const params = [req.session.cartId, req.body.email, req.body.creditcard, req.body.address];
    return db.query(sql, params)
      .then(result => {
        res.status(201).json(result.rows[0]); 
        db.query(delSQL, [req.session.cartId])
        .then(result => {
          if (!result.rows) {
            return res.status(200).json({ message: `NO return array` });
          } else {
            return res.status(200).json(result.rows[0]);
          }
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ error: 'An unexpected error occurred.' });
        });
      })
      .catch(err => next(err))
  }
})

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});