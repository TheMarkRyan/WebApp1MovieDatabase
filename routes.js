'use strict';

// import express and initialise router
const express = require('express');
const router = express.Router();

// import controllers
const start = require('./controllers/start.js');
const dashboard = require('./controllers/dashboard.js');
const about = require('./controllers/about.js');
const compilation = require('./controllers/compilation.js');
const accounts = require ('./controllers/accounts.js');

// connect routes to controllers

router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);

router.get('/start', start.index);
router.get('/dashboard', dashboard.index);
router.get('/about', about.index);

router.get('/compilation/:id', compilation.index);

router.get('/compilation/:id/deleteMovie/:movieid', compilation.deleteMovie);
router.post('/compilation/:id/addmovie', compilation.addMovie);
router.post('/compilation/:id/updatemovie/:movieid', compilation.updateMovie);

router.get('/dashboard/deletecompilation/:id', dashboard.deleteCompilation);
router.post('/dashboard/addcompilation', dashboard.addCompilation);

// export router module
module.exports = router;

