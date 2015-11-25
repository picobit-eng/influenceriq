var express = require('express');
var request = require('request');
var app = express();
var Google = require("./scrape/google")
var Instagram = require("./scrape/instagram")
var Vine = require("./scrape/vine")
var Pinterest = require("./scrape/pinterest")
var Twitter = require("./scrape/twitter")
var Crawlera = require("./scrape/crawlera")
var moment = require("moment")
var _ = require('underscore')
var rd = require("./connection").redis()
var r = require("./connection").rethinkdb()

//
app.use(express.static('client'));

app.get('/', function (req, res) {
  res.sendfile("client/index.html");
});

app.get('/test', function (req, res) {
  res.send('Hello World!');
});

app.get('/network/:network/:page', function (req, res) {
  page = parseInt(req.params.page)
  if(req.params.network == "instagram")
    thing = "followers"
  else if(req.params.network == "youtube")
    thing = "subs"

  qry = r.table(req.params.network+"_profiles").orderBy({index:r.desc(thing)})
  qry = qry.distinct({index: thing})
  ids = qry.slice(page*50, (page+1)*50).limit(50).run().then(function(ids) {
    r.table(req.params.network+"_profiles").getAll(r.args(ids), {index: thing}).then(function(data) {
      return res.send(data);
    })
  })
});

//Instagram.discover()
//Instagram.download()
//Pinterest.discover()
//Pinterest.download()
//Twitter.discover()
//Twitter.download()
//ChangeFeeds.start()
/*
*/

Vine.discover()
//Vine.download()

Pinterest.discover()
//Pinterest.download()

Twitter.discover()
//Twitter.download()

Instagram.discover()
//Instagram.download()

var CronJob = require('cron').CronJob;
new CronJob('* 5 * * * *', function() {
  Vine.discover()
  //Vine.download()

  Pinterest.discover()
  //Pinterest.download()

  Twitter.discover()
  //Twitter.download()

  Instagram.discover()
  //Instagram.download()
  //Instagram.photoHack()
}, null, true, 'America/Los_Angeles');

var CronJob = require('cron').CronJob;
new CronJob('* 59 * * * *', function() {
  //Vine.discover()
  Vine.download()

  //Pinterest.discover()
  Pinterest.download()

  //Twitter.discover()
  Twitter.download()

  //Instagram.discover()
  Instagram.download()
  //Instagram.photoHack()
}, null, true, 'America/Los_Angeles');


/*
new CronJob('1 * * * * *', function() {
  CompanyNameToDomain.start()
}, null, true, 'America/Los_Angeles');

*/

var server = app.listen(process.env.WEB_PORT || 3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});
