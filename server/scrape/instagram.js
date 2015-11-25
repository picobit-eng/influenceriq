var cheerio = require("cheerio");
var async = require("async")
var request = require("request");
var querystring = require("querystring")
var rateLimit = require('function-rate-limit');
var format = require('string-format')
var moment = require('moment')
var Crawlera = require('./crawlera')
var Google = require('./google')
format.extend(String.prototype)
var _ = require('underscore')
var rd = require("./../connection").redis()
var r = require("./../connection").rethinkdb()

discoverRate = 5

var Instagram = {
  photoParse: function(html) {
    queries = [
        'site:instagram.com "{0} followers"',
        'site:twitter.com "Followers {0}" -inurl:status -inurl:followers',
        //'site:facebook.com/pages "143,001 likes" inurl:likes',
        'site:pinterest.com "{0} followers" -inurl:/pin/',
        'site:vine.co "{0} followers;" -inurl:/v/ -inurl:/u/ -inurl:/tags/ -inurl:/venues/'
    ]
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
        qry = queries[0].format((i/10.0)+"K")
        args = querystring.stringify({'q':qry,'start':0*100,'num':100,"filter":0})
        url = 'https://www.google.com/search?'+ args
        url = Crawlera.url(url)
        return url
    })

    m_urls = _.map(_.range(10, 350), function(i) {
        qry = queries[0].format((i/10.0)+"M")
        args = querystring.stringify({'q':qry,'start':0*100,'num':100,"filter":0})
        url = 'https://www.google.com/search?'+ args
        url = Crawlera.url(url)
        return url
    })
    start_urls = k_urls.concat(m_urls)

    var _this = this;

    var i = _.random(0, Math.ceil(start_urls.length/1000))
    start_urls = start_urls.slice(1000*i,1000*(i+1))

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
          //console.log(profiles)
          r.table("instagram_profiles").insert(profiles).run().then(function(data) {
            console.log(data)
          })
        })
      })
    )
  },

  download: function() {
    console.log("download")
    var _this = this;
    r.table("instagram_profiles").run().then(function(profiles) {
      //var i = _.random(0, Math.ceil(profiles.length/1000))
      //i = 10
      //profiles = profiles.slice(1000*i,1000*(i+1))
      _.map(_.shuffle(profiles), rateLimit(100, 1000, function(profile) { 
        link = profile.link
        if(link.indexOf(".com/explore/") != -1 || link.indexOf("/p/") != -1 || link.indexOf("/help/") != -1) { return }
        //console.log(profile.link.split("/%3F")[0])
        request.get(profile.link.split("/%3F")[0], function(err, res, html) {
          if(err) { return }
          console.log(err)
          //console.log(res.statusCode)
          console.log(res.statusCode + " " + profile.link)
          if(res.statusCode != 200)  { return } 
          console.log(this.uri.href)
          profile = _this.parseProfile(html)
          profile.createdAt = moment().unix()
          r.table("instagram_profile_stats").insert(profile).run().then(function(res) {
            console.log("insert")
            console.log(res)
          })

          /*
          qry = r.table("instagram_profiles").getAll(this.uri.href, {index: "link"}).update(profile)
          qry.run().then(function(res) {
            console.log(res)
          })
          */
        })
      })
      )
    })
  },

  batchDownload: function() {
    var _this = this;
    profileParse = this.profileParse
    var q = async.queue(profileParse, 10);


    // assign a callback
    q.drain = function() {
        console.log('all items have been processed');
    }

    r.table("instagram_profiles").limit(30).run().then(function(profiles) {
    //r.table("instagram_profiles").run().then(function(profiles) {
      profiles = _.map(profiles, function(e) { 
        e.parseProfile = _this.parseProfile
        return e  
      })

      q.push(profiles, function (err) {
          console.log('finished processing item');
      });
    })
  },

  profileParse: function(profile, callback) { 
    var _this = this
    parseProfile = profile.parseProfile
    link = profile.link
    console.log(link)
    if(link.indexOf(".com/explore/") != -1 || link.indexOf("/p/") != -1 || link.indexOf("/help/") != -1) { return }
    console.log(profile.link)
    request.get(profile.link, function(err, res, html) {
      if(err) { 
        //callback();
        return 
      }
      console.log(err)
      console.log(res.statusCode + " " + profile.link)
      if(res.statusCode != 200)  { 
        //callback();
        return 
      } 
      console.log(this.uri.href)
      //profile = _this.parseProfile(html)
      profile = parseProfile(html)
      profile.createdAt = moment().unix()
      r.table("instagram_profile_stats").insert(profile).run()
      qry = r.table("instagram_profiles").getAll(this.uri.href, {index: "link"}).update(profile)
      qry.run().then(function(res) {
        console.log(res)
        //callback();
      })
    })
  },


  parseLinks: function() {

  },

  parseProfile: function(html) {
    $ = cheerio.load(html)

    profile_pic = $('meta[property="og:image"]').attr("content")
    desc = $('meta[property="og:description"]').attr("content")
    lol = $($("script").slice(-4)[0]).text().slice(21, -1)
    lol = JSON.parse(lol)
    user = lol["entry_data"]["ProfilePage"][0]["user"]

    pics = user["media"]["nodes"]
    delete user["media"]
    delete user["id"]
    user["profile_pic"] = profile_pic
    user["description"] = desc
    user["name"] = user["full_name"]
    user["followers"] = user["followed_by"]["count"]
    user["following"] = user["follows"]["count"]
    return user
  },

  photoTrack: function() {
    // Get All Photos
    return request.get("https://www.instagram.com/p/-KircWEqYO/", cb)
  },

  photoHack: function() {
    url = "https://www.instagram.com/p/-KircWEqYO/"
    request.get(Crawlera.url(url), function(err, res, html) {
      $ = cheerio.load(html)
      /*
      console.log(_.map($("meta"), function(meta) {  
        return {
          content: $(meta).attr("content"),
          property: $(meta).attr("property"),
        }
      }))
      */
      s = $("script")
      //console.log(s.length)
      s = s[s.length - 4]
      //s = $(s).text().slice(21, s.length)
      s = $(s).text().slice(21, -1)
      //console.log(s)
      //console.log(JSON.parse(s))
      data = JSON.parse(s)["entry_data"]["PostPage"][0]["media"]//["owner"]
      data["link"] = "http://instagram.com/"+data["owner"]["username"]
      data.timestamp = moment().unix(),
      delete data.id

      /*
      data = {
        likes: $("span.-cx-PRIVATE-PostLikers__likeCount").text(),
        comments: $("ul.-cx-PRIVATE-PostInfo__comments > li").length,
        timestamp: moment().unix(),
      }
      */
      console.log(data)
      r.table("instagram_photo_activity").insert(data).run()
    })
  }
}

//Instagram.discover()
//Instagram.batchDownload()
Instagram.download()
module.exports = Instagram
