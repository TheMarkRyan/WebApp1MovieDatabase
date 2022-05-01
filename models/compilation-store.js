'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const compilationStore = {

  store: new JsonStore('./models/compilation-store.json', { compilationCollection: [] }),
  collection: 'compilationCollection',

  getAllCompilations() {
    return this.store.findAll(this.collection);
  },

  getCompilation(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addCompilation(compilation) {
    this.store.add(this.collection, compilation);
  },

  removeCompilation(id) {
    const compilation = this.getCompilation(id);
    this.store.remove(this.collection, compilation);
  },

  removeAllCompilations() {
    this.store.removeAll(this.collection);
  },

  addMovie(id, movie) {
    const compilation = this.getCompilation(id);
    compilation.movies.push(movie);
  },

  removeMovie(id, movieId) {
    const compilation = this.getCompilation(id);
    const movies = compilation.movies;
    _.remove(movies, { id: movieId});
  },
  
  editMovie(id, movieId, updatedMovie) {
    const compilation = this.getCompilation(id);
    const movies = compilation.movies;
    const index = movies.findIndex(movie => movie.id === movieId);
    movies[index].movie = updatedMovie.movie;
    movies[index].director = updatedMovie.director;
    movies[index].runtime = updatedMovie.runtime;
    movies[index].year = updatedMovie.year;
  },
  
  getUserCompilations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = compilationStore;