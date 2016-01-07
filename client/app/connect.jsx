var Navbar = require("navbar")

var Connect = React.createClass({
  twitterLogin: function() {
    console.log("twitter")
    hello('twitter').login()
  },

  soundcloudLogin: function() {
    console.log("soundcloud")
    //hello('soundcloud').login()
    hello('instagram').login().then(function() {
        console.log('You are signed in to Facebook');
    }, function(e) {
        console.log('Signin error: ' + e.error.message);
    });
  },

  componentDidMount: function() {

    hello.on('auth.login', function(auth) {
      console.log(auth)
    })

  },

  render: function() {
    return (
      <div>
        <Navbar/>
        <div className="col-md-offset-3 col-md-6"
            style={{paddingTop:100,textAlign:"center"}}>
          <span style={{fontSize:20,fontWeight:100}}>
            CONNECT YOUR SOCIAL ACCOUNT
          </span>
            <hr/>
          <br/>
          <div className="tile" 
              onClick={this.twitterLogin}>
            <i className="fa fa-twitter" 
                style={{}}/>
            <div style={{fontSize:12}}> Twitter </div>
          </div>

          <div className="tile" 
              onClick={this.soundcloudLogin}>
            <i className="fa fa-soundcloud" 
                style={{}}/>
            <div style={{fontSize:12}}> Soundcloud </div>
          </div>

          <div className="tile" >
            <i className="fa fa-youtube" 
                style={{}}/>
            <div style={{fontSize:12}}> Youtube </div>
          </div>

          <br/>
          <br/>

          <div className="tile" >
            <i className="fa fa-instagram" 
                style={{}}/>
            <div style={{fontSize:12}}> Instagram </div>
          </div>

          <div className="tile" >
            <i className="fa fa-pinterest" 
                style={{}}/>
            <div style={{fontSize:12}}> Pinterest </div>
          </div>

          <div className="tile" >
            <i className="fa fa-vine" 
                style={{}}/>
            <div style={{fontSize:12}}> Vine </div>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Connect
