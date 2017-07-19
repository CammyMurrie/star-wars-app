process.env.NODE_ENV = 'production';

// Disable webpack-specific features for tests since
// Mocha doesn't know what to do with them.
require.extensions['.css'] = function () {
  return null;
};
require.extensions['.png'] = function () {
  return null;
};
require.extensions['.jpg'] = function () {
  return null;
};

require('babel-register')();

var jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;

// var jsdom = require('jsdom');
// const {JSDOM} = jsdom;
//
// var exposedProperties = ['window', 'navigator', 'document'];
//
// global.document = new JSDOM('');
// global.window = document.defaultView;
// Object.keys(document.defaultView).forEach((property) => {
//   if (typeof global[property] === 'undefined') {
//     exposedProperties.push(property);
//     global[property] = document.defaultView[property];
//   }
// });
//
// global.navigator = {
//   userAgent: 'node.js'
// };
//
// documentRef = document;
