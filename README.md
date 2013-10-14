node-modbot
===========

ModBot API interface module for Node.JS


API
===

The API is rather simple, once you require the modbot API like this,

`var modbot = require('./modbot')`

You can use the following functions
Note: All functions return an array or an object with an error in it, check test
for result.error before trying to process the array.

`modbot.getVersions( callback )`
* `callback` is the function to call on completion

The results will be an array in the first argument of the callback.

`modbot.getVersions( function(versionList) { console.log(versionList); }); `

All the other functions have a similar syntax.

`modbot.getMods( version, callback, [forceSync] ) `

* `version` is the minecraft version
* `callback` is the function to handle the results
* `forceSync` is an optional parameter that will force new results to be downloaded

`modbot.getModsByAuthor( version, author, callback, [forceSync] ) `

* `version` is the minecraft version
* `author` is the name of the author to filter by (not case sensitive)
* `callback` to handle the results
* `forceSync` to force new results to be downloaded

`modbot.getModsByName( version, name, callback, [forceSync] ) `

* `version` is the minecraft version
* `name` is the mod name (not case sennsitive)
* `callback` to handle the results
* `forceSync` to force new results

Mod Object
==========

The callbacks will be provided an array of matching results, even in the case of only one result from a ByName or ByAuthor
query, there will still be an array of 1 element.

Each object will have a set collection of properties that may or may not contain a value

* `name` the mod name
* `version` the mod version
* `longurl` the full url to the mod
* `shorturl` the short url to the mod
* `aliases` aliases that the mod may also be known as
* `comment` additional community supplied comments
* `dev` the version number of the latest dev build
* `author` the mod author
