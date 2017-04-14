function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function createTimer(timerId, targetDay, prefix) {
  if(prefix === undefined)  {
	  prefix = "";
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
  document.getElementById(timerId).innerHTML = prefix + pad(days, 2) + "d " + pad(hours, 2) + "h "
  + pad(minutes, 2) + "m " + pad(seconds, 2) + "s ";

}

function createWatch(timerId) {
  // Get todays date and time
  var now = new Date();

  // Find the distance between now an the count down date

  // Display the result in the element with id="demo"
  document.getElementById(timerId).innerHTML = "" + pad(now.getUTCHours(), 2) + ":"
  + pad(now.getMinutes(), 2) + ":" + pad(now.getSeconds(), 2);
}

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

function getNextDayPremium() {
	var date = getNextDay(5);
	date.setUTCHours(-24+9);
	
	if(date.getTime() < new Date().getTime()) {
		date = getNextDay(4);
		date.setUTCHours(9);
	}
	return date;
}

function getNextDay(dayOfWeek) {
	var target = getNextUTC();
	
	while(target.getUTCDay() != dayOfWeek) {
		target.setUTCDate(target.getUTCDate() + 1)		
	}
	return target;	
}
