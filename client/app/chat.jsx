var Chat = React.createClass({
  componentDidMount: function() {
    //(function(d,s){var js,cjs=d.getElementsByTagName(s)[0];js=d.createElement(s); js.src='//chat.center/javascripts/widget.js'; cjs.parentNode.insertBefore(js,cjs);}(document,'script'));
    $(".js-change-state").click()
  },
  render: function() {
    return (
      <div>
      <iframe src="https://chat.center/influenceriq" style={{height:"400px"}}/>
    </div>

    )
  }
})

module.exports = Chat
