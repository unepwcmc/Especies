require.config({

  baseUrl: 'scripts',

  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    foundation: '../../bower_components/foundation/js/foundation',
    underscore: '../../bower_components/underscore/underscore',
    backbone: '../../bower_components/backbone/backbone',
    handlebars: '../../bower_components/handlebars/handlebars',
    text: '../../bower_components/text/text'
  },

  shim: {
    foundation: {
      deps: ['jquery'],
      exports: '$'
    }
  }

});


require([
  'foundation',
  'backbone'
], function($, Backbone) {

  'use strict';

  /**
   * Application
   */
  var App = Backbone.View.extend({

    el: document.body,

    start: function() {}

  });

  new App().start();

});
