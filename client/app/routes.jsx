var DataExplorer = require("table")
var SocialFeed = require('social_feed');
var UserDatasetTable = require("user_dataset_table")

var TabbedArea = ReactBootstrap.TabbedArea
var TabPane = ReactBootstrap.TabPane
var SplitButton = ReactBootstrap.SplitButton
var MenuItem= ReactBootstrap.SplitButton
var Login = require("login")
var Landing = require("landing_page")
var LandingBrand = require("landing_brand")

var Route = ReactRouter.Route;
var RouteHandler = ReactRouter.RouteHandler;


var About = React.createClass({
  render: function () {
    return <h2>About</h2>;
  }
});

var Inbox = React.createClass({
  render: function () {
    return <h2>Inbox</h2>;
  }
});

var Navbar = React.createClass({
  render: function() {
    /*
      font-weight: bold;
      color: #0079ff
    */
    return (
      <header className="header">
        <ul className="text-muted">
          <li className="app-logo">
            <div>
            <img src="images/blaze-logo.png" style={{marginTop:4,height:18,marginLeft:-15}}/>
            <div style={{marginLeft:0}} style={{color:"#000"}}> QuantHub</div>
            </div>
          </li>
          <li style={{fontWeight:"bold",color:"#0079ff",color:"#000"}}>DATASETS</li>
          <li>USERS</li>
          <li>EXPLORE</li>
          <li>COMPUTE</li>
          <li style={{float:"right",marginRight:50}}>LOGOUT</li>
        </ul>
      </header>
    )
  }
})

var NewDatasetPanel = React.createClass({
  render: function() {
    return (
      <div className="col-md-offset-2 col-md-8">

        <div className="panel panel-default" style={{marginTop:20}}>
            <div className="panel-body" 
                 style={{paddingLeft:50,paddingRight:50}}>
              <h2 style={{fontWeight:800}}>Step 1: Add Dataset</h2>
              <span style={{fontWeight:400}} className="text-muted">
                Add dataset url with format hdfs://
              </span>
              <br/>
              <div>
              <hr/>
              <label htmlFor="inputEmail3" className="col-sm-2 control-label"
                style={{textAlign:"left",paddingTop:3,fontSize:18,fontWeight:800,paddingLeft:0,width:40}}>
                URL</label>
              <br/>
              <br/>
              <div className="col-sm-10" style={{paddingLeft:0}}>
                <input type="email" className="form-control" id="inputEmail3" placeholder="hdfs:// or postgres:// or mongo:// or s3:// or http://" style={{width: "124%"}}/>
              </div>
              <br/>
              <br/>
              <hr/>
              <label htmlFor="inputEmail3" className="col-sm-2 control-label"
                style={{textAlign:"left",paddingTop:3,fontSize:18,fontWeight:800,paddingLeft:0,width:40}}>
                DESCRIPTION</label>
              <br/>
              <br/>
              <div className="">
                <input type="email" className="form-control" id="inputEmail3" placeholder="hdfs:// or postgres:// or mongo:// or s3:// or http://" style={{width: "100%"}}/>
              </div>
              <br/>
              <hr/>

                <div className="radio">
                    <input type="radio" name="radio2" id="radio3" value="option1" />
                    <label htmlFor="radio3">
                      <i className="fa fa-database" /> &nbsp;
                      Public </label>
                </div>
                <div className="radio">
                    <input type="radio" name="radio2" id="radio4" value="option2" />
                    <label htmlFor="radio4">
                      <i className="fa fa-lock" /> &nbsp;
                      Private </label>
                </div>
              </div>
              <br />
              <a href="#" className="btn btn-lg btn-primary center-item"
                style={{width:200}}>
                CONTINUE</a>
              <br />
            </div>
        </div>
      </div>
    )
  }
})

var OldApp = React.createClass({
  render: function() {
    return (
      <div className="app" >
        <div className="home-page">
          <Navbar />
        </div>
        <div className="container">
          <RouteHandler/>
        </div>
      </div>
    )
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div style={{height:"100%"}}>
        <RouteHandler/>
      </div>
    )
  }
});

var AuthenticatedApp = React.createClass({
  render: function() {
    return (
      <div className="" >
        <RouteHandler/>
      </div>
    )
  }
});

var DatasetDetail = React.createClass({
  render: function() {
    return (
      <div>
        <br/>
        <div className="section-title" >Test Dataset</div>
        <ul className="dataset-detail">
          <li>Type</li>
          <li>Name</li>
          <li>Shape</li>
          <li>URL</li>
          <li>Date Added</li>
        </ul>
        <div style={{float:"right",marginTop:-55,fontWeight:800}}>
          
          <div style={{display:"inline-block",width:130}}>
          <a href="javascript:" className="btn btn-xs btn-default action-btn"
              style={{borderRight:0,borderRadius: "3px 0px 0px 3px !important"}}>
            <i className="fa fa-star"/>&nbsp;STAR  
          </a>
            <span className="action-badge"
                  style={{}}> 3.2M </span>
          </div>
          <div style={{display:"inline-block",width:130}}>
            <a href="javascript:" className="btn btn-xs btn-default action-btn"
                style={{borderRight:0,borderRadius: "3px 0px 0px 3px !important"}}>
            <i className="fa fa-code-fork"/> &nbsp;ANALYZE
          </a>
          <span className="action-badge"
            style={{}}> 
            3.2M 
          </span>
          </div> 
        </div>
        <hr/>
        <span>
          Zillow is in the process of diversifying our data sources and integrating dozens of new data feeds. 
          Ultimately, this wider diversity of data sources will lead to published data that is both more comprehensive and timely. But as this new data is incorporated, the publication of select metrics may be delayed or temporarily suspended as we work to ensure this new data meets our strict quality standards and fits into our existing datasets and databases. We look forward to resuming our usual publication schedule for all of our established datasets soon, and we apologize for any inconvenience. Thank you for your patience and understanding.
        <br/>
        <br/>



        </span>

        <TabbedArea defaultActiveKey={1}>
          <TabPane eventKey={1} tab='EXPLORE'><DataExplorer/></TabPane>
          <TabPane eventKey={2} tab='DISCUSSION'>TabPane 2 content</TabPane>
          <TabPane eventKey={3} tab='ANALYSIS'>TabPane 3 content</TabPane>
          <TabPane eventKey={4} tab='COLLABORATORS'>TabPane 3 content</TabPane>
          <TabPane eventKey={5} tab='VISUALIZATIONS'>TabPane 3 content</TabPane>
        </TabbedArea>
      </div>
    )
  }
})

var DatasetDiscussion = React.createClass({
  render: function() {
    return (
      <div>
        Discussion
      </div>
    )
  }
})

var DatasetAnalysis = React.createClass({
  render: function() {
    return (
      <div>
        Analysis
      </div>
    )
  }
})

var DatasetCollaborators = React.createClass({
  render: function() {
    return (
      <div>
        Collaborators
      </div>
    )
  }
})

var LandingPage = React.createClass({
  render: function() {
    return (
      <div>
        Visualizations
      </div>
    )
  }
})

var Signup = React.createClass({
  render: function() {
    return (
      <div>
        Visualizations
      </div>
    )
  }
})

var InstagramProfile = React.createClass({
  render: function() {
    return (
      <div>
        Visualizations
      </div>
    )
  }
})

var YoutubeProfile = React.createClass({
  render: function() {
    return (
      <div>
        Visualizations
      </div>
    )
  }
})

var Pricing = React.createClass({
  render: function() {
    return (
      <div>
        Visualizations
      </div>
    )
  }
})

var ChoosePlan = React.createClass({
  render: function() {
    return (
      <div>
        Visualizations
      </div>
    )
  }
})

var FreeTrial  = React.createClass({
  render: function() {
    return (
      <div>
        Visualizations
      </div>
    )
  }
})

// declare our routes and their hierarchy
var routes = (
    <Route >
      <Route handler={App}>
        <Route path="" handler={SocialFeed}/>
        <Route path="login" handler={Login}/>
        <Route path="landing" handler={Landing}/>
        <Route path="brands" handler={LandingBrand}/>
        <Route path="signup" handler={Signup}/>
      </Route>

      <Route handler={AuthenticatedApp}>
        <Route path="dashboard" handler={SocialFeed} />
        <Route path="/network/:network/:page" handler={SocialFeed}/>
        <Route path="/profile/youtube/:id" handler={YoutubeProfile}/>
        <Route path="/profile/instagram/:id" handler={InstagramProfile}/>
        <Route path="pricing" handler={Pricing}/>
        <Route path="profile" handler={ChoosePlan}/>
        <Route path="free_trial" handler={FreeTrial}/>
      </Route>
  </Route>
);

module.exports = routes;
