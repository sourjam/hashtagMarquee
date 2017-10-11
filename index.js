require("dotenv").config();
const express = require("express");
const cors = require('cors')
const app = express();
const db = require("./db/db");
const query = require("./db/query");
const path = require("path");
const twitterService = require("./service/twitterSearchApi");

app.set("port", process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, "./client/dist/")));
app.use(cors())

app.get("/", (req, res) => {
  console.log('reqest')
  res.sendFile(path.join(__dirname + '/client/dist/index.html'))
})

app.get("/:id", (req, res) => {
  // send single bundle
  console.log('what', req.params.id)
  res.sendFile(path.join(__dirname + '/client/dist/index.html'))
})

app.get("/search/:hashtag", (req, res) => {
  console.log('search incoming')
  twitterService.searchByHashtag(req.params.hashtag).then((result)=>{
    if (result.statuses.length === 0) {
      // send empty response
      res.send({error: 'no tweets found'})
    } else {
      let bulkTweets = []
      result.statuses.forEach((tweet) => {
        console.log('tweets', tweet)
        let t = {}
        t.verified = tweet.verified
        t.retweetCount = tweet.retweet_count
        t.favoriteCount = tweet.favorite_count
        t.text = tweet.text
        t.text = t.text.replace(/\r?\n/g, '')
        t.name = tweet.user.name
        t.screenname = tweet.user.screen_name // used for url
        t.date = tweet.created_at
        t.hashtag = req.params.hashtag
        bulkTweets.push(t)
      })
      res.send(bulkTweets)
    }
  });
})

app.listen(app.get("port"), () => {
  console.log('running on port', app.get("port"))
})
