'use strict';

// Apply styles for this module
require('./stylesheets/index.styl');

// Depends
var _           = require('underscore');
var Backbone    = require('backbone');
var Collection  = require('./collections/messages');

/**
 * Backbone default View
 */
module.exports = Backbone.View.extend({
  className: 'example',
  tagName: 'header',
  template: require('./templates/hello.jade'),
  collection: new Collection,
  initialize: function($el) {
    this.$el = $el;
    this.render()
  },

  render: function() {
    this.$el.prepend(this.template());
  }
});
