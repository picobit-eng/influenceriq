var YoutubeRow = require("youtube_row")
var InstagramRow = require("instagram_row")

var SocialFeed = React.createClass({
  render: function() {
    console.log(this.props)
    return (
      <div style={{height:'100%'}}>
      <NavBar />
        <SideBar />
        <ContentArea params={this.props.params}/>
      </div>
    )
  }
})

var SideBar = React.createClass({
  gotoYoutube: function() {
    location.href = "#/network/youtube/1"
  },

  gotoInstagram: function() {
    location.href = "#/network/instagram/1"
  },

  render: function() {
    return (
  <div className="sidebar">
    <div style={{marginTop:20}}>
      <h6 style={{fontWeight:"bold",marginBottom:1}}> 
        <img src="images/social_spark_dark_logo.png" className="" style={{height:20}}/> 
        TRENDING </h6>
      <h6 style={{fontWeight:"bold",marginTop:5}}> 
        <i className="fa fa-bars" style={{paddingLeft:2}}/>&nbsp; LISTS </h6>
    </div>
    <div >
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-calendar" style={{paddingLeft:2}}/>&nbsp; EVENTS
      </h6>
    </div>
    <div >
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-star" style={{paddingLeft:2}}/>&nbsp; BOOKINGS
      </h6>
    </div>
    <div >
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-compass" style={{paddingLeft:2}}/>&nbsp;
        EXPLORE
      </h6>
      <div style={{paddingLeft:20,marginTop:10}}>
        <h6><i className="fa fa-facebook"/>&nbsp;Facebook</h6>
        <h6><i className="fa fa-twitter"/>&nbsp;Twitter</h6>
        <h6><i className="fa fa-soundcloud"/>&nbsp;Soundcloud</h6>
        <h6 onClick={this.gotoYoutube} style={{cursor:"pointer"}}>
            <i className="fa fa-youtube"/>&nbsp;Youtube</h6>
        <h6 onClick={this.gotoInstagram} style={{cursor:"pointer"}}>
            <i className="fa fa-instagram"/>&nbsp;Instagram</h6>
        <h6><i className="fa fa-pinterest"/>&nbsp;Pinterest</h6>
        <h6><i className="fa fa-vine"/>&nbsp;Vine</h6>
        <h6><i className="fa fa-pinterest"/>&nbsp;Pinterest</h6>
        <h6><i className="fa fa-twitch"/>&nbsp;Twitch</h6>
      </div>
    </div>
    <div >
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-ellipsis-hh" style={{paddingLeft:2}}/>&nbsp;
        Categories
      </h6>
      <div style={{paddingLeft:20,marginTop:10}}>
        <h6><i className="fa fa-v"/>&nbsp;Music</h6>
        <h6><i className="fa fa-v"/>&nbsp;Comedy</h6>
        <h6><i className="fa fa-v"/>&nbsp;{"Film & Entertainment"}</h6>
        <h6><i className="fa fa-v"/>&nbsp;Gaming</h6>
        <h6><i className="fa fa-v"/>&nbsp;{"Beauty & Fashion"}</h6>
        <h6><i className="fa fa-v"/>&nbsp;Automotive</h6>
        <h6><i className="fa fa-v"/>&nbsp;Sports</h6>
        <h6><i className="fa fa-v"/>&nbsp;{"How-to & DIY"}</h6>
        <h6><i className="fa fa-v"/>&nbsp;{"Science & Education"}</h6>
        <h6><i className="fa fa-v"/>&nbsp;{"Lifestyle"}</h6>
      </div>
    </div>
  </div>
    )
  }
})

var NavBar = React.createClass({
  signOut: function() {
    localStorage.clear()
    location.href = "#"
  },
  render: function() {
    return (
      <div className="navbar">
        <div style={{paddingLeft:20, paddingTop:5}}>
            <img className="app-logo-img" src="images/infiq_black.png" style={{paddingTop:17}}/>
            <span className="app-logo-text" style={{color:'black',fontWeight:800}}>
            InfluencerIQ
          </span>
          <div className="search-btn" style={{backgroundImage:'url("images/user.png")', backgroundSize:'cover'}}>
          </div>

          <div className="search-btn" onClick={this.signOut}>
            <i className="fa fa-sign-out" />
          </div>

          <div className="search-btn">
            <i className="fa fa-bell" />
          </div>

          <div className="search-btn">
            <i className="fa fa-search" />
          </div>

        </div>
      </div>
    )
  }
})

var ContentArea = React.createClass({
  getInitialState: function() {
    return {
      page: 1,
      profiles: []
    }
  },

  componentDidMount: function () {
    var _this = this;
    params = this.props.params
    $.ajax({
      url: location.origin + "/network/"+params.network+"/" + params.page,
      dataType:"json",
      success: function(res) {
        console.log(res)
        _this.setState({profiles: res})
      }, 
      error: function(err) {
        console.log(err)
      }
    })
  },

  render: function() {
    var _this = this;
    rows = _.map(this.state.profiles, function(row) {
      if(_this.props.params.network = "youtube")
        return (<YoutubeRow row={row}/> )
      else if(_this.props.params.network = "instagram")
        return (<InstagramRow row={row}/> )
    })

    return (
      <div className="container" style={{paddingTop:10,fontFamily:"proxima-nova"}}>
        <div className="row" style={{height:500,overflow:"auto"}}>
          <div className="col-md-10" >
            <table className="" >
              <thead>
                <th></th>
                <th>Name</th>
                <th>Profile</th>
                <th>Subscribers</th>
                <th>Views</th>
                <th>
                </th>
              </thead>
              <tbody>
                {rows}
              </tbody>
            </table>
          </div>
        </div>

        <nav style={{textAlign:"center"}}>
          <ul className="pagination">
            <li>
              <a href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li>
              <a href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
})

var OldContentArea = React.createClass({
  render: function() {
    return (
      <div className="container" style={{paddingTop:10,fontFamily:"proxima-nova"}}>
        <div className="row">
          <div className="col-md-10" >
      <div className="content-area">
        <ol className="breadcrumb">
          <li><a href="#">Home</a></li>
          <li><a href="#">Library</a></li>
          <li className="active">Data</li>
        </ol>
  <div className="row" >
    <div className="col-md-3">
    <div className="panel panel-default">
      <div className="panel-body">
        Panel content
      </div>
      <div className="panel-footer">Panel heading without title</div>
    </div>
    </div>
    <div className="col-md-3">
    <div className="panel panel-default">
      <div className="panel-body">
        Panel content
      </div>
      <div className="panel-footer">Panel heading without title</div>
    </div>
    </div>
    <div className="col-md-3">
    <div className="panel panel-default">
      <div className="panel-body">
        Panel content
      </div>
      <div className="panel-footer">Panel heading without title</div>
    </div>
    </div>
    <div className="col-md-3">
    <div className="panel panel-default">
      <div className="panel-body">
        Panel content
      </div>
      <div className="panel-footer">Panel heading without title</div>
    </div>
    </div>
</div>
        

        <nav style={{textAlign:"center"}}>
          <ul className="pagination">
            <li>
              <a href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            <li><a href="#">1</a></li>
            <li><a href="#">2</a></li>
            <li><a href="#">3</a></li>
            <li><a href="#">4</a></li>
            <li><a href="#">5</a></li>
            <li>
              <a href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
          </div>
        </div>

      </div>
    )
  }
})

module.exports = SocialFeed
