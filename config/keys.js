console.log('keys.js loading env:', process.env.NODE_ENV);

if (process.env.NODE_ENV === 'production') {
  console.log('keys.js using prod config');
  module.exports = require('./prod');
} else {
  console.log('keys.js using dev config');
  module.exports = require('./dev');
}

