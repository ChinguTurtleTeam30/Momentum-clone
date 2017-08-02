var date = new Date(),
  hrs, mins, time,
  clockEl = document.querySelector('.time'),
  timerForm = document.forms['set-timer'];

timerForm.addEventListener('submit', function(ev) {
  ev.preventDefault();
  setTimer(timerForm['timer-cal'].value);
});

//fcn to get new hr:min
//and post it to timeEl
//to be fired with setInterval once a minute
function updateClock() {
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
  var splitEnd = end.match(/^(\d{4})(?:-)(\d{2})(?:-)(\d{2})(?:T)(\d{2})(?::)(\d{2})/),
  endTime = new Date(splitEnd[1], splitEnd[2] - 1, splitEnd[3], splitEnd[4], splitEnd[5]),
  curTime = date;
  sRmn = Math.round((endTime.valueOf() - curTime.valueOf())/1000),
  timeLeft = {},
  displayCt = document.querySelector('.countdown'),
  ctStr = '',
  intID = window.setInterval(updateTimer, 1000);

  function countDown() {
    var totRmn;
    sRmn--;
    totRmn = sRmn;
    timeLeft.s = totRmn%60; //sec left less whole min
    totRmn = (totRmn - timeLeft.s)/60; //whole min left
    timeLeft.m = totRmn%60; //min left less whole hrs
    totRmn = (totRmn - timeLeft.m)/60; //whole hrs left
    timeLeft.h = totRmn%24; //hrs left less whole days
    timeLeft.d = (totRmn - timeLeft.h)/24; //whole days left
  }

  function updateTimer() {
    countDown();
    ctStr = '';
    ctStr += timeLeft.d ? timeLeft.d + ':' : '';
    ctStr += timeLeft.h ? (timeLeft.d ? (timeLeft.h < 10 ? '0' + timeLeft.h + ':' : timeLeft.h + ':') : timeLeft.h) : timeLeft.d ? '00:' : '';
    ctStr += timeLeft.m ? timeLeft.h ? timeLeft.m < 10 ? '0' + timeLeft.m + ':' : timeLeft.m + ':' : timeLeft.d ? timeLeft.m < 10 ? '0' + timeLeft.m + ':' : timeLeft.m + ':' : timeLeft.h ? '00:' : '';
    ctStr += timeLeft.s ? (timeLeft.m ? (timeLeft.s < 10 ? '0' + timeLeft.s + ':' : timeLeft.s + ':') : timeLeft.s) : timeLeft.m ? '00' : '';
    if(!ctStr) {
      displayCt.innerHTML = "time's up!";
      window.clearInterval(intID);
    }
    else displayCt.innerHTML = ctStr;
  }
}

updateClock();
window.setInterval(updateClock, 60000);
