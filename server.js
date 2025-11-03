//server.js
"use strict";
const express = require("express");
const app = express();

const multer = require("multer");
app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});



//http://localhost:3000/jokebook
app.get("/jokebook", async function (req, res) {
    const queryText = "SELECT category, setup, delivery FROM jokebook";
    try {
      const result = await pool.query(queryText);
      res.json(result.rows);
    }
    catch (err) {
      console.error(err);
      res.status(500).send("Server error");
      return;
    }
});


//http://localhost:3000/jokebook/random
app.get("/jokebook/random", async function (req, res) {
    const queryText = "SELECT category, setup, delivery FROM jokebook ORDER BY RANDOM() LIMIT 1";
    try {
      const result = await pool.query(queryText);
      res.json(result.rows[0]);
    }
    catch (err) {
      console.error(err);
      res.status(500).send("Server error");
      return;
    }
});


//http://localhost:3000/jokebook/category
app.get("/jokebook/category/:category", async function (req, res) {
  let category = req.params.category;
  if (category) {
    let values = [category];
    let queryText = "SELECT * FROM jokebook where category = $1 ";

    try {
      const result = await pool.query(queryText, values);
      res.json(result.rows);

    } catch (err) {
      console.error(err);
      res.status(500).send("Server error");
      return;
    }
  }
  else {
    res.status(400).send("Missing required category param!");
  }

});


//http://localhost:3000/jokebook/add
app.post("/jokebook/add", async function (req, res) {
  let category = req.body.category;
  let setup = req.body.setup;
  let delivery = req.body.delivery;
  if (category && setup && delivery) {
    let queryText = "INSERT INTO jokebook ( category, setup, delivery) VALUES ($1, $2, $3) RETURNING *";
    let values = [category, setup, delivery];
    try {
      const result = await pool.query(queryText, values);
      res.json(result.rows);
    }
    catch (err) {
      console.error(err);
      res.status(500).send("Server error");
      return;
    }
  }
  else {
    res.status(400).send("Missing required param!");

  }});








const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log("Server listening on port: " + PORT + "!");
});
