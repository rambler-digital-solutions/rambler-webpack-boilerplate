'use strict';

// Depends
var $ = require('jquery');
var Backbone = require('backbone');
var Model  = require('./models/message');

// Apply styles for this module
require('./stylesheets/index.styl');

/**
 * Backbone default View
 */
module.exports = Backbone.View.extend({
  el: document.getElementById('body'),
  tagName: 'header',
  className: 'example',
  template: require('./templates/hello.pug'),
  events: {
    'click #rambler-logo': 'load'
  },
  model: new Model,
  initialize: function() {
    this.model.on('change:ip', () => this.update(), this);
    this.render();
  },

  render: function() {
    this.$el.append(this.template());
  },

  load: function(e) {
    this.model.fetch();
    e.preventDefault();
  },

  update: function() {
    this.$el.append(
      $('<div/>', { class: 'ip' })
        .text(`YourIP: ${this.model.get('ip')}`)
    );
  }
});
