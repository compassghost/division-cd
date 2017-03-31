// Set the date we're counting down to

// Update the count down every 1 second

window.onload = function() {
	setInterval(function() {createTimer("dailies", getNextUTC())}, 1000);
	setInterval(function() {createTimer("weeklies", getNextDay(1))}, 1000);
	setInterval(function() {createTimer("vendors", getNextDay(6))}, 1000);
	setInterval(function() {createTimer("heroics", getNextDay(6))}, 1000);
	setInterval(function() {createTimer("legendaries", getNextDay(6))}, 1000);
	setInterval(function() {createTimer("hvts", getNextDay(2))}, 1000);
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function createTimer(timerId, targetDay) {

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
  document.getElementById(timerId).innerHTML = pad(days, 2) + "d " + pad(hours, 2) + "h "
  + pad(minutes, 2) + "m " + pad(seconds, 2) + "s ";

  // If the count down is finished, write some text
}

function getNextUTC() {
	var target = new Date();
		
	target.setUTCHours(0);
	target.setMinutes(0);
	target.setSeconds(0);
	target.setMilliseconds(0);

	if(new Date() > target) {
		target.setUTCDate(target.getUTCDate() + 1)
	}
	return target;
}

function getNextDay(dayOfWeek) {
	var target = getNextUTC();
	
	while(target.getUTCDay() != dayOfWeek) {
		target.setUTCDate(target.getUTCDate() + 1)		
	}
	return target;	
}