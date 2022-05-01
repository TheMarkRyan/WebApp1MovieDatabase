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

  addSong(id, song) {
    const compilation = this.getCompilation(id);
    compilation.songs.push(song);
  },

  removeSong(id, songId) {
    const compilation = this.getCompilation(id);
    const songs = compilation.songs;
    _.remove(songs, { id: songId});
  },
  
  editSong(id, songId, updatedSong) {
    const compilation = this.getCompilation(id);
    const songs = compilation.songs;
    const index = songs.findIndex(song => song.id === songId);
    songs[index].title = updatedSong.title;
    songs[index].artist = updatedSong.artist;
    songs[index].genre = updatedSong.genre;
    songs[index].duration = updatedSong.duration;
  },
  
  getUserCompilations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = compilationStore;