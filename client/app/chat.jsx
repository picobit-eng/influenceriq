var Navbar = require("navbar")

var Chat = React.createClass({
  componentDidMount: function() {
    //(function(d,s){var js,cjs=d.getElementsByTagName(s)[0];js=d.createElement(s); js.src='//chat.center/javascripts/widget.js'; cjs.parentNode.insertBefore(js,cjs);}(document,'script'));
    $(".js-change-state").click()
    user_data = {}
    user_data = {
    app_id: "gi5invhc",
    name: "Nikola Tesla", // Full name
    email: "nikola@example.com", // Email address
    created_at: 1312182000, // unix ts
    widget: {
      activator: '#IntercomDefaultWidget'
    }  
  }
    window.Intercom('boot', user_data) 
    window.Intercom('reattach_activator');
    //Intercom('show');
    Intercom('showNewMessage', 'yoyo pre-populated content')
  },

  render: function() {
    return (
      <div>
      <Navbar />
      <iframe src="https://chat.center/influenceriq" style={{height:"400px",display:"none"}}/>
      <div id="IntercomDefaultWidget" />
    </div>

    )
  }
})

module.exports = Chat
