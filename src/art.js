import React, { Component } from 'react';
import './art.css';

export default class Art extends Component {

	constructor(props) {
		super(props);
		this.state = {
			artData: JSON.parse(window.localStorage.getItem('artData')) ||
				{
					artist: '',
					title: '',
					medium: '',
					date: '',
					collection: ''
				}
    };
	}

  artsyQryData = {
    tokenReq: {
      clientID: '7c49150d5697e33be871',
      // key: process.env.REACT_APP_CLIENTSECRET || '204d8604bbc71c2038192655565f01f8',
      url: 'https://token-machine.glitch.me/artsy-token'
    },
    artReq: {
      url: 'https://api.artsy.net/api/artworks?&sample=1',
      token: window.localStorage.getItem('artsyToken') || null,
    }
  }

	//takes an object w/ props .url and .clientID
  getNewToken(reqObj, callback) {
    const options = {
      method: 'GET'
		};
		
		// if artsyTokenExpiration < date.now 
		// fetch token-server.glitch
		// then response set token variable
		// localStorage.setItem('artsyToken', artsyToken);
		// else continue do nothing, artsyToken is correct :)

		// Get artsy access token and set in localStorage for next pageload

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

	getArtist(reqObj, callback) {
		const options = {
			method: 'GET',
			headers: {
				'X-Xapp-Token': reqObj.token,
				Accept: 'application/vnd.artsy-v2+json'
			}
		};

		fetch(reqObj.url, options)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			return callback(data);
		});
	}

	handleNewArt(data, time) {
		//console.log('res Object', data);
		const newArt = data._links.image.href.replace('{image_version}','large'),
					//titleSlug = data.title.match(/\w+/g).join('-').toLowerCase(),
					//artistSlug = data.slug.slice(0, data.slug.indexOf(titleSlug) - 1),
					artData = {
						/*artist: artistSlug.split('-').map((el) => {
							const word = el.split('');
							word[0] = word[0].toUpperCase();
							return word.join('');
						}).join(' '),*/
						title: data.title,
						date: data.date,
						collection: data.image_rights,
						medium: data.medium,
					},
					timestamp = new Date(
						time.getFullYear(), time.getMonth(), time.getDate() + 1, 0, 1
					);

		return this.setState((prevState) => {
			const prevArtData = prevState.artData,
						newArtData = Object.assign(prevArtData, artData),
						storeThis = {
							bgImg: newArt,
							artData: newArtData,
							artExpiry: timestamp
						};
			this.props.store(Object.assign({}, storeThis,
				{ artData: JSON.stringify(newArtData) }));
			return storeThis;
		});
	}

	renderArtData() {
		const artDataObj = this.state.artData,
					dataFields = ['artist', 'title', 'medium', 'date', 'collection'];
		let artDataDisplay = Array(5).fill(null);

		for (let key in artDataObj) {
			if (dataFields.includes(key)) {
				artDataDisplay[dataFields.indexOf(key)] =
					<li className={ key } key={ "artData-" + dataFields.indexOf(key) }>
						{ artDataObj[key] }
					</li>
			}
		}
		return artDataDisplay;
	}

	componentDidMount() {
    let now = new Date(),
		    artExpiry = new Date(window.localStorage.getItem('artExpiry')),
        tokenExpiry = window.localStorage.getItem('artsyTokenExpiry') &&
          new Date(window.localStorage.getItem('artsyTokenExpiry')) > now ?
					new Date(window.localStorage.getItem('artsyTokenExpiry')) : null;

    // if art is in localStorage and it's fresh, load it up
    if (window.localStorage['bgImg'] && artExpiry > now) {
      return this.setState({
				bgImg: window.localStorage.getItem('bgImg'),
				artData: JSON.parse(window.localStorage.getItem('artData'))
			});
    }
    // if access token is fresh, get new art
    else if (tokenExpiry > now) {
      this.getNewArt(this.artsyQryData.artReq, (data) => {
				this.getArtist({
					url: data._links.artists.href,
					token: this.artsyQryData.artReq.token
				}, (res) => {
					//console.log(res);
					this.setState((prevState) => {
						const prevArtData = prevState.artData,
									newArtData = Object.assign(prevArtData,
										{ artist: res._embedded.artists["0"].name });

						this.props.store({ artData: JSON.stringify(newArtData) });
						return { artData: newArtData };
					})
				});
				return this.handleNewArt(data, now);
			});
    }
    // if token is expired and art is expired or absent, get new token and art
		else {
	    this.getNewArt({
        token: this.getNewToken(this.artsyQryData.tokenReq, (data) => {
          this.props.store({ artsyToken: data.token, artsyTokenExpiry: data.expires_at });
          return data.token;
        }),
        url: this.artsyQryData.artReq.url
			}, (data) => this.handleNewArt(data, now)
      );
    }
	}

	render() {
		if (this.state.bgImg) {
			var background = 'url("' + this.state.bgImg + '")';
			//document.getElementById("root").style.backgroundImage = background;
			return (
				<div id="art" className="artBG" style={{ backgroundImage: background }}>
					<aside className="bannerBG">
						<ul id="byline" className="byline bottom left corner">
							{ this.renderArtData() }
						</ul>
					</aside>
				</div>
			);
		}
		else return <div>Getting art...</div>;
	}
};
