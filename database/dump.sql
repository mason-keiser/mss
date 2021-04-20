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

ALTER TABLE IF EXISTS public.products ALTER COLUMN productid DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.products_productid_seq;
DROP TABLE IF EXISTS public.products;
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
-- Name: products productid; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.products ALTER COLUMN productid SET DEFAULT nextval('public.products_productid_seq'::regclass);


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.products (productid, itemtype, name, price, image, description) FROM stdin;
1	1	Pyzel Ghost Surfboard	75000	/images/boards/pyzel.jpg	The Ghost has been developed with the Pyzel Team riders over a number of years to give you a board that performs in Bigger Better Waves. With full volume through the front section combined with a lower rocker, the Ghost can really fly while the round tail and double concave in the lower half help keep you in control.The Pyzel Ghost goes best in more powerful waves like reef breaks, drainy, dumpy beach breaks or when you want to draw long lines on your favourite point break.
2	1	Lost Hydra Surfboard	65000	/images/boards/lostHydra.webp	The HYDRA is a minuscule wave monster, melding more than 25 years of developing small wave fish and mini wave hybrids. It implements proven design details from a myriad of models like the Puddle Jumper, Bottom Feeder, Pelagic, and most recently the RNF-Retro.  Built around an overall low rocker paired to an almost traditional “fish” outline, this little sea monster is a mini-wave weapon. It features multiple magic making design elements which bring The HYDRA to life.On the outline, we’ve continued with the snowboard influenced “Pelagic” side cut outline. From our original Pelagic, to the RNF-Retro and on to the new SWORD-FISH, every board featuring this outline has worked above expectations.  It noticeably locks into the wave during carves and shortens the radius of turns while both gaining speed and maintaining control.
3	1	Blank Lost Hydra Surfboard	60000	/images/boards/blankHydra.webp	The HYDRA is a minuscule wave monster, melding more than 25 years of developing small wave fish and mini wave hybrids. It implements proven design details from a myriad of models like the Puddle Jumper, Bottom Feeder, Pelagic, and most recently the RNF-Retro.  Built around an overall low rocker paired to an almost traditional “fish” outline, this little sea monster is a mini-wave weapon. It features multiple magic making design elements which bring The HYDRA to life.On the outline, we’ve continued with the snowboard influenced “Pelagic” side cut outline. From our original Pelagic, to the RNF-Retro and on to the new SWORD-FISH, every board featuring this outline has worked above expectations.  It noticeably locks into the wave during carves and shortens the radius of turns while both gaining speed and maintaining control.
4	1	Firewire Surboard || Flat Earth	85000	/images/boards/firewire.webp	Introducing the Flat Earth: a board built to shred ankle high to overhead surf. Designed by Akila Aipa and dialed-in by Kelly Slater, this model is ready to be your go-to board whatever the conditions of the day. Finesse and flow in waves chest to head high, sized at your normal shortboard volume or a couple liters more.  Experiment with a twin + trailer or twin without trailer, because this shape surfs on a spectrum from loose and slidey in smaller sizes with two twin fins, to grippy and drivey in larger sizes with a trailer added. In summary, let the Flat Earth blow your mind as a twin fin, or sip the serum in doses with a trailer fin. Feel the speed. Hit the lip. Bury the rail.
5	2	Billabong Furnace Wetsuit 4/3	35000	/images/wetsuits/billabongfurnace.jpg	Boost your heat and your airs with the ultra lightweight Furnace Carbon Comp wetsuit. New for the 2019/2020 season, Billabong’s cold water competition performance wetsuit now features Billabong exclusive Furnace Graphene. Innovative new graphene wrapped yarns combine with carbon fibers for a wetsuit that is lighter, stronger and warmer for longer. Furnace Graphene is 50% lighter than traditional hollow fiber liners and 200x stronger than steel. Created from Smart Foam made from 30% upcycled car tires, the suit features a 300% stretch while adding more heat and less weight. Utilizing Airlite Stretch external jersey technology, the exclusive engineered perforated knit is able to stretch 350%. A Comp chest zip entry system allows for an easy on-off. Every layer is constructed with incredible flexibility for optimal performance.
6	2	Billabong Comp Revolution Wetsuit 3/2	37500	/images/wetsuits/billabongsuit.jpg	Heritage lines are reborn, backed by modern wetsuit technology. Maintaining core lines, the Revolution Series wetsuits utilize premium wetsuit innovations and new eco materials, creating a suit that delivers both performance and signature style. The Revolution fullsuit is lined at the front and back panels with incredibly lightweight and strong Graphene-infused yarns, now infused with 100% recycled fibers, keeping you warmer and faster for longer. Made from upcycled car tires, the eco-conscious Superlight Foam is topped with Superflex Recycler jersey, offering a lightweight feel and superior heat.
7	3	JJF Dakine 8" Surf Leash	5500	/images/accessories/dakinesurfleash.webp	AN EIGHT-FOOT SURF LEASH DESIGNED FOR SURFING WAVES IN THE DOUBLE OVERHEAD RANGE. John John Florence sets a high standard on the water. His signature Kainui leash follows suit. Designed for surfing waves in the double overhead range, it features the highest quality 1/4-inch (6.5mm) urethane Dura-Cord with molded ends to keep you connected to your board in big surf. Dakine built its reputation on the surf leash, and everything about this leash is designed with durability, performance and comfort in mind. All John John Florence products feature recycled cardboard packaging with no plastic to help keep our oceans clean for tomorrow.
8	3	Mr. Zogs Sex Wax	500	/images/accessories/sexwax.jpg	Sexwax Quick Humps surfboard wax formulas are the "go to" choice for professional and experienced surfers around the world. Find the ideal balance between stability and stickiness by utilizing these formulas alone or as part of a Basecoat/Topcoat combination. Each bar individually packaged in shrink film.
9	3	Sticky Bumps Surfboard Wax	700	/images/accessories/stickybumps.jpg	The Sticky Bumps Original Cold Wax is the softest formula wax for water temps below 60°F. Long-lasting and easy to apply, this is also the first traction wax that broke away from the use of a paraffin-based recipe.
\.


--
-- Name: products_productid_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.products_productid_seq', 9, true);


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: -
--

GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--
