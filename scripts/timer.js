//Pads value n with chars (default '0') to width
function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function padTime(n) {
	return pad(n, 2);
}

//default 10-padding of nbsp;
var padding = textPad(10);

//creates a string of nbsp; of length count
function textPad(count) {
	var pad = "";
	for(i = 0; i < count; i++) {
		pad += "&nbsp;";
	}
	return pad;
}

//creates an auto-refreshing display for timer, default time is 1000ms
function deployTimer(timer) {
	setInterval(timer, 1000);
}

//Timer function that displays displayText inside a TR timerID counting towards targetDay
function createTimer(displayText, timerId, targetDay) {
  if(displayText=== undefined)  {
	  displayText= "";
  }
  else {
	  displayText+= padding;
  }
  
  if(typeof targetDay === 'function') {
	 targetDay = targetDay(); 
  }

  // Get todays date and time
  var now = new Date().getTime();

  // Find the distance between now an the count down date
  var distance = targetDay.getTime() - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById(timerId).innerHTML = "<td>" + displayText+ padTime(days) + "d " + padTime(hours) + "h "
  + padTime(minutes) + "m " + padTime(seconds) + "s </td>";

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
		target.setSeconds(1);
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
function createUTCDate(year, month, day, hour) {
	var date = new Date();
	date.setUTCFullYear(year);
	date.setUTCMonth(month - 1);
	date.setUTCDate(day);
	date.setUTCHours(hour);
	date.setUTCMinutes(0);
	date.setUTCSeconds(0);
	date.setUTCMilliseconds(0);
	
	return date;
}

//create a timer timerId with name itemName that spans from startDay to endDay, and removes itself once it expires
function createEventTimer(itemName, timerId, startDay, endDay) {
	if(startDay.getTime() > new Date().getTime()) {
		createTimer(itemName + " starts in", timerId, startDay);
	}
	else if(endDay.getTime() > new Date().getTime()) {
		createTimer(itemName + "", timerId, endDay);
	}
	else {
	    document.getElementById(timerId).innerHTML = "";
	    document.getElementById(timerId).display = "none";	
	}
}


function createWatch(timerId) {
  // Get todays date and time
  var now = new Date();

  document.getElementById(timerId).innerHTML = "" + padTime(now.getUTCHours()) + ":"
  + padTime(now.getMinutes()) + ":" + padTime(now.getSeconds());
}