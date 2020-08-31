'use strict';
const express = require('express');
const router = express.Router();
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const bcrypt = require('bcrypt');
// Import models
const loginModel = require('../models/login');
// MongoDB connection URL
const URL = require('../constants/URL');

// Mount the middleware
router.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: ((process.env.NODE_ENV === 'production')?true:false) },
  store: new MongoStore({ url: URL })
}));

// Auth routes
// Check if user is autenticated
router.get('/isAuth/:username', (req, res) => {
    let sess = req.session;
    let username = req.params.username;
    if (sess.username) {
        res.json({
            isAuth: true
        });
    } else {
        res.json({
            isAuth: false
        })
    }
});

router.post('/login', (req, res) => {
    let sess = req.session;
    let username = req.body.username;
    let password = req.body.password;
    // Check if the user is already logged in
    // Try to log the user in
    loginModel.find({username: username}, (err, docs) => {
        if (err) {
            console.log(err);
            res.json({
                isAuth: false,
                msg: 'Failed to login due to server error',
                err: err
            });
        }
        else if (docs.length === 0) {
            res.json({
                isAuth: false,
                msg: 'Wrong username or password.',
                err: false
            });
        } else {
            // Compare password and hash
            bcrypt.compare(password, docs[0].password, (err, result) => {
                if (result === true) {
                    req.session.username = true;
                    res.json({
                        isAuth: true,
                        msg: '',
                        err: false
                    });
                    
                } else {
                    res.json({
                        isAuth: false,
                        msg: 'Wrong username or password.',
                        err: err
                    });
                }
            });
        }
    });
});

router.post('/register', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    // Check if username is unique
    loginModel.find({
        username: username
    }, (err, docs) => {
        if (docs.length === 0 && password.length > 0) {
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.log(err);
                    res.json({
                        success: false,
                        msg: 'A server-side error occured.',
                        err: err
                    });
                } else {
                    // Save account to database
                    // Generate a connectionCode
                    let connectionCode = 10000000 + Math.floor(Math.random() * 90000000);
                    loginModel.create({
                        connectionCode: connectionCode,
                        username: username,
                        password: hash
                    }, (err, doc) => {
                        if (err) {
                            console.log(err);
                            res.json({
                                success: false,
                                msg: 'A server-side error occured.',
                                err: err
                            });
                        } else {
                            res.json({
                                success: true,
                                msg: '',
                                err: false
                            });
                        }
                    });
                }
            });
        } else {
            res.json({
                success: false,
                msg: 'Either username is already taken or password is <1 character long'
            });
        }
    });
});

// Session test
router.get('/test1', (req, res) => {
    req.session.test = 1;
    res.send('Hi');
});
router.get('/test2', (req, res) => {
    console.log(req.session);
    res.send('Hi 2');
});
router.get('/test3', (req, res) => {
    req.session.destroy();
    res.send('Hi 3');
});

module.exports = router;