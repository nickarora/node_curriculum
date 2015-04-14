var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require("querystring");

var commonHeaders = {'Content-Type': 'text/html'};

// Handle HTTP route GET '/' and POST '/' (i.e. Home)
function home(request, response) {
	if (request.url === '/') {
		if (request.method.toLowerCase() === "get") {
			response.writeHead(200, commonHeaders);
			renderer.view("header", {}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();	
		} else {
			// redirect to the user
			request.on("data", function(postBody){
				var query = querystring.parse(postBody.toString());
				response.writeHead(303, {"location": '/' + query.username });
				response.end();
			});
		}
	}
}

// Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
	var username = request.url.replace("/", "");
	
	if (username.length > 0) {
		response.writeHead(200, commonHeaders);
		renderer.view("header", {}, response);

		var studentProfile = new Profile(username);
		studentProfile.on("end", function(profileJSON){
			
			var values = {
				avatarUrl: profileJSON.gravatar_url,
				userName: profileJSON.profile_name,
				badgeCount: profileJSON.badges.length,
				javaScriptPoints: profileJSON.points.JavaScript
			}

			renderer.view("profile", values, response);
	  	renderer.view("footer", {}, response);
	  	response.end();
		});

		studentProfile.on("error", function(error){
			renderer.view("error", { errorMessage: error.message }, response);
			renderer.view("search", {}, response);
	  	renderer.view("footer", {}, response);
	  	response.end();
		});

	}
}

module.exports.home = home;
module.exports.user = user;