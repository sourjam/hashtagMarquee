require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db/db");
const query = require("./db/query");
const path = require("path");
const twitterService = require("./service/twitterSearchApi");

app.set("port", process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, "./client/src")));

app.get("/", (req, res) => {
  res.send('default marquee')
})

app.get("/marquee/:name", (req, res) => {
  // send single bundle
  res.send('return marquee obj here')
})

app.get("/search/:hashtag", (req, res) => {
  // check db first for hashtag
  query.hashtag.findOne(req.params.hashtag).then((result) => {
    console.log('res', result)
    if (result) {
      console.log('return db store')
      // client should call for update and concat
    } else {

      twitterService.searchByHashtag(req.params.hashtag).then((result)=>{
        if (result.statuses.length === 0) {
          // send empty response
          res.send('no tweets for that hashtag')
        } else {
          result.statuses.forEach((tweet) => {
            console.log(tweet.entities)
          })
          // query.hashtag.add(req.params.hashtag).then((result) => {
          //   // create hashtag row
          //
          // })
          //
          // let bulkTweets = []
          // result.statuses.forEach((tweet) => {
          //   let t = {}
          //   t.text = tweet.text
          //   t.name = tweet.user.name
          //   t.screenname = tweet.user.screen_name
          //   t.date = tweet.created_at
          //   t.hashtag = req.params.hashtag
          //   bulkTweets.push(t)
          // })
          // query.tweet.bulkCreate(bulkTweets).then((results) => {
          //   // store
          //   res.send(results)
          // })
          // res.send(bulkTweets)
        }

        // res.send(result);
      });

      console.log('store hashtag')
    }
  })


})

app.listen(app.get("port"), () => {
  console.log('running on port', app.get("port"))
})
