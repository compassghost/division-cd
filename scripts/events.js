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

function createEventTimer(itemName, timerId, startDay, endDay) {
	if(startDay.getTime() > new Date().getTime()) {
		createTimer(timerId, startDay, itemName + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;begins in");
	}
	else if(endDay.getTime() > new Date().getTime()) {
		createTimer(timerId, endDay, itemName + " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ends in ");
	}
	else {
	}


}