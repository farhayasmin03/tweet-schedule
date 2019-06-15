var express = require('express')
var app = express();
var request = require('request');
const bodyParser = require('body-parser');
var Twitter = require('twitter');
var ejs = require('ejs');
//var Twit = require('twit');
var config = require('./config.js');
var Base = require('yeoman-generator')
var T = new Twitter(config);
var theTweets = [];



//var params = req.body.keyword;
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.get("/", function (req, res) {
  res.render('index')
});
app.post('/save', function (req, res) {

  var twdata = req.body.keyword;
  console.log(twdata)
  var params = {
    q: twdata,
    count: 5,
    result_type: 'recent',
    lang: 'en'
  }
  T.get('search/tweets', params, getData)

  function getData(err, data, response) {
    for (let i = 0; i < data.statuses.length; i++) {
      // Get the tweet Id from the returned data
      let id = {
        id: data.statuses[i].id_str
      }

    }
    let tweetData = JSON.stringify(data)
    console.log(tweetData)
    
      res.render('index', {
      td: tweetData,
      error: null
    });  
 

    // Try to Favorite the selected Tweet
    /* T.post('favorites/create', id, function(err, response){
      // If the favorite fails, log the error message
      if(err){
        console.log(err[0].message);
      }
      // If the favorite is successful, log the url of the tweet
      else{
        let username = response.user.screen_name;
        let tweetId = response.id_str;
        console.log('Favorited: ', `https://twitter.com/${username}/status/${tweetId}`)
      }
    });  */
  }
});
//})


app.listen(3000, function () {
  console.log('Example app listening on port 3000!')

});

module.exports = app;