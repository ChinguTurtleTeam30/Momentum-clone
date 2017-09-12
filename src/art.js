import React, { Component } from 'react';
import './art.css';

export default class Art extends Component {

	constructor(props) {
		super(props);
		this.state = {
      img: null,
      artsyToken: null
    };
	}

  artsyStaticData = {
    tokenReq: {
      clientID: '7c49150d5697e33be871',
      key: process.env.REACT_APP_CLIENTSECRET || '204d8604bbc71c2038192655565f01f8',
      url: 'https://api.artsy.net/api/tokens/xapp_token'
    },
    artReq: {
      url: 'https://api.artsy.net/api/artworks?&sample=1',
      token: window.localStorage.getItem('artsyToken') || null
    }
  }

  getNewToken(reqObj, callback) {
    const options = {
      method: 'POST',
      body: JSON.stringify({
        client_id: reqObj.clientID,
        client_secret: reqObj.key
      })
    };

    fetch(reqObj.url, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return callback(data);
    });
  }

  getNewArt(reqObj, callback) {
    const options = {
      method: 'GET',
      headers: {
        'X-Xapp-Token': reqObj.token,
        Accept: 'application/vnd.artsy-v2+json'
      }
    }

    fetch(reqObj.url, options)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return callback(data);
    });
  }

	componentDidMount() {
    if (window.localStorage['bgImg'] && window.localStorage['artExpiry'] < Date()) {
      this.setState({ img: window.LocalStorage['bgImg'] });
    }
		else {
      // Get artsy access token and set in localStorage for next pageload
      this.getNewToken(this.artsyStaticData.tokenReq, (res) => {
        console.log(res);
      })
      /*fetch(
        this.artsyStaticData.tokenReq.url,
        {
          method: 'POST',
          body: JSON.stringify({
            client_id: this.artsyStaticData.tokenReq.clientID,
            client_secret: this.artsyStaticData.tokenReq.key
          })
        }
      ).then((response) => {
        return console.log(response.json());
      	//return response.json();
      });
      .then((data) => {
        const now = new Date(),
              expiry = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
      	this.setState({ artsyToken: data.token });
      	localStorage.setItem('artsyToken', data.token);
        localStorage.setItem('artsyExpiry', expiry);
        return data.token;
      });*/
    }
			// Get a random artsy image
			/*fetch(resourceUrl, {method: 'GET', headers: {
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
		}*/
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
