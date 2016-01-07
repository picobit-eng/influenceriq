var YoutubeRow = require("youtube_row")
var InstagramRow = require("instagram_row")
var NavBar = require("navbar")
var SideBar = require("sidebar")

var Pagination = ReactBootstrap.Pagination

var SocialFeed = React.createClass({
  getInitialState: function() {
    return {
      yo: false
    }
  },

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



var ContentArea = React.createClass({
  getInitialState: function() {
    return {
      page: 1,
      profiles: []
    }
  },

  getProfiles: function (page) {
    var _this = this;
    params = this.props.params
    network = "instagram"
    //page = this.state.page
    if(page)
      page = page
    else
      page = this.props.params.page
    $.ajax({
      url: location.origin + "/network/"+network+"/" + page,
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

  componentWillUpdate: function() {
    this.getProfiles(this.state.page)
  },

  componentDidMount: function () {
    this.getProfiles()
  },

  render: function() {
    profiles = _.range(50)
    profiles = this.state.profiles
    cards = _.map(profiles, function(profile, i) {
      return <IGProfileCard _id={i} profile={profile}/>
    })
    // <div className="row" style={{height:500,overflow:"auto"}}>
    return (
      <div className="col-md-offset-2 col-md-10" style={{overflow:"auto",paddingTop:10,fontFamily:"proxima-nova",backgroundColor:"#f4faff",paddingTop:50,paddingBottom:70,paddingLeft:50}}>
      
        <br/> {cards}
        <nav style={{textAlign:"center"}} className="pag-bar">

          <Pagination
            prev
            next
            first
            last
            ellipsis
            items={20}
            maxButtons={5}
            activePage={this.state.page}
            onSelect={this.handleSelect} />

        </nav>
      </div>
    )
  },

  handleSelect(event, selectedEvent) {
    location.href="/#/network/instagram/"+selectedEvent.eventKey
    this.setState({
      page: selectedEvent.eventKey
    });
  },
})

var IGProfileCard = React.createClass({
  gotoProfile: function() {
    console.log(this.props._id)
    profile = this.props.profile
    location.href = "/#/instagram/influencer/" + profile.username
    localStorage.currentProfile = JSON.stringify(this.props.profile)
    console.log(this.props.profile)
  },

  render: function() {
    img = "https://pbs.twimg.com/profile_images/603723595710251009/qOHwpwt8_200x200.jpg" 
    profile = this.props.profile
    img = (profile.profile_pic) ? profile.profile_pic_url : img
    followers = (profile.followers) ? profile.followers : 2341234

    return (
      <div style={{display:"inline-block",cursor:"pointer"}}
          onClick={this.gotoProfile}>
        <div className="panel panel-default" style={{width:100, marginLeft:50}}>
          <div className="panel-heading"
            style={{display:"none"}}>Timothy Delaghetto</div>
          <div style={{backgroundImage:"url('"+img+"')",height:100,backgroundSize:"cover"}}>
          </div>
          <div className="panel-footer"
            style={{fontWeight:"bold",fontSize:11,textAlign:"center"}}>
            <i className="fa fa-instagram" /> &nbsp; {followers}
            <a href="javascript:" className="btn btn-primary btn-xs"
              style={{fontSize:11,display:"block",width:"119%",marginRight:-15}}>
              <i className="fa fa-plus-circle" style={{marginRight:5}}/>
              BUY POST</a>
          </div>
        </div>
      </div>
    )
  }
})
var TableContentArea = React.createClass({
  getInitialState: function() {
    return {
      page: 1,
      profiles: []
    }
  },

  componentDidMount: function () {
    var _this = this;
    params = this.props.params
    network = "instagram"
    page = this.state.page
    $.ajax({
      url: location.origin + "/network/"+network+"/" + page,
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
    profiles = this.state.profiles
    profiles = _.range(10)
    rows = _.map(profiles, function(row) {
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
        <PaginationAdvanced />
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
        

        <PaginationAdvanced />

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

const PaginationAdvanced = React.createClass({
  getInitialState() {
    return {
      activePage: 1
    };
  },

  handleSelect(event, selectedEvent) {
    this.setState({
      activePage: selectedEvent.eventKey
    });
  },

  render() {
    return (
      <Pagination
        prev
        next
        first
        last
        ellipsis
        items={20}
        maxButtons={5}
        activePage={this.state.activePage}
        onSelect={this.handleSelect} />
    );
  }
});

module.exports = SocialFeed
