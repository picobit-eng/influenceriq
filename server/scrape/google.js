var cheerio = require("cheerio");
var request = require("request");
var querystring = require("querystring")
var format = require('string-format')
format.extend(String.prototype)
var _ = require('underscore')

var Google = {
  url: function(qry) {
    page = 1
    args = querystring.stringify({'q':qry,'start':page*100,'num':100})
    url = 'https://www.google.com/search?'+ args
  },

  CRAWLERA_URL: function(url) {
    pw =  ""
    un = "5846ea676dc7405eac44d83201127e7f"
    CRAWLERA_URL = "http://{0}:{1}@proxy.crawlera.com/fetch?".format(un, pw)
    CRAWLERA_URL = CRAWLERA_URL + querystring.stringify({url: url})

    return CRAWLERA_URL
  },
  
  SPLASH_URL : "http://localhost:8950/render.html?",

  make_urls: function(company_name) {
      //company_name = self._remove_non_ascii(company_name)
      /*
      qry = ({"text":company_name})
      url ="https://www.yandex.com/search/?{0}".format(qry)
      url = this.CRAWLERA_URL + ({'url':url})
      url = (url)
      yd_url = this.SPLASH_URL + ({'url': url})

      qry = ({"q":company_name})
      url = "https://duckduckgo.com/?{0}".format(qry)
      url = CRAWLERA_URL + ({'url':url})
      url = urllib.unquote_plus(url)
      dd_url = SPLASH_URL + urllib.urlencode({'url': url})
      */

      qry = ({"q":company_name})
      url = "http://www.bing.com/search?{0}".format(qry)
      bg_url = this.CRAWLERA_URL + ({'url':url})

      args = querystring.stringify({'q':company_name,'start':0,'num':100})
      url = 'https://www.google.com/search?'+ args
      g_url = this.CRAWLERA_URL + querystring.stringify({'url':url})
      return {bing: bg_url, google: g_url}
  },

  parse_linkedin_profiles: function(google_results) {
    linkedin_results = _.map(google_results, function(result) {
        data = {}
        data['name'] = result.name.split('|')[0].strip().split(',')[0]
        data['locale']  = result.title.split('-')[0].strip()
        data['company_name']  = result.title.split(' at ')[-1].strip()
        data['title']  = result.title.split(' at ')[0].split('-')[-1].strip()
        data['linkedin_url'] = result.link
        return data
    })
    return linkedin_results
  },

  search: function(qry, cb) {
    page = 0
    args = querystring.stringify({'q':qry,'start':page*100,'num':100})
    url = 'https://www.google.com/search?'+ args
    url = this.CRAWLERA_URL(url)

    return request.get(url, cb)
  },

  results: function(html) {
    $ = cheerio.load(html)
    results = _.map($("li.g"), function(row) {
      link = $(row).find("a").attr("href")
      link = (link) ? link.split("=")[1].split("&")[0] : undefined
      return {
        link_text: $(row).find("h3").text(),
        link:      link,
        link_span: $(row).find("span .st").text(),
        url:       $(row).find("cite").text(),
        title:     $(row).find("div .slp").text()
      }
    })
    return results
  }
}

module.exports = Google
