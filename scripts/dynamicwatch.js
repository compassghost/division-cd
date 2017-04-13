window.onload = function() {

	setInterval(function() {createWatch('watch')}, 1000);
	
	(function() {
	document.onmousemove = handleMouseMove;
	function handleMouseMove(event) {
		var dot, eventDoc, doc, body, pageX, pageY;

		event = event || window.event; // IE-ism

		// If pageX/Y aren't available and clientX/Y are,
		// calculate pageX/Y - logic taken from jQuery.
		// (This is to support old IE)
		if (event.pageX == null && event.clientX != null) {
			eventDoc = (event.target && event.target.ownerDocument) || document;
			doc = eventDoc.documentElement;
			body = eventDoc.body;

			event.pageX = event.clientX +
			  (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
			  (doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY +
			  (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
			  (doc && doc.clientTop  || body && body.clientTop  || 0 );
		}
		
		var midX = window.innerWidth/2;
		var midY = window.innerHeight/2;

		var scaleX = (event.pageX - midX) / midX;
		var scaleY = (event.pageY - midY) / midY;
		
		var transX = Math.round(scaleX * 110);
		var transY = Math.round(scaleY * 150);
		var rotY = Math.round(scaleX * 30);
		var rotX = Math.round(scaleY * 40);
		
		transX = 'translateX(' + transX + 'px)';
		transY = 'translateY(' + transY + 'px)';
		rotX = 'rotateX(' + rotX + 'deg)';
		rotY = 'rotateY(' + rotY + 'deg)';
		
		console.log(rotY);
		
		document.getElementById('inner_header').style.transform = transY;
		document.getElementById('watch').style.transform = transX;
		document.getElementById('outer_header').style.transform = rotY;
		document.getElementById('header').style.transform = rotX;
	}
	})();
};