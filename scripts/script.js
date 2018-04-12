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
			createUTCDate(2018, 3, 26, 13), 
			createUTCDate(2018, 3, 28, 7));
	addEventTimer(
			"Assault",
			"assault", 
			createUTCDate(2018, 3, 28, 8), 
			createUTCDate(2018, 3, 30, 7));
	addEventTimer(
			"Strike",
			"strike", 
			createUTCDate(2018, 3, 30, 8), 
			createUTCDate(2018, 4, 1, 7));
	addEventTimer(
			"Ambush",
			"ambush", 
			createUTCDate(2018, 4, 1, 8), 
			createUTCDate(2018, 4, 3, 7));
	addEventTimer(
			"Blackout",
			"blackout", 
			createUTCDate(2018, 1, 1, 1), 
			createUTCDate(2018, 1, 1, 1));
	addTimer(
			"Patch 1.8.1 Maintenance", 
			"patch", 
			createUTCDate(2018, 4, 12, 7, 30),
			createUTCDate(2018, 4, 12, 10, 30));
	addTimer(
			"E3 - Division 2 Reveal", 
			"e3", 
			createUTCDate(2018, 6, 12, 18));
	deployTimers();
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

