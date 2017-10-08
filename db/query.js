const db = require("./db")

let hashtag = {

  findOne(hashtag) {
    hashtag = hashtag.toLowerCase()
    return new Promise((resolve, reject) => {
      db.Hashtag.findOne({ where: { hashtag: hashtag }})
      .then(hashtag => {
        resolve(hashtag)
      })
      .catch(err => {
        reject(err)
      })
    })
  },

  add(hashtag) {
    return new Promise((resolve, reject) => {
      db.Hashtag.create({
        hashtag: hashtag,
        tweets: ''
      })
      .then(hashtag => {
        resolve(hashtag)
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

let tweet = {
  findByHashtag(hashtag) {
    return new Promise((resolve, reject) => {
      db.Tweet.findAll({
        where: {
          hashtag: hashtag
        }
      }).then((results) => {
        resolve(results)
      }).catch((err) => {
        reject(err)
      })
    })
  },

  bulkCreate(tweetArray) {
    let hashtag = tweetArray[0].hashtag
    return new Promise((resolve, reject) => {
      db.Tweet.bulkCreate(tweetArray).then(() => {
        this.findByHashtag(hashtag).then((results) => {
          resolve(results)
        })
      })
      .catch(err => {
        reject(err)
      })
    })
  }
}

module.exports.hashtag = hashtag;
module.exports.tweet = tweet;
