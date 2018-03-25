window.onload = function() {
	deployTimer(
		createTimer.bind(null, 
			"Dailies", 
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
			"Vendors", 
			"vendors", 
			getNextDay.bind(null,6)));
	deployTimer(
		createTimer.bind(null, 
			"Incursions", 
			"incursions", 
			getNextDay.bind(null,6)));
	deployTimer(
		createTimer.bind(null, 
			"Legendaries", 
			"legendaries", 
			getNextDay.bind(null,6)));
	deployTimer(
		createTimer.bind(null, 
			"DZ Weeklies", 
			"dzweeklies", 
			getNextDay.bind(null,0)));
	deployTimer(
		createTimer.bind(null, 
			"DZ Montlhies", 
			"dzmonthlies", 
			getNextMonth.bind(null)));
	deployTimer(
		createTimer.bind(null, 
			"Season Pass Drops", 
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
			createUTCDate(2018, 3, 22, 12), 
			createUTCDate(2018, 3, 26, 8)));
	deployTimer(
		createEventTimer.bind(null, 
			"Ambush",
			"ambush2", 
			createUTCDate(2018, 4, 3, 8), 
			createUTCDate(2018, 4, 5, 7)));
			
	//deployTimer(function() {createWatch("watch")});
};