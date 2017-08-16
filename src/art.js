import React, { Component } from 'react';

// TODO: use access token to get new art and set as imageURL
function getNewArt() {
	var myImage
	fetch('https://i.imgur.com/A2osoec.jpg').then(function(response) {
		return response.blob();
	}).then(function(response) {
		var objectURL = URL.createObjectURL(response);
		console.log(objectURL);
		myImage = objectURL;
	});
	return myImage;
}

function ArtDiv(props) {
	if (props.imgUrl === "1") {
		let currentArt = getNewArt();
		return <div id="art" className="art overlay" style={{backgroundImage: 'url('+ currentArt + ')'}} />
	}
}

class Art extends Component {
  render() {
    return (
      <ArtDiv imgUrl="1" />
    )
  }
}

export { Art };