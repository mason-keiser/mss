require('dotenv/config');
const express = require('express');

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