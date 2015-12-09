var LandingPage = React.createClass({
  home: function() {
    location.href="/#landing"
  },

  signUp: function() {
    data = {}
    $.ajax({
      url:location.origin+ "/signup",
      data: {},
      dataType:"json",
      success: function(res) {
        console.log(res)
        location.currentUser(res.token)
      },
      error: function(err) {
        console.log(err)
      }
    })
  },

  componentDidMount: function() {
    $('.form-control').floatlabel({
      labelClass:"floatingLabel",
      labelEndTop :"5px"
    });
  },

  render: function() {
    return (
      <div style={{height:"100%",color:"white",fontFamily:"proxima-nova",overflow:"hidden"}} >
        <div className="bg-gradient" style={{height:"100%",position:"relative",zIndex:20}}>
          <video src="images/D18_9_310_preview.mp4" style={{position:"absolute",width:"100%",top:0,left:0,zIndex:1,opacity:0.1}}
                loop={true} autoPlay={true}/>
        <div className="container" style={{position:"relative",zIndex:30,paddingTop:50}}>

        <h4 style={{fontWeight:800,fontSize:22,cursor:"pointer"}}
          onClick={this.home}>
          <img src="images/infiq_white.png" style={{float:"left",height:25,marginRight:0}}/>&nbsp;
          InfluencerIQ</h4>

        <span style={{float:"right",marginTop:-32,marginRight:200}}>
        <a href="#pricing" className="" style={{marginTop:-32,marginRight:30,fontWeight:600,fontSize:12,color:"#fff"}}>CREATORS</a>
        <a href="#pricing" className="" style={{marginTop:-32,marginRight:30,fontWeight:600,fontSize:12,color:"#fff"}}>BRANDS</a>
        <a href="#pricing" className="" style={{marginTop:-32,marginRight:30,fontWeight:600,fontSize:12,color:"#fff"}}>ABOUT US</a>
        <a href="#pricing" className="" style={{marginTop:-32,marginRight:30,fontWeight:600,fontSize:12,color:"#fff"}}>PRICING</a>
        </span>

        <a href="#login" className="btn btn-primary" style={{float:"right",marginTop:-40}}>LOG IN</a>
        <div className="row" style={{marginTop:40}}>
        <div className="col-md-6" >
          <h1>Join The Leading Marketplace For Social Media Creators</h1>
          <br/>
          <hr/>
          <br/>
          <h2 style={{marginTop:20,fontWeight:100}}>GAIN ACCESS TO EXCLUSIVE <br/>
            <br/>
            <span style={{fontStyle:"italic"}}>
              <span>BRAND PARTNERSHIPS, </span><br/>
              <span>BRAND BOOKINGS, &</span> <br/>
              <span>PRODUCT PLACEMENTS</span>
          </span></h2>
          <span style={{display:"none"}}>
            <input type="text" className="form-control input-lg" style={{marginTop:30,width:300,borderRadius:2,fontSize:16}} placeholder="EMAIL"/>
            <input type="text" className="form-control input-lg" style={{marginTop:10,width:300,borderRadius:2,fontSize:16}} placeholder="PASSWORD" type="password"/>
            <input type="text" className="form-control input-lg" style={{marginTop:10,width:300,borderRadius:2,fontSize:16}} placeholder="CONFIRM PASSWORD" type="password"/>
            <a className="btn btn-lg btn-success" style={{marginTop:10,width:150,fontSize:16}}>SIGN UP</a>
          </span>
        </div>

        <div className="col-md-6" style={{textAlign:"center"}}>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <img src="images/signaliq.png" style={{display:"none",height:450,float:"left",marginLeft:100,marginTop:20}}/>
          <a href="javascript:" className="big-btn btn-lg btn btn-primary">I'M A CREATOR&nbsp; <i className="fa fa-arrow-right" style={{float:"right"}}/></a>
          <br/>
          <br/>
          <a href="javascript:"className="btn-lg btn btn-primary big-btn" >I'M A BRAND &nbsp; <i className="fa fa-arrow-right"  style={{float:"right"}}/></a>
        </div>
        </div>
      </div>
      </div>
      </div>
    )
  }
})


module.exports = LandingPage
