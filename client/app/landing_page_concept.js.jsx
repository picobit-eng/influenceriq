/** @jsx React.DOM */

var MarketingFooter = require('./marketing_footer.js.min.js');

module.exports = React.createClass({
  // Landing Page
  login: function() {
    console.log('login')
    email = $('#email').val()
    password = $('#password').val()
    p = {"X-Parse-Application-Id": "N85QOkteEEQkuZVJKAvt8MVes0sjG6qNpEGqQFVJ",
         "X-Parse-REST-API-Key": "VN6EwVyBZwO1uphsBPsau8t7JQRp00UM3KYsiiQb"}
    $.ajax({
      url:'https://api.parse.com/1/login',
      headers: p,
      type:'GET',
      data: {
        'username':email,
        'password':password
      },
      success:function(res) {
        localStorage.setItem('currentUser', JSON.stringify(res))
        location.href = "#"
      },
      error: function(res) {
        console.log(res)
      }
    });
  },
  componentDidMount: function() {
    //particles()
  },

  render: function() {
    $('body').css({overflow:'auto'})

    return (
      <div className="particles-js" id="particles-js">
        <nav className="thenavbar navbar navbar-default" role="navigation" style={{padding:70}}>
          <div className="container-fluid" style={{fontFamily:'proxima-nova', fontSize:12}}>
            <a href="#" style={{textDecoration:'none'}}>
            <img className="logo-img" src="build/img/social_spark_logo.png" />
            <span className="logo-text">
            SocialSpark
          </span>
          </a>
              <ul className="nav nav-pills landing-page-nav" role="tablist" style={{marginRight:0,fontSize:11,marginTop:-70,display:'none'}}>
                <li ><a className="landing-page-nav-tab" style={{display:'block'}} href="#login">LOGIN</a></li>
                <li><a className="landing-page-nav-tab" style={{display:'block'}} href="http://resources.customerohq.com/v1.0/blog">BLOG</a></li>
                <li><a className="landing-page-nav-tab" href="http://resources.customerohq.com">RESOURCES</a></li>
                <li><a className="landing-page-nav-tab" href="http://resources.customerohq.com/v1.0/discuss">KNOWLEDGE BASE</a></li>
                <li><a className="landing-page-nav-tab" href="#">+1905-616-7602 <i className="fa fa-phone"/></a></li>
              </ul>
          </div>
          <a href="#login" className="btn-lg btn login-btn" style={{fontFamily:'proxima-nova'}}>LOGIN</a>
              <ul className="nav nav-pills landing-page-nav" role="tablist" style={{width:600,fontSize:13,marginRight:100,marginTop:-45,display:'none'}}>
                <li style={{width:'24%',textAlign:'center',display:'block'}}>&nbsp;</li>
                <li style={{width:'24%',textAlign:'center',display:'none'}}>
                  <a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#">PRODUCT</a></li>
                <li style={{width:'24%',textAlign:'center',display:'none'}}>
                  <a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#">DATA</a></li>
                <li style={{width:'24%',textAlign:'center'}}><a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#product/features">FEATURES</a></li>
                <li style={{width:'24%',textAlign:'center',display:'none'}}>
                  <a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#">INTEGRATIONS</a></li>
                <li style={{width:'24%',textAlign:'center'}}><a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}}href="#pricing">PRICING</a></li>
                <li  style={{width:'24%',textAlign:'center'}}><a className="landing-page-nav-tab lp-bottom-nav" style={{display:'block'}} href="#services">SERVICES</a></li>
              </ul>
        </nav>

        <div className="row" style={{margin:0}}>
        <div className="gradient-4" ></div>
        <div className="the-background-image"></div>
        <div className="col-md-12 col-sm-12" style={{paddingTop:'80px'}} id="">
          <div style={{display:'none'}}>
          <h1 style={{color:'#1ca3fd',fontWeight:'100',color:'white',textAlign:'center',fontSize:'38px',fontFamily:'Open Sans',fontSize:'40px'}}> 
            Generate High Quality Prospect Lists 
          </h1>
          <h1 style={{color:'#1ca3fd',fontWeight:'100',textAlign:'center',color:'white',fontSize:'46px',fontFamily:'Open Sans', fontStyle:'italic'}}>  
            Find New Customers Faster
          </h1>
          </div>
          <a href="#signup" className="btn-lg btn-success btn start-trial" >Start Your Free Trial Today</a>

          <div className="panel panel-default" style={{display:'none'}}>
          <div className="panel-heading">&nbsp;</div>
            <div className="panel-body">
              <form onSubmit={this.login}>
              <input placeholder="Email" id="email" type="text" className="form-control input-lg" style={{fontWeight:'100',fontSize:'22px'}}/>
              <br/>
              <input placeholder="Password" type="password" id="password" className="form-control input-lg" style={{fontWeight:'100',fontSize:'22px'}} />
              <br/>

              <a href="javascript:" onClick={this.login} className="btn btn-success btn-lg" style={{display:'block',backgroundColor:'#1ca3fd'}}>Log In</a>
              </form>
            </div>
          <div className="panel-footer">&nbsp;</div>
        <div className="the-gradient-1"></div>
          </div>
        </div>
      </div>

        <div className="container product-header chrome-bar" 
             style={{height:100,paddingTop:45, marginTop:113, display:'none'}}>
             <div className="col-md-4" style={{textAlign:'center',fontFamily:'proxima-nova', fontSize:12}}><i className="fa fa-line-chart"/>&nbsp;GROW PIPELINE FAST</div>
          <div className="col-md-4" style={{textAlign:'center',fontFamily:'proxima-nova', fontSize:12}}><i className="fa fa-search"/>&nbsp;IDENTIFY HIGH-VALUE PROSPECTS</div>
          <div className="col-md-4" style={{textAlign:'center',fontFamily:'proxima-nova', fontSize:12}}><i className="fa fa-coffee"/>&nbsp;CONNECT WITH DECISION MAKERS  </div>
        </div>



      <div style={{borderBottom: '1px solid #edeeef', borderTop: '1px solid #edeeef', 
                   paddingTop:50, backgroundColor:'#f5f8fa', display:'none'}}>
        <div className="container">
          <div className="row" style={{height:200, textAlign:'center'}}>
            <h2>Give Customero a try. Free 14-day trial available for all plans.</h2>
            <br/>
            <a href="#signup" className="btn btn-success btn-lg start-trial" style={{marginTop:10}}> 
              START A NO-RISK FREE TRIAL &nbsp;<i className="fa fa-chevron-right" style={{fontSize:18}}/>
            </a>
          </div>
        </div>
      </div>

      <div class="tmp-footer"></div>

      </div>
    );
  }
});
