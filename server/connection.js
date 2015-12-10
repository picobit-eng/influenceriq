module.exports = {
  redis: function() {
    if(process.env.REDIS_URL) {
      var rtg   = require("url").parse(process.env.REDIS_URL);
      var rd = require("redis").createClient(rtg.port, rtg.hostname);
      rd.auth(rtg.auth.split(":")[1]);
    } else {
      var rd = require("redis").createClient();
    }
    return rd
  },

  rethinkdb: function() {
    if(process.env.DEBUG) {
      data = {authKey:"PPxYaDVvVmDhXccvM2qdGzFhyIdwcLpYSuyGIbTFD5c", db:"socialiq"}
      //data = {db:"socialiq"}
      var r = require('rethinkdbdash')(data);
    } else {
      var r = require('rethinkdbdash')({
          host:'rethinkdb_tunnel',
          port:process.env.RETHINKDB_TUNNEL_PORT_28015_TCP_PORT,
          db:process.env.RETHINKDB_DB,
          authKey:process.env.RETHINKDB_AUTH_KEY,
      })
    }
    return r
  }
}
