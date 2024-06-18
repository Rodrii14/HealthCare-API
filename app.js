const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { connect } = require('./database/database.config');

//initializing service & connecting to database
const app = express();
connect(process.env.DBURI);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routes
app.use(express.static(path.join(__dirname, 'public')));

module.exports = app;
