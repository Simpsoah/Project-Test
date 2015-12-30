//Head loads scripts in parellel, but executes them in order.
var visualizations = {};
var visualizationFunctions = {};
var Events = {};
var Configs = {};
function AJAX_JSON_Req(url) {
	var AJAX_req = new XMLHttpRequest();
	AJAX_req.open("GET", url, true);
	AJAX_req.setRequestHeader("Content-type", "application/json");

	AJAX_req.onreadystatechange = function() {
		if (AJAX_req.readyState == 4 &&	AJAX_req.status == 200) {
			var response = JSON.parse(AJAX_req.responseText);
			var loadedScripts = [];
			response.forEach(function(d, i) {
				if (d.filename != 'visincludes.json' && 
					d.filename != 'includes.json' && 
					d.filename != 'App.js' && 
					d.filename != 'angular.min.js' && 
					d.filename != 'head.js' && 
					d.filename != 'Init.js' && 
					d.filename != 'jquery-1.11.2.min.js') {
					var temp = {};
					temp[d.filename.replace(/\./, '_')] = d.location;
					loadedScripts.push(temp);
				}
			});
			(function() {
				'use strict';
				head.js(loadedScripts);
			}).call(this);
			//TODO: Last index is null. Whyyyy?
			console.log(loadedScripts);
			head.ready(Object.keys(loadedScripts[loadedScripts.length - 2]), function() {
				angular.element(document).ready(function() {
					head.js('src/App.js');
				});
			});
		}
	}
	AJAX_req.send();
}

AJAX_JSON_Req('src/tmp/includes.json');
