'use strict';

// Depends
var Backbone = require('backbone');
var Collection  = require('./collections/messages');

// Apply styles for this module
require('./stylesheets/index.styl');

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
    this.render();
  },

  render: function() {
    this.$el.prepend(this.template());
  }
});
