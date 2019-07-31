const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json()); // for parsing application/json
const cors = require('cors');
const request = require('request');
require('dotenv').config();
const { Client } = require('pg')
const client = new Client()
client.connect()
const fs = require('fs');
const {parse, stringify} = require('flatted/cjs');


const corsOptions =  {
  origin: 'http://localhost:3000'
};

app.use(cors(corsOptions));


app.get('/api/values', function(req, res) {

  const text = `SELECT *
  FROM test_data`;
  const values = [];
  client.query(text, values, (err, results) => {
    if (err) {
      res.json({data: []});
    } else {
      res.json({data: results.rows});
    }
  });

});

app.use(function(err, req, res, next){
  console.error(err.stack);
  return res.status(err.status).json({ message: err.message });
});

app.listen(3010);
console.log('Listening on http://localhost:3010');
