/**
 * @author Lindi
 */
(function(){
    var cache = {};
    this.tmpl = function tmpl(str, data){
        // Figure out if we're getting a template, or if we need to
        // load the template - and be sure to cache the result.
		
		//	The \W symbol means non-whitespace character
		//	So, if there are no non-whitespace characters in the string
		//	then we cache str if it's not the empty string (why cache a string
		//	with no non-whitespace characters?) or we assume that str is the
		//	name of a dom node, and we pass the node's innerHTML to this function
        var fn = !/\W/.test(str) ? cache[str] = cache[str] ||
        tmpl(document.getElementById(str).innerHTML) :        
		
		
		//	 ... otherwise
		
		//	We create this function template
		
		// Generate a reusable function that will serve as a template
        // generator (and which will be cached).
        new Function("obj", 
		"var p=[],print=function(){p.push.apply(p,arguments);};" +
        // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +
        // Convert the template into pure JavaScript
        str.replace(/[\r\t\n]/g, " ")
			.split("<%")
			.join("\t")
			.replace(/((^|%>)[^\t]*)'/g, "$1\r")
			.replace(/\t=(.*?)%>/g, "',$1,'")
			.split("\t").join("');")
			.split("%>")
			.join("p.push('")
			.split("\r")
			.join("\\'") +
        "'); } return p.join('');");
		
        // Provide some basic currying to the user
        return data ? fn(data) : fn;
    };
})();
