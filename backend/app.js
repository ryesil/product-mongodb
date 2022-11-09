const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongodb=require("mongodb").MongoClient;


const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

app.use('/images', express.static(path.join('backend/images')));

//Adding headers
app.use((req, res, next) => {
  // Set CORS headers so that the React SPA is able to communicate with this server
  // Website to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,POST,PUT,PATCH,DELETE,OPTIONS'
  );
  // Request headers to allow
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  // Pass to next layer of middleware
  next();
});

app.use('/products', productRoutes);
app.use('/', authRoutes);



app.listen(3100);
