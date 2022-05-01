'use strict';

const _ = require('lodash');
const JsonStore = require('./json-store');

const playlistStore = {

  store: new JsonStore('./models/playlist-store.json', { playlistCollection: [] }),
  collection: 'playlistCollection',

  getAllPlaylists() {
    return this.store.findAll(this.collection);
  },

  getPlaylist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  addPlaylist(playlist) {
    this.store.add(this.collection, playlist);
  },

  removePlaylist(id) {
    const playlist = this.getPlaylist(id);
    this.store.remove(this.collection, playlist);
  },

  removeAllPlaylists() {
    this.store.removeAll(this.collection);
  },

  addSong(id, song) {
    const playlist = this.getPlaylist(id);
    playlist.songs.push(song);
  },

  removeSong(id, songId) {
    const playlist = this.getPlaylist(id);
    const songs = playlist.songs;
    _.remove(songs, { id: songId});
  },
  
  editSong(id, songId, updatedSong) {
    const playlist = this.getPlaylist(id);
    const songs = playlist.songs;
    const index = songs.findIndex(song => song.id === songId);
    songs[index].title = updatedSong.title;
    songs[index].artist = updatedSong.artist;
    songs[index].genre = updatedSong.genre;
    songs[index].duration = updatedSong.duration;
  },
  
  getUserPlaylists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },
};

module.exports = playlistStore;