'use strict';

const developerStore = {

  developers: require('./developer-store.json').developers,

  getAllDevelopers() {
    return this.developers;
  },
 
  getUserCompilations(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

};

module.exports = developerStore;