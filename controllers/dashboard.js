'use strict';


const logger = require('../utils/logger');
const uuid = require('uuid');

const compilationStore = require('../models/compilation-store.js');

const accounts = require ('./accounts.js');

const dashboard = {
  

  index(request, response) {
    
    
    logger.info('dashboard rendering');
    
      const loggedInUser = accounts.getCurrentUser(request);
    if (loggedInUser) {
    
    const viewData = {
      title: 'Movie App Dashboard',
      compilations: compilationStore.getUserCompilations(loggedInUser.id),
   fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
       picture: loggedInUser.picture
    };
    
   
    logger.info('about to render', viewData.compilations);
    response.render('dashboard', viewData);
    }
    else response.redirect('/');
  },
  
  deleteCompilation(request, response) {
    const compilationId = request.params.id;
    logger.debug(`Deleting Compilation ${compilationId}`);
    compilationStore.removeCompilation(compilationId);
    response.redirect('/dashboard');
  }, 
  
 addCompilation(request, response) {
   const date = new Date();
    const loggedInUser = accounts.getCurrentUser(request);
    const newCompilation = {
      id: uuid(),
      userid: loggedInUser.id,
      title: request.body.title,
      duration: request.body.duration,
      picture: request.files.picture,
      date: date,
      movies: [],
    };
    logger.debug('Creating a new Compilation' + newCompilation);
    compilationStore.addCompilation(newCompilation, function() {
    response.redirect('/dashboard');
 });
  }, 
}; 
module.exports = dashboard;