var format = require('string-format')
format.extend(String.prototype)
var querystring = require("querystring")

var Crawlera = {
  url: function(url) {
    pw =  ""
    un = "5846ea676dc7405eac44d83201127e7f"
    CRAWLERA_URL = "http://{0}:{1}@proxy.crawlera.com/fetch?".format(un, pw)
    CRAWLERA_URL = CRAWLERA_URL + querystring.stringify({url: url})

    return CRAWLERA_URL
  }
}

module.exports = Crawlera
