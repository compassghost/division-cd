window.onload = function() {
	deployTimer(
		createTimer.bind(null, 
			"Daily Assignments", 
			"dailies", 
			getNextUTC.bind(null,)));
	deployTimer(
		createTimer.bind(null, 
			"Weekly Assignments", 
			"weeklies", 
			getNextDay.bind(null,2)));
	deployTimer(
		createTimer.bind(null, 
			"Weekly HVTs", 
			"hvts", 
			getNextDay.bind(null,5)));
	deployTimer(
		createTimer.bind(null, 
			"Vendor Restock", 
			"vendors", 
			getNextDay.bind(null,6)));
	deployTimer(
		createTimer.bind(null, 
			"Incursions and Legendary Missions", 
			"incursions", 
			getNextDay.bind(null,6)));
	deployTimer(
		createTimer.bind(null, 
			"DZ Weekly Missions", 
			"dzweeklies", 
			getNextDay.bind(null,0)));
	deployTimer(
		createTimer.bind(null, 
			"DZ Monthly Missions", 
			"dzmonthlies", 
			getNextMonth.bind(null)));
	deployTimer(
		createTimer.bind(null, 
			"Season Pass Supply Drop", 
			"supplydrops", 
			getNextSupply.bind(null)));

	deployTimer(
		createEventTimer.bind(null, 
			"Outbreak",
			"outbreak", 
			createUTCDate(2018, 3, 26, 13), 
			createUTCDate(2018, 3, 28, 7)));
	deployTimer(
		createEventTimer.bind(null, 
			"Assault",
			"assault", 
			createUTCDate(2018, 3, 28, 8), 
			createUTCDate(2018, 3, 30, 7)));
	deployTimer(
		createEventTimer.bind(null, 
			"Strike",
			"strike", 
			createUTCDate(2018, 3, 30, 8), 
			createUTCDate(2018, 4, 1, 7)));
	deployTimer(
		createEventTimer.bind(null, 
			"Ambush",
			"ambush", 
			createUTCDate(2018, 4, 3, 8), 
			createUTCDate(2018, 4, 5, 7)));
	deployTimer(
		createEventTimer.bind(null, 
			"Blackout",
			"blackout", 
			createUTCDate(2018, 3, 26, 13), 
			createUTCDate(2018, 3, 28, 7)));
	deployTimer(
		createTimer.bind(null, 
			"Patch 1.8.1", 
			"patch", 
			createUTCDate(2018, 4, 12, 7)));
	deployTimer(
		createTimer.bind(null, 
			"E3 - Division 2 Reveal", 
			"e3", 
			createUTCDate(2018, 6, 12, 18)));
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

