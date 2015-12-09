var Google = require('./google')
var needle = require('needle');
var rateLimit = require('function-rate-limit');
var request = require("request");
var cheerio = require("cheerio");
var querystring = require("querystring")
var format = require('string-format')
var moment = require('moment')
var Crawlera = require('./crawlera')
format.extend(String.prototype)
var _ = require('underscore')
var rd = require("./../connection").redis()
var r = require("./../connection").rethinkdb()

discoverRate = 10

var Soundcloud = {
  discover: function() {
   start_urls = []
     queries = [ 
       'site:soundcloud.com "likes {0}" -inurl:likes',
       'site:soundcloud.com "reposts {0}" -inurl:likes',
       'site:soundcloud.com "comments {0}" -inurl:likes',
       'site:soundcloud.com "plays {0}" -inurl:likes',
     ]

    k_urls = _.map(_.range(10, 9990), function(i) {
        qry = queries[0].format((i/10.0)+"K")
        args = querystring.stringify({'q':qry,'start':0*100,'num':100,"filter":0})
        url = 'https://www.google.com/search?'+ args
        url = Crawlera.url(url)
        return url
    })

    m_urls = _.map(_.range(10, 950), function(i) {
        qry = queries[0].format((i/10.0)+"M")
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
          r.table("soundcloud_discover_profiles").insert(profiles).run().then(function(data) {
            console.log(data)
          })
        })
      })
    )
  },

  parseProfile: function(html) {
    $ = cheerio.load(html)
    data = {}
    results = _.map($("meta"), function(meta) {
      //console.log($(meta).attr())
      name = $(meta).attr("property")
      //if(name)
      //  name = name.split(":").slice(-1)
      content =  $(meta).attr("content")

      /*
      if(name)
        data[name] = content
      */
      data[name] = content
    })
    //console.log(data)
    //console.log($("meta"))
    return data
  },

  parseDiscover: function() {
    var _this = this;
    r.table("soundcloud_discover_profiles").run().then(function(data) {
        _.map(data, rateLimit(100, 1000,  function(d) {
          console.log(d.link)
          url = d.link
          needle.get(url, function(err, response) {
            if(err) { return  }
            //console.log(response.statusCode)
            //$ = cheerio.load(response.body)
            //meta = console.log(_.map($("meta"), function(e) { console.log($(e).attr())}))
            //console.log(this.uri.href)
            html = response.body
            data = _this.parseProfile(html)
            r.table("soundcloud_profiles").insert(data).run().then(function(data) {
              console.log(data)
            })
          });


        /*
        request.get(d.link, function(err, res, html) {
          //console.log(html)
          console.log(this.uri.href)
          console.log(data)
        })
        */
        })
      )
    })
  },

  download: function() {

  },
}

//Soundcloud.discover()
//Soundcloud.parseDiscover()
//url = "https://soundcloud.com/edrek"
/*
request.get(url, function(err, res, html) {
  console.log(res.statusCode)
  $ = cheerio.load(html)
  meta = console.log(_.map($("meta"), function(e) { console.log($(e).attr())}))
})
*/


module.exports = Soundcloud
