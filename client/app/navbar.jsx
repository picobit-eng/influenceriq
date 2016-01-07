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

          <span style={{display:"none"}}>
          <div className="search-btn" onClick={this.signOut}>
            <i className="fa fa-sign-out" />
          </div>

          <div className="search-btn">
            <i className="fa fa-bell" />
          </div>

          <div className="search-btn">
            <i className="fa fa-search" />
          </div>
          </span>

        </div>
      </div>
    )
  }
})

module.exports = NavBar
