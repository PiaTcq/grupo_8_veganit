require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.dbUser,
    "password": process.env.dbPass,
    "database": process.env.db,
    "host": process.env.dbHost,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.dbUser,
    "password": process.env.dbPass,
    "database": process.env.db,
    "host": process.env.dbHost,
    "dialect":process.env.dbDialect
  },
  "production": {
    "username": process.env.dbUser,
    "password": process.env.dbPass,
    "database": process.env.db,
    "host": process.env.dbHost,
    "dialect":process.env.dbDialect
  }
}