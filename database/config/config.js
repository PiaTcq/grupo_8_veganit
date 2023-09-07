require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.dbUser,
    "password": process.env.dbPass,
    "database": process.env.db,
    "host": process.env.dbHost,
    "dialect":process.env.dbDialect
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}