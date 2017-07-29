var date = new Date(),
  hrs, mins, time,
  clockEl = document.querySelector('.time');

//fcn to get new hr:min
//and post it to timeEl
//to be fired with setInterval once a minute
function updateClock() {
//what's the best way to get new hr:min?
//define a new Date object every minute?
//or store orig hr:min values and incr them myself each min?
  date = new Date();
  //it would be good if date were private
  hrs = date.getHours() > 12 ? date.getHours() - 12 : date.getHours() !== 0 ? date.getHours() : 12;
  mins = date.getMinutes() >= 10 ? date.getMinutes() : '0' + date.getMinutes();
  time = hrs + ':' + mins;

  clockEl.innerHTML = time;
}

function setTimer(end) {
  //end is going to come as a DOMString like:
  //'2017-07-29T17:00'
  //if I use a "datetime-local" input
  //this will have to be parsed with regex to something Date() can accept
  var [y, mo, d, h, m] = end.match(/^(\d{n})(?:-)(\d{2})(?:-)(\d{2})(?:T)(\d{2})(?::)(\d{2})/).shift(),
  endTime = new Date(y, mo, d, h, m),
  curTime = date;
  sRmn = Math.round((endTime.valueOf() - curTime.valueOf())/1000),
  timeLeft = {};

  function countDown() {
    var totRmn;
    sRmn--;
    totRmn = sRmn;
    timeLeft.s = totRmn%60; //sec left less whole min
    totRmn = (totRmn - timeLeft.s)/60; //whole min left
    timeLeft.m = totRmn%60; //min left less whole hrs
    totRmn = (totRmn - timeLeft.m)/60; //whole hrs left
    timeLeft.h = timeLeft%24; //hrs left less whole days
    timeLeft.d = (totRmn - timeLeft.h)/24; //whole days left
  }

  function updateTimer() {
    countDown();
  }
}

//updateClock();
//window.setInterval(updateClock, 60000);
