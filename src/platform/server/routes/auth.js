'use strict';
const express = require('express');
const router = express.Router();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

// MongoDB connection URL
const URL = `mongodb+srv://admin:${process.env.DATABASE_PASSWORD}@comb.kofyd.mongodb.net/${process.env.DATABSE_NAME}?retryWrites=true&w=majority`;

// Mount the middleware
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: ((process.env.NODE_ENV === 'production')?true:false) },
  store: new MongoStore({ url: URL })
}));

// Auth routes
router.get('/test', (req, res) => {
    res.send('testing...');
});

module.exports = router;