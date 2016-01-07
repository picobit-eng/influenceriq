
var NavBar = require("navbar")
var SideBar = require("sidebar")

var Panel = ReactBootstrap.Panel

var InstagramProfile = React.createClass({
  render: function() {
    profile = JSON.parse(localStorage.currentProfile)
    return (
      <div style={{height:'100%'}}>
        <NavBar />
          <SideBar />
          <div className="col-md-offset-2 col-md-10" style={{overflow:"auto",paddingTop:10,fontFamily:"proxima-nova",backgroundColor:"#f4faff",paddingTop:50,paddingBottom:70,paddingLeft:50}}>
          <br/>
          <div className="col-md-3">
          <img src={profile.profile_pic} className="thumbnail"
              style={{width:"100%"}}/>           
          <span>{"@"+profile.username}</span>
          <h3>{profile.full_name}</h3>
          <h5>{profile.biography}</h5>
          <a href="javascript:" style={{display:"block",fontSize:24}}
          className="btn btn-lg btn-primary">
            BUY POST
          </a>
          </div>
          <div className="col-md-9">
            <div className="panel panel-default" style={{display:"none"}}>
              <div className="panel-heading">
              Stats
              </div>
              <div className="panel-body">
              Stats
              </div>
            </div>

            <div className="row" >
              <h3 style={{marginLeft:20}}>Audience</h3>
              <hr style={{marginLeft:20,marginTop:10}}/>
              <div className="col-md-4" style={{textAlign:"center"}}>
                <Panel header={"Followers"}>
                  <h1 style={{fontWeight:600,fontSize:50}}>{profile.followers}</h1>
                </Panel>
              </div>
              <div className="col-md-4" style={{textAlign:"center"}}>
                <Panel header={"MEDIA VALUE PER POST"}>
                  <h1 style={{fontWeight:600,fontSize:50}}>{"$"+Math.ceil(profile.followers/99.3)}</h1>
                </Panel>
              </div>
              <div className="col-md-4" style={{textAlign:"center"}}>
                <Panel header={"title"}>
                  <h1 style={{fontWeight:600,fontSize:50}}>{profile.followers}</h1>
                </Panel>
              </div>
            </div>

            <div className="row" >
              <h3 style={{marginLeft:20}}>Engagement</h3>
              <hr style={{marginLeft:20,marginTop:10}}/>
              <div className="col-md-4" style={{textAlign:"center"}}>
                <Panel header={"Like Follower Ratio"}>
                  <h1 style={{fontWeight:600,fontSize:50}}>{profile.followers}</h1>
                </Panel>
              </div>
              <div className="col-md-4" style={{textAlign:"center"}}>
                <Panel header={"Posts Per Week"}>
                  <h1 style={{fontWeight:600,fontSize:50}}>{"$"+Math.ceil(profile.followers/101.9)}</h1>
                </Panel>
              </div>
              <div className="col-md-4" style={{textAlign:"center"}}>
                <Panel header={"COMMENTS PER POST"}>
                  <h1 style={{fontWeight:600,fontSize:50}}>{profile.followers}</h1>
                </Panel>
              </div>
            </div>

            <br/>
            <div className="panel panel-default"
              style={{display:"none"}}>
              <div className="panel-heading">
              Stats
              </div>
              <div className="panel-body">
              Stats
              </div>
            </div>
          </div>
          </div>
      </div>
    )
  }
})

module.exports = InstagramProfile
