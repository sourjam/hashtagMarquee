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
const Hashtag = db.define('Hashtag', {
  hashtag: Sequelize.STRING
})

const Tweet = db.define('Tweet', {
  text: Sequelize.STRING,
  name: Sequelize.STRING,
  screenname: Sequelize.STRING,
  date: Sequelize.STRING
})

Hashtag.hasMany(Tweet, {as: 'Tweets'})

Hashtag.sync();
Tweet.sync();

db.Sequelize = Sequelize;
module.exports = db;

module.exports.Hashtag = Hashtag;
module.exports.Tweet = Tweet;
