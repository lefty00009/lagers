require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const keys = require('./config/keys');
require('./models/user');
require('./models/survey');
require('./services/passport');


console.log('DEBUG keys.mongoURI:', keys.mongoURI);
if (keys.mongoURI) {
  mongoose.connect(keys.mongoURI)
    .then(() => console.log('Mongo connected'))
    .catch(err => console.error('Mongo connection error', err));
} else {
  console.warn('Mongo disabled: missing mongoURI');
}

const app = express();

app.set('trust proxy', 1);  //good for Render + secure cookies

app.use(helmet());
app.use(bodyParser.json());

app.use(session({
  secret: keys.cookieKey,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 24 * 60 * 60 * 1000,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  }
}));


app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);

if(process.env.NODE_ENV === 'production'){
	// Express will serve up production assets
	// like our main.js file, or main.css file!
	app.use(express.static('client/build'));
	
	app.set('trust_proxy', 1);

	// Express will serve up the index.html file
	//if it doesn't recognize the route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);
