import React, { Component } from 'react';

let request = require('superagent');
let imageUrl = 'https://thewalters.org/assets/img/products/CL4767.jpg?ver=2'

// TODO: use access token to get new art and set as imageURL
function getNewArt() {

	var clientID = '7c49150d5697e33be871',
	clientSecret = '204d8604bbc71c2038192655565f01f8',
	apiUrl = 'https://api.artsy.net/api/tokens/xapp_token',
	xappToken;

	request
	  .post(apiUrl)
	  .send({ client_id: clientID, client_secret: clientSecret })
	  .end(function(res) {
	    xappToken = res.body.token;
	  });
}

class Art extends Component {
  render() {
    return (
      <div className="art-container">
        <div className="art overlay" style={{backgroundImage: 'url('+ imageUrl + ')'}} />
      </div>
    )
  }
}

export { Art };