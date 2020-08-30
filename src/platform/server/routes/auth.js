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
    if (sess.username) {
        res.json({
            isAuth: true,
            msg: 'You are already logged in.',
            err: false
        });
    } else {
        // Try to log the user in
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.log(err);
                res.json({
                    isAuth: false,
                    msg: 'Server side error when attempting to log in.',
                    err: err
                });
            } else {
                // Compare credentials with that stored in the database
                loginModel.find({
                    username: username
                }, (err, docs) => {
                    if (err) {
                        console.log(err);
                        res.json({
                            isAuth: false,
                            msg: 'Server side error when attempting to log in.',
                            err: err
                        });
                    } else {
                        if (docs.length === 0) {
                            res.json({
                                isAuth: false,
                                msg: 'There are no users with that username.',
                                err: false
                            });
                        } 
                        else if (docs[0].password === hash) {
                            // Successfully logged in
                            req.session.username = {
                                isAuth: true,
                            };
                            res.json({
                                isAuth: true,
                                msg: '',
                                err: false
                            });
                        } else {
                            res.json({
                                isAuth: false,
                                msg: 'Wrong password inputted.',
                                err: false
                            });
                        }
                    }
                });
            }
        });
    }
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

// Databse test
router.get('/test', (req, res) => {
    loginModel.find({username: 'test'}, (err, docs) => {
        if (err) {
            console.log(err);
            res.json({
                err: err
            });
        } else {
            res.json(docs);
        }
    })
});

module.exports = router;