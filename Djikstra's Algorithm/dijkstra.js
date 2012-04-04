var dijkstra = {} ;

dijkstra.addEvent = function ( element, event, fn ) {
	if ( element.addEventListener ) {
		element.addEventListener( event, fn, false );
	} else if ( window.event ) {
		element.attachEvent( 'on' + event, fn );
	}
}


