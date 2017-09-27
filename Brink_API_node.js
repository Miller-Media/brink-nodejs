module.exports = function() {
	
	this.api_baseurl = "http://api.joinbrink.com/v1/";
	this.user_id = 0;
	this.access_token = '';
	
	this.is_active_token = function() {
		var token_parts = this.access_token.split(".");
		var token_data = JSON.parse(atob(token_parts[1]));
		var token_time = token_data.exp * 1000;
		var current_time = Date.now();
		if (token_time > current_time) return true;
		else return false;
	}

	this.send = function(args, callback) {
		
		var request_method = 'GET';
		var data = '{}';
		var url = args.url;
		if (args.hasOwnProperty('request_method')) request_method = args.request_method;
		if (args.hasOwnProperty('data')) data = JSON.stringify(args.data);
		
		request({
			method: request_method,
			url: url,
			headers: args.http_header,
			body: data
		},
		function (error, response, body) {
			if (response.statusCode == 200 || response.statusCode == 201) {
				result = body;
			} else {
				result = "Error: " + response.statusCode;
			}
			if( typeof callback === 'function' ) callback(result);
		});
		
	}

	this.create_user = function(data, callback) {
		
		// data (array) attributes:
		// first_name,
		// last_name,
		// email,
		// username,
		// password
		
		var args = {
			'url' : this.api_baseurl+"users",
			'request_method' : 'PUT',
			'data' : data,
			'http_header' : {
				"Content-Type" : "application/json"
			}
		};
		
		var response = this.send(args, function(result) {
			if( typeof callback === 'function' ) callback(result);
		});
	}
	
	this.get_user = function(callback) {
		
		var args = {
			'url' : this.api_baseurl+"users/"+this.user_id,
			'http_header' : {
				"Content-Type" : "application/json",
				"Authorization" : "JWT "+this.access_token
			}
		};
		
		var response = this.send(args, function(result) {
			if( typeof callback === 'function' ) callback(result);
		});
		
	}
	
	this.login = function(data, callback) {

		// data (array) attributes:
		// username,
		// password
		
		var args = {
			'url' : this.api_baseurl+"login",
			'request_method' : 'POST',
			'data' : data,
			'http_header' : {
				"Content-Type" : "application/json"
			}
		};
		
		var response = this.send(args, function(result) {
			if( typeof callback === 'function' ) callback(result);
		});
		
	}
	
	this.get_all_flights = function(callback) {
		
		var args = {
			'url' : this.api_baseurl+"flights",
			'http_header' : {
				"Content-Type" : "application/json",
				"Authorization" : "JWT "+this.access_token
			}
		};
		
		var response = this.send(args, function(result) {
			if( typeof callback === 'function' ) callback(result);
		});
		
	}
	
	this.get_flight = function(data, callback) {
		
		// data (array) attributes:
		// flight_id
		
		var args = {
			'url' : this.api_baseurl+"flights/"+data.flight_id,
			'http_header' : {
				"Content-Type" : "application/json",
				"Authorization" : "JWT "+this.access_token
			}
		};
		
		var response = this.send(args, function(result) {
			if( typeof callback === 'function' ) callback(result);
		});
		
	}
	
	this.create_flight = function(callback) {
		
		var args = {
			'url' : this.api_baseurl+"flights",
			'request_method' : 'PUT',
			'http_header' : {
				"Content-Type" : "application/json",
				"Authorization" : "JWT "+this.access_token
			}
		};
		
		var response = this.send(args, function(result) {
			if( typeof callback === 'function' ) callback(result);
		});
		
	}
	
	this.get_flight_data = function(data, callback) {
		
		// data (array) attributes:
		// flight_id,
		// prop (array) attributes:
			// page,
			// per_page
		
		var args = {
			'url' : this.api_baseurl+"flights/"+data.flight_id+"/data",
			'request_method' : 'POST',
			'data' : data.prop,
			'http_header' : {
				"Content-Type" : "application/json",
				"Authorization" : "JWT "+this.access_token
			}
		};
		
		var response = this.send(args, function(result) {
			if( typeof callback === 'function' ) callback(result);
		});
		
	}
	
	this.create_flight_data = function(data, callback) {
		
		// data (array) attributes:
		// flight_id,
		// prop (array) attributes:
			// timestamp,
			// altitude,
			// barometricPressure,
			// coordinateX,
			// coordinateY,
			// temperature
		
		var args = {
			'url' : this.api_baseurl+"flights/"+data.flight_id+"/data",
			'request_method' : 'PUT',
			'data' : data.prop,
			'http_header' : {
				"Content-Type" : "application/json",
				"Authorization" : "JWT "+this.access_token
			}
		};
		
		var response = this.send(args, function(result) {
			if( typeof callback === 'function' ) callback(result);
		});
		
	}
	
}