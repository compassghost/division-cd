window.onload = function() {
	addTimer(
			"Daily Assignments", 
			"dailies", 
			getNextUTC.bind(null,));
	addTimer(
			"Weekly Assignments", 
			"weeklies", 
			getNextDay.bind(null,2));
	addTimer(
			"Weekly HVTs", 
			"hvts", 
			getNextDay.bind(null,5));
	addTimer(
			"Vendor Restock", 
			"vendors", 
			getNextDay.bind(null,6));
	addTimer(
			"Incursions and Legendary Missions", 
			"incursions", 
			getNextDay.bind(null,6));
	addTimer(
			"DZ Weekly Missions", 
			"dzweeklies", 
			getNextDay.bind(null,0));
	addTimer(
			"DZ Monthly Missions", 
			"dzmonthlies", 
			getNextMonth.bind(null));
	addTimer(
			"Season Pass Supply Drop", 
			"supplydrops", 
			getNextSupply.bind(null));

	addEventTimer(
			"Outbreak",
			"outbreak", 
			createUTCDate(2018, 6, 25, 8),
			createUTCDate(2018, 6, 31, 7),
			customEventTimerBehavior);
	addEventTimer(
			"Assault",
			"assault", 
			createUTCDate(2018, 7, 30, 8),
			createUTCDate(2018, 8, 6, 8),
			customEventTimerBehavior);/*
	addEventTimer(
			"Strike",
			"strike", 
			createUTCDate(2018, 8, 14, 8),
			createUTCDate(2018, 8, 1, 7),
			customEventTimerBehaviorEstimate);
	addEventTimer(
			"Ambush",
			"ambush", 
			createUTCDate(2018, 9, 11, 8),
			createUTCDate(2018, 9, 1, 7),
			customEventTimerBehaviorEstimate);*/
	addEventTimer(
			"Blackout",
			"blackout", 
			createUTCDate(2018, 4, 26, 8),
			createUTCDate(2018, 5, 7, 8),
			customEventTimerBehavior);
	addEventTimer(
			"Onslaught",
			"onslaught", 
			createUTCDate(2018, 5, 21, 8),
			createUTCDate(2018, 5, 28, 7),
			customEventTimerBehavior);
	addEventTimer(
			"2x Prof Caches", 
			"cache", 
			createUTCDate(2018, 7, 6, 8),
			createUTCDate(2018, 7, 9, 8, 0));
	addTimer(
			"Division 2 Release", 
			"release", 
			createUTCDate(2019, 3, 15, 0));
	deployTimers();
	
	wireTrigger(playNotificationSound);

};


var muted = true;
function toggleAudio() {
	var player = document.getElementById('player');
	var button = document.getElementById('mute');
	if(muted) {
		player.muted = false;
		button.innerHTML = "Disable ISAC Notifications";
		muted = false;
		boot.play();
	}
	else {
		boot.pause();
		boot.currentTime = 0;
		player.muted = true;
		button.innerHTML = "Enable ISAC Notifications";
		muted = true;
	}
}

var boot = new Audio("audio/boot.mp3");
boot.volume = 0.5;


function playNotificationSound() {
	var audio = document.getElementById("player");
	audio.volume = 0.75;
    audio.play();
}


function customEventTimerBehavior(itemName, timerId, startDay, endDay) {
	if(startDay.getTime() > new Date().getTime()) {
		createTimer(itemName, timerId, startDay, "", " activated");
	}
	else if(endDay.getTime() > new Date().getTime()) {
		createTimer(itemName, timerId, endDay, " is Active ", " is offline ");
	    document.getElementById(timerId).classList.add('glow');
	}
	else {
	    document.getElementById(timerId).innerHTML = itemName + " is Offline";
	    document.getElementById(timerId).setAttribute("text", itemName + " is Offline");
	    document.getElementById(timerId).classList.remove('glow');
	    document.getElementById(timerId).classList.add('rogue');
		clearInterval(deployedTimers[keys[timerId]]);
	}	
}

function customEventTimerBehaviorEstimate(itemName, timerId, startDay, endDay) {
	if(startDay.getTime() > new Date().getTime()) {
		createTimer(itemName, timerId, startDay, " Estimate ", " activated");
	}
	else if(endDay.getTime() > new Date().getTime()) {
		createTimer(itemName, timerId, endDay, " is Active ", " is offline ");
	    document.getElementById(timerId).classList.add('glow');
	}
	else {
	    document.getElementById(timerId).innerHTML = itemName + " is Offline";
	    document.getElementById(timerId).setAttribute("text", itemName + " is Offline");
	    document.getElementById(timerId).classList.remove('glow');
	    document.getElementById(timerId).classList.add('rogue');
		clearInterval(deployedTimers[keys[timerId]]);
	}	
}
