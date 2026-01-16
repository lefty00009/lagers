const passport = require('passport');

module.exports = (app) => {
	app.get(
		'/auth/google', 
		passport.authenticate('google',{
			scope: ['profile', 'email']
		})
	);
	app.get(
	  '/auth/google/callback',
	  passport.authenticate('google'),
	  (req, res) => {
	    const redirectUrl =
	      process.env.NODE_ENV === 'production'
	        ? '/surveys'
	        : 'http://localhost:3000/surveys';
	
	    res.redirect(redirectUrl);
	  }
	);
	
	app.get('/api/logout', (req, res) => {
	  req.logout(() => {}); // passport 0.7+ expects a callback
	  const redirectUrl =
	    process.env.NODE_ENV === 'production'
	      ? '/'
	      : 'http://localhost:3000/';
	  res.redirect(redirectUrl);
	});

	app.get('/api/current_user', (req, res) => {
		res.send(req.user);
	});
};
