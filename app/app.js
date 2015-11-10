// God save the Dev
'use strict';

// Stylesheet entrypoint
require('_stylesheets/app.styl');

// Depends
var $ = require('jquery');

// Modules
var Boilerplate = require('_modules/boilerplate');

// Are you ready?
$(function() {
  new Boilerplate($('body'));
  // big tnhx for this plugin
  $('#fullpage').fullpage();
});
