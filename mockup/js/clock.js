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
  timeLeft = [],
  displayCt = document.querySelector('.countdown'),
  ctStr = [],
  intID = window.setInterval(updateTimer, 1000);

  function countDown() {
    var totRmn;
    sRmn--;
    totRmn = sRmn;
    timeLeft = [];
    timeLeft.push(totRmn%60); //sec left less whole min
    totRmn = (totRmn - timeLeft[0])/60; //whole min left
    timeLeft.push(totRmn%60); //min left less whole hrs
    totRmn = (totRmn - timeLeft[1])/60; //whole hrs left
    timeLeft.push(totRmn%24); //hrs left less whole days
    timeLeft.push((totRmn - timeLeft[2])/24); //whole days left
  }

  function updateTimer() {
    countDown();
    ctStr = [];
    ctStr[0] = unitVal(timeLeft, 0);
    ctStr[1] = unitVal(timeLeft, 1);
    ctStr[2] = unitVal(timeLeft, 2);
    ctStr[3] = unitVal(timeLeft, 3);
    ctStr.reverse();
    if(!ctStr) {
      displayCt.innerHTML = "time's up!";
      window.clearInterval(intID);
    }
    else displayCt.innerHTML = ctStr.join(':');

    function unitVal(arr, i) {
      if(arr[i]) {
        if(arr[i + 1] || arr[i + 2] || arr[i + 3]) {
          return arr[i] < 10 ? '0' + arr[i] : arr[i];
        }
        else return arr[i];
      }
      else if(arr[i + 1]) {
        return '00';
      }
      else return;
    }
  }
}

updateClock();
window.setInterval(updateClock, 60000);
