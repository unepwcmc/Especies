require.config({

  baseUrl: 'scripts',

  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    underscore: '../../bower_components/underscore/underscore',
    backbone: '../../bower_components/backbone/backbone',
    handlebars: '../../bower_components/handlebars/handlebars',
    text: '../../bower_components/text/text'
  },

  shim: {
    // foundation: {
    //   deps: ['jquery'],
    //   exports: '$'
    // }
  }

});


require([
  'backbone',
  'router',
  'views/search_view',
  'views/list_view'
], function(Backbone, Router, SearchView, ListView) {

  'use strict';

  /**
   * Application
   */
  var App = Backbone.View.extend({

    el: '#main',

    initialize: function() {
      this.router = new Router();

      this.search = new SearchView();

      this.setListeners();
    },

    setListeners: function() {
      this.listenTo(this.router, 'route', this.checkPage);
    },

    checkPage: function(nameRouter) {
      if (nameRouter === 'welcome') {
        this.currentPageView = new SearchView();
      } else if (nameRouter === 'listSpecies') {
        this.currentPageView = new ListView();
      }

      this.render();
    },

    render: function() {
      this.$el.html( this.currentPageView.render().el );
    },

    start: function() {
      Backbone.history.start({ pushState: false });
    }

  });

  new App().start();

});
