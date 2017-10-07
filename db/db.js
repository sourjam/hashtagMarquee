const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

if (process.env.DATABASE_URL) {
  db = new Sequelize(process.env.DATABASE_URL, {
    logging: false,
    dialectOptions: {
      ssl: true
    }
  })
} else {
  db = new Sequelize('hashtagmarquee', process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  })
}

// define hashtag cache

// before reaching out to twitter api check if hashtag has been cached already

// if no then create new entry

module.exports = db;
