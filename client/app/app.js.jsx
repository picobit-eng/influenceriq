/** @jsx React.DOM */

/* TODO
 * 
 * - All count change, when prospect is archived
 * - When is list is chaanged from all and then returned to All prospects take a long     time to load
 * - Fix pagination issues
 *
 * - Parallelize Workers
 * - Scale up google scrape to hundreds of workers (heroku)
 *
 * - Company Shortcuts 
 * - Add ability to switch accounts for admins
 * - Add email uneditable email fields
 */

var Parse = require("../lib/parse-require.min.js")
var MouseTrap = require('../lib/mousetrap.min.js')
var Headhesive = require('../lib/headhesive.min.js')
var SignUp = require('./signup.jsx');
var Login = require('./login.jsx');
var LandingPage = require('./landing_page_concept.jsx');
var SocialFeed = require('./social_feed.jsx');

var Home = React.createClass({
  getInitialState: function() {
    // num_of_pages
    console.log(this.props)
    return {prospects: [] , 
            currentPage: 1, 
            pages: 1, 
            count:"~", 
            prospectType:'Prospect', 
            //selectedScreen:'Prospects'}
            currentUser: JSON.parse(localStorage.currentUser),
            selectedScreen: this.props.selectedScreen}
  },

  componentDidUpdate: function() {
    currentUser = JSON.parse(localStorage.currentUser)
    days = moment().diff(moment(currentUser.createdAt),'days')
    if(days > 14 && currentUser.accountType == 'trial') {
      $('#upgradePlanModal').modal( {
        backdrop: 'static',
        keyboard: false
      })
    }
  },

  componentWillMount: function(){
    //console.debug('WILL MOUNT')
    checkAuth()
    var thiss = this;
    //console.debug(this.state.currentUser)
    $.ajax({
      url:'https://api.parse.com/1/classes/_User/'+thiss.state.currentUser.objectId,
      headers: appConfig.headers,
      success: function(res) {
        //console.debug('LOL')
        // Number of Prospects for user
        // Number of Lists
        // Number of Emails found
        localStorage.currentUser = JSON.stringify(res)
        console.log(res)
        Intercom('boot', {
          app_id: 'd37c2de5ffe27d69b877645351490517333437bf',
          email: res.email,
          created_at: 1234567890,
          name: 'John Doe',
          user_id: 'lol'
        });
      },
      error: function(err) {
        console.debug('error')
      }
    });
    // Intercom
    // Mixpanel
  },


  toggleScreen: function(e) {
    e.preventDefault()
    this.setState({selectedScreen : $(e.target).text().trim()})
  },

  logout: function() {
    localStorage.clear()
    location.href = "#get_started"
  },

  listDropdown: function() {
    console.log('dropdown')
    //$('.dropdown-menu').dropdown()
    $('.prospect-list-select').css('border-bottom-right-radius','0px')
    $('.prospect-list-select').css('border-bottom-left-radius','0px')
      
    $('.list-select-dropdown').css('border-top-left-radius','0px')
    $('.list-select-dropdown').css('border-top-right-radius','0px')
  },

  selectChange : function() {

  },

  stripeCheckout: function() {
    /*
    handler.open({
      name: 'Customero',
      description: 'Get 900 free email credits!',
      amount: 0,
      panelLabel: "Start Your Free Trial!",
      opened: function() {

      },
      closed: function() {
        console.log("closed")
        //location.reload()
      }
    });
    */
  },

  componentDidMount: function() {
    // Credit Card Verified Check
    localStorage.selectedProspects = "[]"
    currentUser = JSON.parse(localStorage.currentUser)
    if(!currentUser.creditCardVerified)
      this.stripeCheckout()
    //console.debug('DID MOUNT')
    currentUser = JSON.parse(localStorage.currentUser)
    days = moment().diff(moment(currentUser.createdAt),'days')
    if(days > 14 && currentUser.accountType == 'trial') {
      $('#upgradePlanModal').modal( {
        backdrop: 'static',
        keyboard: false
      })
    }
  },

  render: function() {
    //console.debug('APP RENDER')
    prospects = "choose btn btn-primary "
    companyProspects = "choose btn btn-primary "
    campaigns = "choose btn btn-primary "
    signals = "choose btn btn-primary "

    switch (this.state.selectedScreen) {
      case 'Prospects':
        currentScreen = <Prospects listClassName={'ProspectList'}
                                   className={'Prospect'}> 
                                   </Prospects>
        //currentScreen = <Prospects><ProspectRow /></Prospects>
        prospects = "choose btn btn-primary app-active"
        location.href= "#prospects"
        break;
      case 'Companies':
        currentScreen = <Prospects listClassName={'CompanyProspectList'}
                                   className={'CompanyProspect'} >
                        </Prospects>
                                    // paginationLimit
                                    // Add Lists
                                    // Adding Customizable Rows
                                    // Make Editable For NoSQL DataBases
        location.href= "#companies"
        companyProspects = "choose btn btn-primary app-active"
        break;
      case 'Mining Jobs':
        currentScreen = <MiningJob />
        break;
      case 'Analytics':
        currentScreen = <Analytics />
        break;
      case 'Campaigns':
        currentScreen = <Campaigns />
        campaigns = "choose btn btn-primary app-active"
        location.href= "#campaigns"
        break;
      case 'Signals':
        currentScreen = <Signals />
        signals = "choose btn btn-primary app-active"
        location.href= "#signals"
        break;
      case 'Strategies':
        currentScreen = <Signals />
        signals = "choose btn btn-primary app-active"
        location.href= "#strategies"
        break;
      case 'Settings':
        currentScreen = <Settings />
        break;
    }

    if(this.state.currentUser.accountType != "Staff"){
      signals = "dissappear"
      campaigns = "dissappear"
      if(companyProspects == "choose btn btn-primary app-active") {
        companyProspects = "choose btn btn-primary app-active right-btn-rounded"
      } else {
        companyProspects = "choose btn btn-primary right-btn-rounded"
      }
      if(prospects == "choose btn btn-primary app-active") {
        prospects = "choose btn btn-primary app-active left-btn-rounded"
      } else {
        prospects = "choose btn btn-primary left-btn-rounded"
      }
    }
      
    currentUser = JSON.parse(localStorage.currentUser)
    daysLeft = moment().diff(moment(currentUser.createdAt),'days')
    daysLeft = (daysLeft > 14) ? "" : (14 - daysLeft)+" days left. "

    if(currentUser.accountType != "trial")
      upgradeBtn = <a href="javascript:" 
            style={{marginTop:0, marginRight:10,
                    backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%)' , backgroundImage: 'linear-gradient(#8add6d, #60b044)'}}
            className="btn btn-success btn-xs"
            onClick={this.upgradePlanModal}> 
            {daysLeft+"Upgrade Today!"}
          </a>
    else
      upgradeBtn = ""
    return (
      <div>
      <br/>
      <br/>
      <div className="container">
        <h1 style={{fontWeight:'bold',display:'inline',fontWeight:'100',color:'#1ca3fd'}}>
          <img src="build/img/network.png" 
            style={{ height:32,
              marginRight:5, }}
          />
          <span style={{fontWeight:'bold',fontSize:32,fontFamily:'Proxima-Nova' }}>Customero 
            <h6 className="beta-label">BETA</h6>
          </span>

          {upgradeBtn}
        </h1>
      <span style={{float:'right',display:'none'}}>
        <img src="build/img/user.png" style={{height:'40px',width:'40px',padding:'2px',marginTop:'5px',borderRadius:'23px',display:'inline'}} className="thumbnail"/>&nbsp;&nbsp;&nbsp; 
        <h6 style={{marginTop:'20px',float:'right',display:'inline'}}>Welcome </h6>
      </span>
      <span style={{float:'right', marginRight:'0px'}}>
        <h6 style={{marginTop:'20px',float:'right',display:'none',marginRight:'10px'}}><a href="#pricing" style={{color:'#1ca3fd'}}>Pricing</a></h6>
          <a href="javascript:" 
            style={{marginTop:15, float:'right',marginRight:10,
                    backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%)' , backgroundImage: 'linear-gradient(#8add6d, #60b044)'}}
            className="btn btn-success btn-xs"
            onClick={this.downloadSocialProspecter}> 
            <i className="fa fa-download" /> &nbsp;
            Download Chrome Social Prospecter
          </a>
        <h6 style={{marginTop:'20px',float:'right',display:'inline', marginRight:10}}><a href="javascript:" onClick={this.logout} style={{color:'#1ca3fd'}}>
            <i className="fa fa-sign-out" />
            Logout</a></h6>
          <h6 style={{marginTop:'20px',float:'right',display:'inline', marginRight:'10px'}}> <a href="http://resources.customerohq.com/v1.0/discuss" style={{color:'#1ca3fd'}}>

              <i className="fa fa-question-circle" />
              <span style={{paddingLeft:2}}>{'Support'}</span>
        </a> </h6>
        <h6 style={{marginTop:'20px',float:'right',display:'inline', marginRight:'10px'}}> 
          <a href="http://resources.customerohq.com/v1.0/docs" style={{color:'#1ca3fd'}}>
              <i className="fa fa-book" />
              <span style={{paddingLeft:2}}>Resources</span>
          </a> </h6>
          <h6 style={{marginTop:'20px',float:'right',display:'inline', marginRight:'20px',display:'none'}}> 
            <a href="javascript:" style={{color:'#1ca3fd'}}>
              <i className="fa fa-bell" />
              <span style={{paddingLeft:2}}>Notifications </span>
              <div className="label notification-badge">0</div>
          </a></h6>
          <h6 style={{marginTop:'20px',float:'right',display:'inline', marginRight:'20px',display:'none'}}> 
            <a href="javascript:" style={{color:'#1ca3fd'}}>
              <i className="fa fa-cloud-download" />
              <span style={{paddingLeft:2}}>Mining Jobs </span>
              <div className="label notification-badge">0</div>
          </a></h6>

      </span>
      <br/>
      <br/>
        <div className="panel panel-default">
        <div id="navbar" className="panel-heading"> 

          <div className="btn-group col-md-offset-4" >
            <a href="javascript:" className={signals} style={{display:'block'}} onClick={this.toggleScreen}> 
                <i className="fa fa-line-chart" />&nbsp;Strategies
            </a>
            <a href="javascript:" className={prospects} onClick={this.toggleScreen}> 
                <i className="fa fa-user" />&nbsp;Prospects
            </a>
            <a href="javascript:" className="choose btn btn-primary" style={{display:'none'}} onClick={this.toggleScreen}>
                <i className="fa fa-bar-chart-o" /> Analytics
            </a>
            <a href="javascript:" className="choose btn btn-primary" 
                  style={{width:162,display:'none'}}
                  onClick={this.toggleScreen}>
                <i className="fa fa-tasks" /> Mining Jobs &nbsp;
                <span className="label label-default">BETA</span>
            </a>
            <a href="javascript:" className={companyProspects} onClick={this.toggleScreen}>
                <i className="fa fa-building" /> Companies
            </a>
            <a href="javascript:" className={campaigns} style={{display:'block'}} onClick={this.toggleScreen}>
                <i className="fa fa-envelope" />&nbsp;Campaigns
            </a>
          </div>
        </div>

          {currentScreen}

        </div>
      </div>
      <UpgradePlanModal />
      </div>
    );
  },

  upgradePlanModal: function() {
    $('#upgradePlanModal').modal()
  },
  
  downloadSocialProspecter: function() {
    window.open('https://chrome.google.com/webstore/detail/customero-prospecter/ofcalkjbogaiipekcocdefjenclioeci')
  },

  deleteProspect: function(objectId, endpoint) {
    var filtered = _.filter(this.state.prospects, function(item) {
       return item.objectId != objectId
    });
    this.setState({prospects: filtered})

    $.ajax({
      url:'https://api.parse.com/1/classes/'+endpoint+'/'+objectId,
      type:'DELETE',
      headers: parse_headers,
      success: function(res) {
        console.log(res)
      },
      error: function(err) {
      }
    });
  }
});
