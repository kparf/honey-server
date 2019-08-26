const rc = require('rc');

const config = rc('honey', {
  port: 3000,
  static: 'localhost:3000',
})

module.exports = config;