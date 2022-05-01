'use strict';


const logger = require('../utils/logger');
const developerStore = require('../models/developer-store.js');
const accounts = require ('./accounts.js');


const about = {
  

  index(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('about rendering');
    if (loggedInUser) {
      const viewData = {
        title: 'About the Movie Compilation App',
        developers: developerStore.getAllDevelopers(),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
         picture: loggedInUser.picture
      };
      response.render('about', viewData);
    }
    else response.redirect('/');    
  },
};


module.exports = about;