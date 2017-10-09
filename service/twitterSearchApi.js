var OAuth2 = require('oauth').OAuth2;
var https = require('https')

let KEY = process.env.TWITTER_APIKEY
let SECRET = process.env.TWITTER_APISECRET
var oauth2 = new OAuth2(KEY, SECRET, 'https://api.twitter.com/', null, 'oauth2/token', null);

let searchByHashtag = (hashtagStr) => {
  if (hashtagStr[0] !== '#') hashtagStr = '%23' + hashtagStr;

  return new Promise((resolve, reject) => {
    oauth2.getOAuthAccessToken('', {
      'grant_type': 'client_credentials'
    }, function (e, access_token) {
      console.log(access_token); //string that we can use to authenticate request
      var options = {
        hostname: 'api.twitter.com',
        path: `/1.1/search/tweets.json?q=${hashtagStr}&lang=en`,
        headers: {
          Authorization: 'Bearer ' + access_token
        }
      };

      https.get(options, function(result){
        result.setEncoding('utf8');
        result.on('data', function(data){
          // console.log('resp', data); //the response!
        });
      });

      https.get(options, function(result){
        var buffer = '';
        result.setEncoding('utf8');
        result.on('data', function(data){
          buffer += data;
        });
        result.on('end', function(){
          var tweets = JSON.parse(buffer);
          console.log(tweets); // the tweets!
          resolve(tweets);
        });
      });
    });
  })
}

module.exports.searchByHashtag = searchByHashtag;
