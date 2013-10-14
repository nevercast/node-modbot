var modbot = require('./index.js');
modbot.getModByAuthor('1.6.4', 'ChickenBones', function(matches) {
	if(matches.error) {
		console.log('error ', matches.error);
	}else{
		matches.forEach(function(match) {
			console.log(match.name, ' version: ', match.version);
		});
	}
});