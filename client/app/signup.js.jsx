/** @jsx React.DOM */

theData = require('../lib/data.min.js') 
var _Parse = require("../lib/parse-require.min.js")

module.exports = React.createClass({
  // SignUp
  componentDidMount: function() {
    //$('body').css({overflow:'hidden'})
    //$('body').css({overflow:'hidden'})
    var thiss = this;
    $("input").keypress(function(event) {
        if (event.which == 13) {
          event.preventDefault();
          thiss.signup()
        }
    });
  },

  retrieveUser: function(objectId) {
    $.ajax({
      url:'https://api.parse.com/1/users/'+objectId,
      //headers: appConfig.headers,
      headers: _Parse.headers,
      type:'GET',
      success:function(res) {
        localStorage.setItem('currentUser', JSON.stringify(res))
        location.href = "#"
      },
      error: function(res) {
        console.log(res)
      }
    });
  },

  signup: function() {
    console.log('signup')
    email = $('#email').val().trim()
    password = $('#password').val().trim()
    thiss = this;
    if($('#company').val().trim() == "" || email == "" || password == ""){
      alertify.error('There was an error with your registration request. Please try again')
      return 0
      
    }

    data = JSON.stringify({ 'name': $('#company').val() }),
    Parse.create("UserCompany", data).then(function(res) {
      console.log(res)
      userData = JSON.stringify({
        'username':email,
        'password': password,
        'accountType':'trial',
        'user_company':{
          '__type'    : 'Pointer',
          'className' : 'UserCompany',
          'objectId'  : res.objectId,
        }
      })
      Parse.create("User", userData).then(function(res) {
        console.log(res)
        Parse.getObject("User", res.objectId).then(function(res) { 
            console.log(res)
            localStorage.setItem('currentUser', JSON.stringify(res))
            location.href = "#"
        })
      })
    })

    /*
    $.ajax({
      url:'https://api.parse.com/1/classes/UserCompany',
      type:'POST',
      //headers: appConfig.headers,
      headers: _Parse.headers,
      data: JSON.stringify({ 'name': $('#company').val() }),
      success:function(res) {
        $.ajax({
          url:'https://api.parse.com/1/users',
          type:'POST',
          headers: appConfig.headers,
          data: JSON.stringify({
            'username':email,
            'password': password,
            'accountType':'trial',
            'user_company':{
              '__type'    : 'Pointer',
              'className' : 'UserCompany',
              'objectId'  : res.objectId,
            }
            // people_archive_list
            // company_archive_list
            // ClearSpark - api_key
          }),
          success:function(res) {
            // Do another request to get current user
            localStorage.setItem('currentUser', JSON.stringify(res))
            thiss.retrieveUser(res.objectId)
          },
          error: function(res) {
            console.log(res)
            alertify.error('There was an error with your registration request. Please try again')
          }
        });
      },
      error: function(res) {
        console.log(res)
        alertify.error('There was an error with your registration request. Please try again')
      }
    });
    */
  },

  render: function() { 
    data = theData()
    imgs_1 = []
    imgs_2 = []
    for(i=0;i < 120; i++) {
      imgs_1.push(<img src={data[i]} className="prospect-img" />)
    }
    for(i=15;i < 30; i++) {
      imgs_2.push(<img src={data[i]} className="prospect-img" />)
    }

    return (
      <div id="signup" style={{marginTop:0}}>

      <div style={{paddingTop:100}}>
        <h1 className="title">SocialSpark.</h1>
        <h5 className="tagline"> </h5>
          <div className="panel panel-default login-info" style={{display:'block',marginTop:50}}>
            <div className="panel-body" style={{fontFamily:'proxima-nova',fontWeight:'bold'}}>
              <form onSubmit={this.login}>
              <input placeholder="Email" id="email" type="text" className="form-control input-lg"/>
              <br/>
              <input placeholder="Company" type="text" id="company" className="form-control input-lg" />
              <br/>
              <input placeholder="Password" type="password" id="password" className="form-control input-lg" />
              <br/>
              <input placeholder="Repeat Password" type="password" id="repeat_password" className="form-control input-lg" />
              <br/>
              <a href="javascript:" onClick={this.signup} className="btn btn-primary btn-lg" style={{display:'block',backgroundColor:'#1ca3fd', backgroundImage: 'linear-gradient(180deg, #0096ff 0%, #005dff 100%)',borderRadius:3,fontFamily:'proxima-nova',fontWeight:'bold'}}>Sign Up</a>
              </form>
            </div>
          </div>
      </div>

      <div id="" style={{position:'absolute',zIndex:'-2',top:0,left:0}}>
        <div className="" style={{marginLeft:0,width:'120%',display:'none'}}>
        {imgs_1}
        {imgs_2}
        </div>
      </div>
      </div>
    )
  }
});
