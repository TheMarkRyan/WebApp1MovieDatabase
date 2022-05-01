'use strict';

const logger = require('../utils/logger');
const uuid = require('uuid');
const compilationStore = require('../models/compilation-store');
const accounts = require ('./accounts.js');


const compilation = {
  index(request, response) {
      const loggedInUser = accounts.getCurrentUser(request);  
      const compilationId = request.params.id;
      logger.debug('Compilation id = ' + compilationId);
      if (loggedInUser) {
      const viewData = {
        title: 'Compilation',
        compilation: compilationStore.getCompilation(compilationId),
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
         picture: loggedInUser.picture
      };
      response.render('compilation', viewData);
      }
      else response.redirect('/');
  },
    deleteMovie(request, response) {
    const compilationId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug(`Deleting Movie ${movieId} from Compilation ${compilationId}`);
    compilationStore.removeMovie(compilationId, movieId);
    response.redirect('/compilation/' + compilationId);
  },
    addMovie(request, response) {
    const compilationId = request.params.id;
    const compilation = compilationStore.getCompilation(compilationId);
    const newMovie = {
      id: uuid(),
      movie: request.body.movie,
      director: request.body.director,
      runtime: request.body.runtime,
      year: request.body.year
    };
    compilationStore.addMovie(compilationId, newMovie);
    response.redirect('/compilation/' + compilationId);
  },
  updateMovie(request, response) {
    const compilationId = request.params.id;
    const movieId = request.params.movieid;
    logger.debug("updating movie " + movieId);
    const updatedMovie = {
     id: uuid(),
      movie: request.body.movie,
      director: request.body.director,
      runtime: request.body.runtime,
      year: request.body.year
      
    };
    compilationStore.editMovie(compilationId, movieId, updatedMovie);
    response.redirect('/compilation/' + compilationId);
  }
};

module.exports = compilation;