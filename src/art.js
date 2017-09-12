import React, { Component } from 'react';
import './art.css';

// Initial variables for API configuration
var clientID = '7c49150d5697e33be871',
    clientSecret = process.env.REACT_APP_CLIENTSECRET || '204d8604bbc71c2038192655565f01f8',
    apiUrl = 'https://api.artsy.net/api/tokens/xapp_token',
    resourceUrl = 'https://api.artsy.net/api/artworks?&sample=1',
    artsyToken = localStorage.getItem('artsyToken') || null,
    appKeys = JSON.stringify({ client_id: clientID, client_secret: clientSecret }),
    artsyRandomArtUrl;

// Get artsy access token and set in localStorage for next pageload
fetch(apiUrl, {method: 'POST', body: appKeys}).then(function(response) {
	return response.json();
}).then(function(data) {
	artsyToken = data.token;
	localStorage.setItem('artsyToken', artsyToken);
});

export default class Art extends Component {

	constructor(props) {
		super(props);
		this.state = { img: null, artsyToken: null };
	}

	componentDidMount() {
		if (artsyToken) {
			// Get a random artsy image
			fetch(resourceUrl, {method: 'GET', headers: {
					'X-Xapp-Token': artsyToken,
					'Accept': 'application/vnd.artsy-v2+json'
				}}).then(function(response) {
					return response.json();
				}).then(function(data) {
					//console.log("WOW arts",data);
					artsyRandomArtUrl = data._links.image.href.replace('{image_version}','large');
					this.setState ( {img: artsyRandomArtUrl, artsyToken: artsyToken} );
				}.bind(this));
		} else {
			// fetch imgur image as a backup
			fetch('https://i.imgur.com/A2osoec.jpg').then(function(response) {
				return response.blob();
			}).then(function(response) {
				var objectURL = URL.createObjectURL(response);
				this.setState( {img: objectURL});
			}.bind(this));
		}
	}

	render() {
		if (this.state.img) {
			var background = 'url("' + this.state.img + '")';
			//document.getElementById("root").style.backgroundImage = background;
			return <div id="art" className="artBG" style={{ backgroundImage: background }} />
		}
		else return <div>Getting art...</div>;
	}
};
