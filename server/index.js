const keys = require("./keys");

// Express App Setup
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const {Pool} = require("pg");
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort,
});

pgClient.on("connect", (client) => {
    client
        .query("CREATE TABLE IF NOT EXISTS zad2 (id serial PRIMARY KEY, iloraz INT, wyrazCiagu INT, wynik INT)")
        .catch((err) => console.error(err));
});

app.get("/values", async (req, res) => {
    const values = await pgClient.query("SELECT * from zad2 ORDER BY id DESC LIMIT 5");
    res.send(values.rows);
});

app.get("/values/all", async (req, res) => {
    const values = await pgClient.query("SELECT * from zad2");
    res.send(values.rows);
});

app.post("/values", async (req, res) => {
    const iloraz = req.body.iloraz;
    const wyrazCiagu = req.body.wyrazCiagu;

    if (iloraz === null || iloraz === '') {
        return res.status(400).send("Iloraz nie moze byc pusty!");
    }

    if (wyrazCiagu === null || wyrazCiagu === '') {
        return res.status(400).send("Numer wyrazu ciagu nie moze byc pusta!");
    }

    if (parseInt(wyrazCiagu) > 10) {
        return res.status(422).send("Numer wyrazu ciagu nie moze przekraczac 10!");
    }

    let wynikObliczenia = Math.pow(iloraz, wyrazCiagu - 1);

    pgClient.query("INSERT INTO zad2(iloraz, wyrazCiagu, wynik) VALUES($1, $2, $3)", [iloraz, wyrazCiagu, wynikObliczenia]);

    const values = await pgClient.query("SELECT * from zad2 ORDER BY id DESC LIMIT 5");
    res.status(200).send(values.rows);
});

app.listen(5000, () => {
    console.log("Listening");
});
