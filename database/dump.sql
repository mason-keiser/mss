--
-- PostgreSQL database dump
--

-- Dumped from database version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)
-- Dumped by pg_dump version 10.12 (Ubuntu 10.12-0ubuntu0.18.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.orders DROP CONSTRAINT IF EXISTS orders_pkey;
ALTER TABLE IF EXISTS ONLY public.carts DROP CONSTRAINT IF EXISTS carts_pkey;
ALTER TABLE IF EXISTS ONLY public."cartItems" DROP CONSTRAINT IF EXISTS "cartItems_pkey";
ALTER TABLE IF EXISTS public.products ALTER COLUMN productid DROP DEFAULT;
ALTER TABLE IF EXISTS public.orders ALTER COLUMN "orderId" DROP DEFAULT;
ALTER TABLE IF EXISTS public.carts ALTER COLUMN "cartId" DROP DEFAULT;
ALTER TABLE IF EXISTS public."cartItems" ALTER COLUMN "cartItemId" DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.products_productid_seq;
DROP TABLE IF EXISTS public.products;
DROP SEQUENCE IF EXISTS public."orders_orderId_seq";
DROP TABLE IF EXISTS public.orders;
DROP SEQUENCE IF EXISTS public."carts_cartId_seq";
DROP TABLE IF EXISTS public.carts;
DROP SEQUENCE IF EXISTS public."cartItems_cartItemId_seq";
DROP TABLE IF EXISTS public."cartItems";
DROP EXTENSION IF EXISTS plpgsql;
DROP SCHEMA IF EXISTS public;
--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: cartItems; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public."cartItems" (
    "cartItemId" integer NOT NULL,
    "cartId" integer NOT NULL,
    productid integer NOT NULL,
    price integer NOT NULL,
    quantity integer
);


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."cartItems_cartItemId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."cartItems_cartItemId_seq" OWNED BY public."cartItems"."cartItemId";


--
-- Name: carts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.carts (
    "cartId" integer NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: carts_cartId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."carts_cartId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: carts_cartId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."carts_cartId_seq" OWNED BY public.carts."cartId";


--
-- Name: orders; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.orders (
    "orderId" integer NOT NULL,
    "cartId" integer NOT NULL,
    email text NOT NULL,
    creditcard text NOT NULL,
    address text NOT NULL,
    "createdAt" timestamp(6) with time zone DEFAULT now() NOT NULL
);


--
-- Name: orders_orderId_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public."orders_orderId_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: orders_orderId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public."orders_orderId_seq" OWNED BY public.orders."orderId";


--
-- Name: products; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.products (
    productid integer NOT NULL,
    itemtype integer,
    name text NOT NULL,
    price integer NOT NULL,
    image character varying(500) NOT NULL,
    description character varying(10000) NOT NULL
);


--
-- Name: products_productid_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.products_productid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: products_productid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.products_productid_seq OWNED BY public.products.productid;


--
-- Name: cartItems cartItemId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems" ALTER COLUMN "cartItemId" SET DEFAULT nextval('public."cartItems_cartItemId_seq"'::regclass);


--
-- Name: carts cartId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts ALTER COLUMN "cartId" SET DEFAULT nextval('public."carts_cartId_seq"'::regclass);


--
-- Name: orders orderId; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders ALTER COLUMN "orderId" SET DEFAULT nextval('public."orders_orderId_seq"'::regclass);


--
-- Name: products productid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN productid SET DEFAULT nextval('public.products_productid_seq'::regclass);


--
-- Data for Name: cartItems; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public."cartItems" ("cartItemId", "cartId", productid, price, quantity) FROM stdin;
103	4	8	500	2
104	4	16	22000	1
105	4	20	88000	1
106	4	7	5500	1
109	5	1	75000	1
110	6	26	6500	1
111	7	26	6500	1
112	6	25	7000	1
113	6	10	9999	1
\.


--
-- Data for Name: carts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.carts ("cartId", "createdAt") FROM stdin;
1	2021-04-22 21:02:51.368093+00
2	2021-04-22 21:28:07.319147+00
3	2021-04-22 21:55:17.093062+00
4	2021-04-23 23:26:22.682859+00
5	2021-04-24 00:08:40.696943+00
6	2021-04-27 02:20:23.802027+00
7	2021-04-27 02:20:49.017912+00
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.orders ("orderId", "cartId", email, creditcard, address, "createdAt") FROM stdin;
1	7	masonksr5@gmail.com	123123124	9 sunningdale	2021-04-27 02:47:01.175269+00
2	6	masonksr5@gmail.com	123123124	9 sunningdale	2021-04-27 02:47:42.139927+00
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (productid, itemtype, name, price, image, description) FROM stdin;
1	1	Pyzel Ghost Surfboard	75000	/images/boards/pyzel.jpg	The Ghost has been developed with the Pyzel Team riders over a number of years to give you a board that performs in Bigger Better Waves. With full volume through the front section combined with a lower rocker, the Ghost can really fly while the round tail and double concave in the lower half help keep you in control.The Pyzel Ghost goes best in more powerful waves like reef breaks, drainy, dumpy beach breaks or when you want to draw long lines on your favourite point break.
3	1	Blank Lost Hydra Surfboard	60000	/images/boards/blankHydra.webp	The HYDRA is a minuscule wave monster, melding more than 25 years of developing small wave fish and mini wave hybrids. It implements proven design details from a myriad of models like the Puddle Jumper, Bottom Feeder, Pelagic, and most recently the RNF-Retro.  Built around an overall low rocker paired to an almost traditional “fish” outline, this little sea monster is a mini-wave weapon. It features multiple magic making design elements which bring The HYDRA to life.On the outline, we’ve continued with the snowboard influenced “Pelagic” side cut outline. From our original Pelagic, to the RNF-Retro and on to the new SWORD-FISH, every board featuring this outline has worked above expectations.  It noticeably locks into the wave during carves and shortens the radius of turns while both gaining speed and maintaining control.
4	1	Firewire Surboard || Flat Earth	85000	/images/boards/firewire.webp	Introducing the Flat Earth: a board built to shred ankle high to overhead surf. Designed by Akila Aipa and dialed-in by Kelly Slater, this model is ready to be your go-to board whatever the conditions of the day. Finesse and flow in waves chest to head high, sized at your normal shortboard volume or a couple liters more.  Experiment with a twin + trailer or twin without trailer, because this shape surfs on a spectrum from loose and slidey in smaller sizes with two twin fins, to grippy and drivey in larger sizes with a trailer added. In summary, let the Flat Earth blow your mind as a twin fin, or sip the serum in doses with a trailer fin. Feel the speed. Hit the lip. Bury the rail.
5	2	Billabong Furnace Wetsuit 4/3	35000	/images/wetsuits/billabongfurnace.jpg	Boost your heat and your airs with the ultra lightweight Furnace Carbon Comp wetsuit. New for the 2019/2020 season, Billabong’s cold water competition performance wetsuit now features Billabong exclusive Furnace Graphene. Innovative new graphene wrapped yarns combine with carbon fibers for a wetsuit that is lighter, stronger and warmer for longer. Furnace Graphene is 50% lighter than traditional hollow fiber liners and 200x stronger than steel. Created from Smart Foam made from 30% upcycled car tires, the suit features a 300% stretch while adding more heat and less weight. Utilizing Airlite Stretch external jersey technology, the exclusive engineered perforated knit is able to stretch 350%. A Comp chest zip entry system allows for an easy on-off. Every layer is constructed with incredible flexibility for optimal performance.
6	2	Billabong Comp Revolution Wetsuit 3/2	37500	/images/wetsuits/billabongsuit.jpg	Heritage lines are reborn, backed by modern wetsuit technology. Maintaining core lines, the Revolution Series wetsuits utilize premium wetsuit innovations and new eco materials, creating a suit that delivers both performance and signature style. The Revolution fullsuit is lined at the front and back panels with incredibly lightweight and strong Graphene-infused yarns, now infused with 100% recycled fibers, keeping you warmer and faster for longer. Made from upcycled car tires, the eco-conscious Superlight Foam is topped with Superflex Recycler jersey, offering a lightweight feel and superior heat.
7	3	JJF Dakine 8" Surf Leash	5500	/images/accessories/dakinesurfleash.webp	AN EIGHT-FOOT SURF LEASH DESIGNED FOR SURFING WAVES IN THE DOUBLE OVERHEAD RANGE. John John Florence sets a high standard on the water. His signature Kainui leash follows suit. Designed for surfing waves in the double overhead range, it features the highest quality 1/4-inch (6.5mm) urethane Dura-Cord with molded ends to keep you connected to your board in big surf. Dakine built its reputation on the surf leash, and everything about this leash is designed with durability, performance and comfort in mind. All John John Florence products feature recycled cardboard packaging with no plastic to help keep our oceans clean for tomorrow.
8	3	Mr. Zogs Sex Wax	500	/images/accessories/sexwax.jpg	Sexwax Quick Humps surfboard wax formulas are the "go to" choice for professional and experienced surfers around the world. Find the ideal balance between stability and stickiness by utilizing these formulas alone or as part of a Basecoat/Topcoat combination. Each bar individually packaged in shrink film.
9	3	Sticky Bumps Surfboard Wax	700	/images/accessories/stickybumps.jpg	The Sticky Bumps Original Cold Wax is the softest formula wax for water temps below 60°F. Long-lasting and easy to apply, this is also the first traction wax that broke away from the use of a paraffin-based recipe.
2	1	Lost Hydra Surfboard	65000	/images/boards/lostHydrya.webp	The HYDRA is a minuscule wave monster, melding more than 25 years of developing small wave fish and mini wave hybrids. It implements proven design details from a myriad of models like the Puddle Jumper, Bottom Feeder, Pelagic, and most recently the RNF-Retro.  Built around an overall low rocker paired to an almost traditional “fish” outline, this little sea monster is a mini-wave weapon. It features multiple magic making design elements which bring The HYDRA to life.On the outline, we’ve continued with the snowboard influenced “Pelagic” side cut outline. From our original Pelagic, to the RNF-Retro and on to the new SWORD-FISH, every board featuring this outline has worked above expectations.  It noticeably locks into the wave during carves and shortens the radius of turns while both gaining speed and maintaining control.
10	3	Furnace Carbon Ultra 7mm Booties	9999	/images/accessories/billabongbooties.jpg	This new Furnace Carbon Ultra 7mm boot offers superior protection from the cold, while still providing great board feel.
23	2	E7 Unlimited E-Bomb 3/2 Wetsuit	28000	/images/wetsuits/ripcurlnice.webp	A 3 year project from the Rip Curl Wetsuit development team and Rip Curl World Champion surfers Tyler Wright, Mick Fanning and Gabriel Medina has produced, the unlimited edition E-Bomb. Featuring Rip Curl’s latest breakthrough in high stretch neoprene, E7 in the upper body. This single one piece panel stretches from wrist to wrist and with no seams provides the full stretch performance benefits of E7. The body of the suit features E6 neoprene and the entire suit has internal Thermo Lining for stretch, comfort and warmth. Designed for ultimate performance… Made By World Champions.
24	2	ONeill Hyperfreak 3/2 Wetsuit	31000	/images/wetsuits/oneil.jpg	Say goodbye to uncomfortable wetsuits of the past - the ONeill Hyperfreak 3/2+MM Chest Zip Full Wetsuit will show you just how comfortable a wetsuit can be, and has all the warmth you need to get an early start on the season! The HyperFreak F.U.Z.E. (Chest Zip) is constructed with super light TechnoButter 3 and TechnoButter 3X neoprene. ONeill added 0.5mm thicker material as a set-up from the Hyperfreak Comp. The minimal seam design, lightweight, quality construction, and attention to detail make this another favorite inspired by ONeill team riders.
15	2	North Seas 4/3 Wetsuit	39999	/images/wetsuits/northseas.webp	Vissla’s warmest and most water tight suit featuring: I-Foam Premium- the lightest weight, warmest & stretchiest Japanese limestone based neoprene available; significantly less weight, enhanced flexibility and superior comfort. Full body hollow fiber Brain Fuzz lining insulates heat and dries fast. Upcycled Nylon XTEND exterior fabric: Eco-friendly, lighter, flexible, anti-fade stretch jersey made by Bluesign approved mills. Dope Dyed Fabric- A softer, eco-friendly, anti-fade made by Bluesign approved mills. AquaA eco-friendly water-based lamination is completely solvent free with no harmful chemicals.
16	2	Buell RB1 Accelerator Wetsuit	22000	/images/wetsuits/buell.webp	The RB1 flies under the radar, and when used strategically, can lend limitless buckets of spray to any lip that dares get in your way. Without giving up the warmth that Buell Wetsuits are known for, this suit doubles down on flexibility. With its masterful blend of pliable "Ninja Neoprene" coupled with ergonomic, perfectly placed panels, the RB1 is your go-to wetsuit that keeps the crowd gasping as your spray extends to the heavens...
18	1	Channel Islands Thruster Surfboard	82000	/images/boards/cisampler.jpg	The Sampler surfboard can certainly be classified as a performance groveller board with elements taken from the Dumpster Diver but with more refined features such as a more pronounced pivotal hip for added manoeuvrability. The flat rocker runs throughout the board with medium entry and exit rocker and provides speed and the curve out to the tail allows for tight transitions and airs. The template is generous for ample paddle power but is still refined enough towards the nose to allow for turning without sacrificing on performance. 
20	1	Channel Islands Fishbeard Surfboard	88000	/images/boards/fishbeard.jpg	The FishBeard is pure business in the front and all party in the back. Get forward on this user-friendly board and drive from the center and you’ll have all the speed and flow you always desired. Step back on the tail to engage the fins and rails, which provides you hold, pivot, projection and the freedom to rip as hard as ever. To keep the party going, we dug into the archives and found some vintage mid-80’s, fluorescent logos and recreated CI’s iconic layup from that era.
25	3	XCEL 2mm Drylock Wetsuit Hood	7000	/images/accessories/hoodie.jpg	The XCEL 2mm Drylock Hood with Bill and Neck Dam features a contoured fit with a Smooth Skin seal for less flushing and maximum warmth. Revolutionary Celliant Black material offers unmatched, continuous warmth that retains body heat and increases blood flow.
26	3	1.5mm Vissla HIGH SEAS Wetsuit Gloves	6500	/images/accessories/gloves.jpg	Designed for the surfer who does not enjoy wearing wetsuit gloves, these 1.5mm Vissla HIGH SEAS Wetsuit Gloves give you that barely there feel while still keeping your hands and fingers warm and protected from chilly water sessions. Made with 100% stretch neoprene, these gloves have a wind-resistant duramax smooth skin exterior with a water tight cuff, a full thermal lining for added warmth and fast drying time, durable Taitex sealed seams to keep water out, and a 5-finger design for all of you like to move all your fingers around comfortably.
\.


--
-- Name: cartItems_cartItemId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."cartItems_cartItemId_seq"', 113, true);


--
-- Name: carts_cartId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."carts_cartId_seq"', 7, true);


--
-- Name: orders_orderId_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public."orders_orderId_seq"', 2, true);


--
-- Name: products_productid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_productid_seq', 26, true);


--
-- Name: cartItems cartItems_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public."cartItems"
    ADD CONSTRAINT "cartItems_pkey" PRIMARY KEY ("cartItemId");


--
-- Name: carts carts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.carts
    ADD CONSTRAINT carts_pkey PRIMARY KEY ("cartId");


--
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY ("orderId");


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

