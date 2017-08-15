const qryObj = {
  apiSrc: 'http://api.openweathermap.org/data/2.5/',
  qryType: 'weather',
  apiKey: 'APPID=79aef489883f75aff91f8900796eb1ea',
}
const weatherEl = document.querySelector('.weather');
const tempEl = weatherEl.querySelector('.temperature');
const locEl = weatherEl.querySelector('.location');
//const latlon = getLoc(returnLoc);

buildQry(qryObj, function(qryStr) {
  getLoc(function(err, loc) {
    if (err) {
      if (err.__proto__.constructor === Error) {
        return console.error(err);
      }
      else return console.error(Error(err));
    }
    else {
      const lat = 'lat=' + loc.coords.latitude.toFixed(2);
      const long = 'lon=' + loc.coords.longitude.toFixed(2);
      const urlStr = [qryStr, lat, long].join('&');
      getWeather(urlStr, function(json) {
        const htmlEl = document.querySelector('.weather')
        const temp = ((json.main.temp * 9)/5 - 459.67)
                      .toFixed(0) + '&deg; F';
        return (
          displayIt(htmlEl.firstElementChild, temp),
          displayIt(htmlEl.lastElementChild, json.name)
        );
      });
    }
  })
});

function buildQry(parts, callback) {
  let qryStr = parts.apiSrc + parts.qryType + '?' + parts.apiKey;
  callback(qryStr);
}

function getWeather(obj, callback) {
  /*const hdr = new Headers({ 'accept' : 'application/JSON', });
  const init = { method: 'GET',
                 headers: hdr,
               };*/
  fetch(obj)
  .then(function(res) {
    return res.json();
  })
  .then(function(res) {
    return callback(res);
  });
}

function getLoc(func) {
  if ('geolocation' in navigator) {
    return navigator.geolocation.getCurrentPosition(
      function(pos) {
        return func(null, pos);
      },
      function(error) {
        return func(error);
      }
    );
  }
  else return func("The geolocation property of the client's navigator object is unavailable.");
}

function returnLoc(obj) {
  const lat = obj.coords.latitude.toFixed(0);
  const long = obj.coords.longitude.toFixed(0);
  console.log(lat, ',', long);
  return 'lat=' + lat + '&lon=' + long + '&';
}

function logIt(val) {
  return console.log(val);
}

function displayIt(selector, content) {
  if(content && selector) {
    return selector.innerHTML = content;
  }
  else return console.error(Error('nav.geo.position.coords unavail'));
}
