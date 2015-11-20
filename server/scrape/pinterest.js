var request = require('request');
var moment = require("moment")
var _ = require('underscore')
var rd = require("./../connection").redis()
var r = require("./../connection").rethinkdb()
var querystring = require("querystring")
var format = require('string-format')
format.extend(String.prototype)
var cheerio = require("cheerio");
var Crawlera = require("./crawlera")
var Google = require("./google")

var Pinterest = {
  download: function() {
    var _this = this;
    r.table("pinterest_profiles").run().then(function(profiles) {
      var i = _.random(0, Math.ceil(profiles.length/50))
      //i = 10
      profiles = profiles.slice(50*i,50*(i+1))
     // profiles = profiles.slice(1, 5)
      _.map(profiles, function(profile) { 
        link = profile.link
        if(link.indexOf(".com/explore/") != -1 || link.indexOf("/p/") != -1 || link.indexOf("/help/") != -1) { return }
        console.log(profile.link)
        request.get(profile.link, function(err, res, html) {
          console.log(err)
          console.log(res.statusCode)
          if(res.statusCode != 200)  { return } 
          console.log(this.uri.href)
          profile = _this.parseProfile(html)
          profile.createdAt = moment().unix()
          r.table("pinterest_profile_stats").insert(profile).run()
          qry = r.table("pinterest_profiles").getAll(this.uri.href, {index: "link"}).update(profile)
          qry.run().then(function(res) {
            console.log(res)
          })
        })
      })
    })
  },

  parseProfile: function(html) {
    $ = cheerio.load(html)
    data = {}
    results = _.map($("meta"), function(meta) {
      name = $(meta).attr("name")
      if(name)
        name = name.split(":").slice(-1)
      content =  $(meta).attr("content")
      if(name)
        data[name] = content
    })
    console.log(data)
    return data
  },

  discover: function() {
    start_urls = []
    queries = [
        'site:instagram.com "{0} followers"',
        'site:twitter.com "Followers {0}" -inurl:status -inurl:followers',
        //'site:facebook.com/pages "143,001 likes" inurl:likes',
        'site:pinterest.com "{0} followers" -inurl:/pin/',
        'site:vine.co "{0} followers;" -inurl:/v/ -inurl:/u/ -inurl:/tags/ -inurl:/venues/'
    ]

    k_urls = _.map(_.range(10, 9999), function(i) {
        qry = queries[2].format((i/10.0)+"K")
        args = querystring.stringify({'q':qry,'start':0*100,'num':100,"filter":0})
        url = 'https://www.google.com/search?'+ args
        url = Crawlera.url(url)
        return url
    })

    m_urls = _.map(_.range(10, 350), function(i) {
        qry = queries[2].format((i/10.0)+"M")
        args = querystring.stringify({'q':qry,'start':0*100,'num':100,"filter":0})
        url = 'https://www.google.com/search?'+ args
        url = Crawlera.url(url)
        return url
    })
    start_urls = k_urls.concat(m_urls)

    var _this = this;

    var i = _.random(0, Math.ceil(start_urls.length/1000))
    start_urls = start_urls.slice(1000*i,1000*(i+1))

    _.map(start_urls, function(url) { 
        request.get(url, function(err, res, html) {
          console.log(err)
          if(err) { return }
          console.log(res.statusCode)
          profiles = Google.results(html)
          profiles = _.map(profiles, function(profile){
            if(!profile) { return {} }
            profile.link = profile.link.split("%3F")[0]
            profile.createdAt = moment().unix()
            link = profile.link
            if(link.indexOf(".com/explore/") == -1 && link.indexOf("/p/") && link.indexOf("/help/") == -1)
                return profile
          })
          //console.log(profiles)
          //profiles = _.compact(profiles)
          r.table("pinterest_profiles").insert(profiles).run().then(function(res) {
            console.log(res)
          })
        })
    })
  },
}

module.exports = Pinterest
