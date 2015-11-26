var Google = require('./google')
var rateLimit = require('function-rate-limit');
var request = require("request");
var querystring = require("querystring")
var format = require('string-format')
var moment = require('moment')
var Crawlera = require('./crawlera')
var cheerio = require("cheerio");
format.extend(String.prototype)
var _ = require('underscore')
var rd = require("./../connection").redis()
var r = require("./../connection").rethinkdb()

discoverRate = 10

var Youtube = {
  discover: function() {
   start_urls = []
    queries = [ 'site:youtube.com {0} inurl:/channels"', ]

    k_urls = _.map(_.range(1, 999), function(i) {
        qry = queries[0].format((i)+"K")
        args = querystring.stringify({'q':qry,'start':0*100,'num':100,"filter":0})
        url = 'https://www.google.com/search?'+ args
        url = Crawlera.url(url)
        return url
    })

    m_urls = _.map(_.range(1, 350), function(i) {
        qry = queries[0].format((i)+"M")
        args = querystring.stringify({'q':qry,'start':0*100,'num':100,"filter":0})
        url = 'https://www.google.com/search?'+ args
        url = Crawlera.url(url)
        return url
    })

    start_urls = k_urls.concat(m_urls)
    var _this = this;

    //var i = _.random(0, Math.ceil(start_urls.length/1000))
    //start_urls = start_urls.slice(1000*i,1000*(i+1))

    _.map(_.shuffle(start_urls), rateLimit(discoverRate, 1000, function(url) {
        request.get(url, function(err, res, html) {
          console.log(err)
          if(err) { return }
          console.log(res.statusCode)
          profiles = Google.results(html)
          //console.log(profiles)
          profiles = _.map(profiles, function(profile){
            profile.link = profile.link.split("/%3F")[0]
            profile.createdAt = moment().unix()
            link = profile.link
            if(link.indexOf(".com/explore/") == -1 && link.indexOf("/p/") ==  -1 && link.indexOf("/help/") == -1)
                return profile
          })
          profiles = _.compact(profiles)
          r.table("youtube_discover_profiles").insert(profiles).run().then(function(data) {
            console.log(data)
          })
        })
      })
    )
  },

  parseDiscover: function() {
    r.table("youtube_discover_profiles").run().then(function(data) {
      _.map(_.shuffle(_.pluck(data,"link")), rateLimit(100, 1000, function(url) {
        request.get(url, function(err, res, html) {
          $ = cheerio.load(html)
          channels = _.map($("li.channels-content-item"), function(li) {
            subs = $(li).find("span.yt-subscription-button-subscriber-count-unbranded-horizontal").attr("aria-label")
            if(!subs) { return }
            subs = parseInt(subs.replace(",","").split(" ")[0])
            return ({
              img: $(li).find("img").attr("src"),
              link: "http://youtube.com"+$(li).find("a").attr("href"),
              subs: subs
            })
          })
          channels = _.compact(channels)
          console.log(channels)
          r.table("youtube_profiles").insert(channels).run().then(function(data) {
            console.log(data)
          })
        })
      })
      )
    })
  },

  download: function() {

  },
}

//Youtube.discover()
//Youtube.parseDiscover()

module.exports = Youtube
