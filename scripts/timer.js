//Pads value n with chars (default '0') to width
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function padTime(n) {
	return pad(n, 2);
}

var keys = new Object();
var timers = [];
var deployedTimers = [];

function addTimer(displayText, timerId, startDay, endDay) {
	if(endDay) {
		addEventTimer(displayText, timerId, startDay, endDay);
	}
	else {
		var timer = createTimer.bind(null, displayText, timerId, startDay);
		keys[timerId]=timers.length;
		timers.push(timer);
	}
}

function addEventTimer(displayText, timerId, startDay, endDay, behavior) {
	var timer = createEventTimer.bind(null, 
			displayText, 
			timerId, 
			startDay,
			endDay,
			behavior);
	keys[timerId]=timers.length;
	timers.push(timer);
}

function deployTimers() {
	for(var i = 0; i < timers.length; i++) {
		deployTimer(timers[i], 1000);
	}
}
//creates an auto-refreshing display for timer, default time is 1000ms
function deployTimer(timer , offset) {
	deployedTimers.push(setInterval(timer, offset));
}

var lastCall = 0;

function notifyMe(func) {
	var now = new Date().getTime();
	if(now - lastCall < 200) {
		setTimeout(notifyMe.bind(window, func), 200);
	}
	else {
		func();
		lastCall = now;
	}
}

function sendNotification(displayText, notificationText) {
  if (!("Notification" in window)) {

  }

  else if (Notification.permission === "granted") {
    Notification.requestPermission()
	if(!notificationText) {
		notificationText = " reset.";
	}
	playNotificationSound();
    var notification = new Notification(displayText + notificationText);
  }
  else if (Notification.permission === "denied") {
	Notification.requestPermission();
  }
  // Finally, if the user has denied notifications and you 
  // want to be respectful there is no need to bother them any more.
}

//Timer function that displays displayText inside a TR timerID counting towards targetDay
function createTimer(displayText, timerId, targetDay, suffix, noteSuffix) {
  var notText = displayText;
  if(displayText=== undefined)  {
	  displayText= "";
  }
  
  if(suffix) {
	 displayText += suffix; 
  }
  
  if(typeof targetDay === 'function') {
	 targetDay = targetDay(); 
  }

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = targetDay.getTime() - now;
  if(distance < 0) {
	distance = 0;
  }
 
  //alert function
  if(distance > 0 && distance <= 1000) {
	  notifyMe(sendNotification.bind(null, notText, noteSuffix));
  }

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  var timeText = getFormattedTimer(days, hours, minutes, seconds)
  
  var thisTimer = document.getElementById(timerId);
  
  thisTimer.innerHTML = "<div>" + displayText + "</div><div><span class='normal'>" + timeText + "</span><span class='mouseover'>" + formatDate(targetDay) + "</span></div>";

}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes ;
  
  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hours +':' + minutes;
}

function getFormattedTimer(days, hours, minutes, seconds) {
	return + padTime(days) + "d " + padTime(hours) + "h "
  + padTime(minutes) + "m " + padTime(seconds) + "s";
}

//gets next UTC
function getNextUTC() {
	var target = new Date();
		
	target.setUTCHours(0);
	target.setMinutes(0);
	target.setSeconds(1);
	target.setMilliseconds(0);

	if(new Date() > target) {
		target.setUTCDate(target.getUTCDate() + 1)
	}
	return target;
}

//gets next UTC month
function getNextMonth() {
	var target = new Date();
	
	target.setUTCDate(1)
	target.setUTCHours(0);
	target.setMinutes(0);
	target.setSeconds(1);
	target.setMilliseconds(0);
	target.setUTCMonth(target.getUTCMonth() + 1);
	return target;
}

//gets next supply date, either first of 
function getNextSupply() {
	var target = new Date();
	//this month
	if(target.getUTCDate() < 15) {
		target.setUTCDate(15)
		target.setUTCHours(0);
		target.setMinutes(0);
		target.setSeconds(0);
		target.setMilliseconds(0);
	}
	//next month
	else {
		return getNextMonth();
	}
	return target;
}

//gets next day by week (0-6, UTC standard)
function getNextDay(dayOfWeek) {
	var target = getNextUTC();
	
	while(target.getUTCDay() != dayOfWeek) {
		target.setUTCDate(target.getUTCDate() + 1)		
	}
	return target;	
}

//create a UTC date using YMDH
function createUTCDate(year, month, day, hour, minutes, seconds) {
	var date = new Date();
	date.setUTCFullYear(year);
	date.setUTCDate(1);
	date.setUTCMonth(month - 1);
	date.setUTCDate(day);
	date.setUTCHours(hour ? hour : 0);
	date.setUTCMinutes(minutes ? minutes : 0);
	date.setUTCSeconds(seconds ? seconds: 0);
	date.setUTCMilliseconds(0);
	
	return date;
}

//create a timer timerId with name itemName that spans from startDay to endDay, and removes itself once it expires
function createEventTimer(itemName, timerId, startDay, endDay, behavior) {
	if(!behavior) {
		defaultEventTimerBehavior(itemName, timerId, startDay, endDay);
	}
	else {
		behavior(itemName, timerId, startDay, endDay);
	}
}

function defaultEventTimerBehavior(itemName, timerId, startDay, endDay) {
	if(startDay.getTime() > new Date().getTime()) {
		createTimer(itemName, timerId, startDay, " starting in", " has started");
	}
	else if(endDay.getTime() > new Date().getTime()) {
		createTimer(itemName, timerId, endDay, " has started", " has ended");
	}
	else {
	    document.getElementById(timerId).outerHTML="";
		clearInterval(deployedTimers[keys[timerId]]);
	}
}

function createWatch(timerId) {
  // Get todays date and time
  var now = new Date();

  document.getElementById(timerId).innerHTML = "" + padTime(now.getUTCHours()) + ":"
  + padTime(now.getMinutes()) + ":" + padTime(now.getSeconds());
}