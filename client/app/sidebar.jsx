
var SideBar = React.createClass({
  gotoYoutube: function() {
    location.href = "#/network/youtube/1"
  },

  gotoInstagram: function() {
    location.href = "#/network/instagram/1"
  },

  render: function() {
    return (
  <div className="col-md-2 sidebar">
      <span style={{display:"none"}}>
    <div style={{marginTop:20}}>
      <h6 style={{fontWeight:"bold",marginBottom:1}}> 
        <img src="images/social_spark_dark_logo.png" className="" style={{height:20}}/> 
        TRENDING </h6>
      <h6 style={{fontWeight:"bold",marginTop:5}}> 
        <i className="fa fa-bars" style={{paddingLeft:2}}/>&nbsp; LISTS </h6>
    </div>
    <div >
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-calendar" style={{paddingLeft:2}}/>&nbsp; 
        CASTING CALLS
      </h6>
    </div>
    <div >
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-star" style={{paddingLeft:2}}/>&nbsp; BOOKINGS
      </h6>
    </div>
    </span>
    <div >
      <h6 style={{fontWeight:"bold"}}>
        <i className="fa fa-compass" style={{paddingLeft:2}}/>&nbsp;
        EXPLORE
      </h6>
      <div style={{paddingLeft:20,marginTop:10}}>
        <h6 onClick={this.gotoInstagram} style={{cursor:"pointer"}}>
            <i className="fa fa-instagram"/>&nbsp;Instagram</h6>
        <span style={{display:"none"}}>
        <h6 style={{display:"none"}}>
          <i className="fa fa-facebook"/>&nbsp;Facebook</h6>
        <h6><i className="fa fa-twitter"/>&nbsp;Twitter</h6>
        <h6><i className="fa fa-soundcloud"/>&nbsp;Soundcloud</h6>
        <h6 onClick={this.gotoYoutube} style={{cursor:"pointer"}}>
            <i className="fa fa-youtube"/>&nbsp;Youtube</h6>
        <h6><i className="fa fa-pinterest"/>&nbsp;Pinterest</h6>
        <h6><i className="fa fa-vine"/>&nbsp;Vine</h6>
        <h6 style={{display:"none"}}>
          <i className="fa fa-twitch"/>&nbsp;Twitch</h6>
        <h6 style={{display:"none"}}>
          <i className="fa fa-pinterest"/>&nbsp;Pinterest</h6>
        </span>
      </div>
    </div>

    <div style={{display:"none"}}>
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

module.exports = SideBar
