const qryObj = {
  apiSrc: 'http://api.openweathermap.org/data/2.5/',
  qryType: 'weather',
  apiKey: 'APPID=79aef489883f75aff91f8900796eb1ea',
}
const weatherEl = document.querySelector('.weather');
const tempEl = weatherEl.querySelector('.temperature');
const locEl = weatherEl.querySelector('.location');
//const latlon = getLoc(returnLoc);

getWeather(
  qryObj,
  function(obj) {
    const qryPcs = obj;
    qryPcs.urlStr = qryPcs.apiSrc + qryPcs.qryType + '?';
    if ('geolocation' in navigator) {
      qryPcs.loc = navigator.geolocation.getCurrentPosition(
        function(pos) {
          return (
            'lat=' + pos.coords.latitude.toFixed(0) +
            '&lon=' + pos.coords.longitude.toFixed(0) + '&'
          );
        },
        function(err) {
          return console.error(err);
        }
      );
      qryPcs.urlStr = qryPcs.loc ?
      qryPcs.urlStr + qryPcs.loc + qryPcs.apiKey :
      qryPcs.loc;
      console.log(qryPcs);
      return qryPcs;
    }
    else return console.error(Error('geolocation unavailable'));
  }
);

function getWeather(obj, callback) {
  /*const hdr = new Headers({ 'accept' : 'application/JSON', });
  const init = { method: 'GET',
                 headers: hdr,
               };*/
  fetch(callback(obj))
  .then(function(res) {
      return console.log(res);
  });
}

function getLoc(func) {
  if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
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
  else return;
}
