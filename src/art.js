import React, { Component } from 'react';

var Art = React.createClass ({
	getInitialState: function() {
		return { img: null };
	},

	componentDidMount: function() {
		fetch('https://i.imgur.com/A2osoec.jpg').then(function(response) {
			return response.blob();
		}).then(function(response) {
			var objectURL = URL.createObjectURL(response);
			console.log(objectURL);
			this.setState( {img: objectURL});
			console.log(objectURL, this.state);
		}.bind(this));
	},

	render: function() {
		if (this.state.img) {
			return <div id="art" className="art overlay" style={{backgroundImage: 'url('+ this.state.img + ')'}} />
		}

		return <div>Getting art...</div>;
	}

});

export { Art };