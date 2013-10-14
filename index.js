var http = require('http');
var domain = "bot.notenoughmods.com";
var protocol = "http";
var versionList = "?json";
var modList = "%version%.json";
var buildingCache = false
var cacheReady = false
var modCache = {}

function fetchJson( url, callback ) {
	var accumulatedData = ""
	http.get(url, function(res) {
		if(res.statusCode != 200) {
			callback({'error': res.statusCode});
		}else {
			res.setEncoding('utf8');
			res.on('error', function(error) {
				callback({ 'error': error });
			}).on('data', function(chunk) {
				accumulatedData += chunk;
			}).on('end', function() {
				try	{
					var json = JSON.parse(accumulatedData);
					callback(json);
				}catch(e) {
					callback({'error': e});
				}
			});
		}
	}).on('error', function(error) {
		callback({ 'error': error });
	});
}

function getVersions(callback) {
	fetchJson(protocol + "://" + domain + "/" + versionList, callback);
}

function getMods(version, callback) {
	fetchJson(protocol + "://" + domain + "/" + modList.replace("%version%", version), 
	function(data) {
		if(Array.isArray(data)) {
			modCache[version] = data;
		}
		callback(data);		
	});
}

function getModsCached(version, callback, forceSync) {
	if(forceSync === true || typeof modCache[version] === "undefined") {
		getMods(version, callback);
	}else{
		callback(modCache[version]);
	}
}

function getModByName(version, name, callback, forceSync) {
	getModsCached(version, function(data) {
		if(Array.isArray(data)) {
			var matches = []
			for(i = 0; i  < data.length; i++) {
				if(data[i].name.toUpperCase() === name.toUpperCase()) {
					matches.push(data[i]);
				}
			}
			callback(matches);
		}else{
			callback(data);
		}
	}, forceSync);
}

function getModByAuthor(version, author, callback, forceSync) {
	getModsCached(version, function(data) {
		if(Array.isArray(data)) {
			var matches = []
			for(i = 0; i  < data.length; i++) {
				if(data[i].author.toUpperCase() === author.toUpperCase()) {
					matches.push(data[i]);
				}
			}
			callback(matches);
		}else{
			callback(data);
		}
	}, forceSync);
}


module.exports = {
	'getVersions': getVersions,
	'getMods': getModsCached,
	'getModByName' : getModByName,
	'getModByAuthor' : getModByAuthor
};