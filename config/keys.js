//keys.js -- figure out what set of creds to use
if (process.env.NODE_ENV === 'production'){
	// we are in production -- return prod set of keys
	module.exports = require('./prod');
} else {
	// we are in dev -- return the dev keys!!
	module.exports = require('./dev');
}