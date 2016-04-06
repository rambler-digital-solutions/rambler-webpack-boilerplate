// God save the Dev
'use strict';

// Depends
var $ = require('jquery');

// Modules
var Boilerplate = require('_modules/boilerplate');

// Stylesheet entrypoint
require('_stylesheets/app.styl');

// Are you ready?
$(function() {
  new Boilerplate();
  // big tnhx for this plugin
  $('#fullpage').fullpage();
});
