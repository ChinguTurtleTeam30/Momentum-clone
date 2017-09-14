import React, { Component } from 'react';
import './art.css';

export default class Art extends Component {

	constructor(props) {
		super(props);
		this.state = {
      img: null,
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

	//takes an object w/ props .url, .clientID, and .key
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

	//takes an object w/ props .url and .token
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
    let now = new Date(),
		    artExpiry = new Date(window.localStorage.getItem('artExpiry')),
        tokenExpiry = window.localStorage.getItem('artsyTokenExpiry') &&
          new Date(window.localStorage.getItem('artsyTokenExpiry')) > now ?
					new Date(window.localStorage.getItem('artsyTokenExpiry')) : null;

    // if art is in localStorage and it's fresh, load it up
    if (window.localStorage['bgImg'] && artExpiry > now) {
      return this.setState({ img: window.localStorage.getItem('bgImg') });
    }
    // if access token is fresh, get new art
    else if (tokenExpiry > now) {
      this.getNewArt(this.artsyStaticData.artReq, (data) => {
				const newArt = data._links.image.href.replace('{image_version}','large'),
					artistsName = data.slug.match(/(\w+)(?:-\w+)/),
					artData = {
						artist: artistsName,
						title: data.title,
						date: data.date,
						collection: data.image_rights,
						medium: data.medium
					};
				console.log(data, '\n', artData);
				// if artExpiry is expired, set a new one in localStorage
				artExpiry = new Date(window.localStorage.getItem('artExpiry')) < now ?
					new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 1) :
					new Date(window.localStorage.get('artExpiry'));
				this.props.store({ artExpiry: artExpiry,
													bgImg: newArt,
													artData: JSON.stringify(artData)
													});
        return (
          this.setState({
            img: data._links.image.href.replace('{image_version}','large')
          })
        );
      });
    }
    // if token is expired and art is expired or absent, get new token and art
		else {
	    this.getNewArt({
        token: this.getNewToken(this.artsyStaticData.tokenReq, (data) => {
          this.props.store({ artsyToken: data.token, artsyTokenExpiry: data.expires_at });
          return data.token;
        }),
        url: this.artsyStaticData.artReq.url
        }, (data) => {
          const newArt = data._links.image.href.replace('{image_version}','large'),
								artistsName = data.slug.match(/(\w+)(?:-\w+)/),
								artData = {
									artist: artistsName,
									title: data.title,
									date: data.date,
									collection: data.image_rights,
									medium: data.medium
								};
					console.log(data, '\n', artData);
					// if artExpiry is expired, set a new one in localStorage
					artExpiry = new Date(window.localStorage.getItem('artExpiry')) < now ?
						new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 1) :
						new Date(window.localStorage.get('artExpiry'));
          this.props.store({ artExpiry: artExpiry,
														bgImg: newArt,
														artData: JSON.stringify(artData)
													});
          return (
            this.setState({
              img: newArt,
							artData: artData
            })
          );
        }
      );
    }
	}

	renderArtData() {
		const artData = this.state.artData;
		let dataArr = ['artist', 'title', 'medium', 'date', 'collection'];
		for (let key in artData) {
			dataArr = dataArr.map(function(el) {
				return (
					key === el ?
						<li>{ artData[key] }</li> :
						el
				);
			});
		}
	}

	render() {
		if (this.state.img) {
			var background = 'url("' + this.state.img + '")';
			//document.getElementById("root").style.backgroundImage = background;
			return (
				<div id="art" className="artBG" style={{ backgroundImage: background }}>
					<ul id="byline" className="byline bottom left corner"></ul>
				</div>
			);
		}
		else return <div>Getting art...</div>;
	}
};
