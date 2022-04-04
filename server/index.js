const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const api = require('./api');

const { PORT, URI } = process.env;

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

mongoose.connect(URI);
mongoose.connection.once('open', function(){
  console.log('Connect to database successfully');
});

api(app);

app.listen(PORT, function(){
  console.log(`Server is running on port ${ PORT }`);
});