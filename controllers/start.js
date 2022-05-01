'use strict';

// import all required modules
const logger = require('../utils/logger');
const compilationStore = require('../models/compilation-store.js');
const accounts = require ('./accounts.js');

// create start object
const start = {
  
  // index method - responsible for creating and rendering the view
  index(request, response) {

    const loggedInUser = accounts.getCurrentUser(request);
    logger.info('start rendering');

    if(loggedInUser){

      const compilations = compilationStore.getAllCompilations();
      let numCompilations = compilations.length;
      let numMovies = 0;
      for (let item of compilations) {
        numMovies += item.movies.length;
      }
      
    const viewData = {
      title: 'Welcome to the Movie Compilation App!',
      totalCompilations: numCompilations,
      totalMovies: numMovies,
    };

      response.render('start', viewData);
    }
    else response.redirect('/');
  },
};

// export the start module
module.exports = start;