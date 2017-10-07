require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db/db");
const path = require("path");
const twitterService = require("./service/twitterSearchApi");

app.set("port", process.env.PORT || 5000);

app.use(express.static(path.join(__dirname, "./client/src")));

app.get("/search/:hashtag", (req, res) => {
  twitterService.searchByHashtag(req.params.hashtag).then((result)=>{
    res.send(result);
  });
})

app.listen(app.get("port"), () => {
  console.log('running on port', app.get("port"))
})
