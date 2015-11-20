var YoutubeRow = React.createClass({
  render: function() {
    return (
      <tr>
        <td style={{paddingRight:20,paddingTop:15}}>
          <a href="#" className="thumbnail" style={{width:50,padding:0}}>
            <img src={this.props.row.profile_pic} style={{height:50,width:50}}/>
          </a> 
        </td>
          <td style={{width:"25%"}}>{this.props.row.description}</td>
          <td style={{width:"25%"}}>
            <a href={this.props.row.profile_url}>
              {this.props.row.profile_url}</a>
          </td>
          <td style={{width:"25%"}}>{this.props.row.followers}</td>
          <td style={{width:"25%"}}>{this.props.row.following}</td>
          <td style={{width:"25%"}}>
            <a href="#" ><i className="fa fa-external-link-square" /></a>
          </td>
      </tr>
    )
  }
})

module.exports = YoutubeRow
