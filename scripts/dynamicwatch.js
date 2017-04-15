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
		
		var transX = Math.round(scaleX * 370);
		var transY = Math.round(scaleY * -100);
		var transShadowX = Math.round(transX / 2 * -1);
		var transShadowY = Math.round(transY / 2 * -1);
		var rotY = Math.round(scaleX * 40);
		var rotX = Math.round(scaleY * 20);
		
		transX = 'translateX(' + transX + 'px)';
		transY = 'translateY(' + transY + 'px)';
		var transShadow = 'translate(' + transShadowX + 'px, ' + transShadowY + 'px)';
		console.log(transShadow);
		rotX = 'rotateX(' + rotX + 'deg)';
		rotY = 'rotateY(' + rotY + 'deg)';
				
		document.getElementById('outer_header').style.transform = rotY;
		document.getElementById('header').style.transform = rotX;
		document.getElementById('inner_header').style.transform = transY;
		document.getElementById('shadow').style.transform = transShadow;
		document.getElementById('watch').style.transform = transX;
	}
	})();
};