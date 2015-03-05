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
    foundation: {
      deps: ['jquery'],
      exports: '$'
    }
  }

});


require([
  'backbone'
], function(Backbone) {

  'use strict';

  /**
   * Application
   */
  var App = Backbone.View.extend({

    el: '#main',

    templates: {
      welcome: Handlebars.compile.,
      list: listTpl,
      detail: detailTpl
    },

    initialize: function() {
      this.router = new Router();
    },

    setListeners: function() {
      this.listenTo(this.router, 'routes', this.showPage);
    },

    render: function() {
      this.$el.html( this.currentTemplate() );
    },

    showPage: function(routeName) {
      if (routeName === 'welcome') {
        this.showWelcomePage();
      }
    },

    /**
     * Instance and render modules for welcome page
     */
    showWelcomePage: function() {
      this.currentTemplate = this.templates.welcome;
      this.render();
      // this.modules.map(function(module) {
      //   this.
      // });
    },

    /**
     * Start router with HTML5 History API
     */
    start: function() {
      Backbone.history.start({ pushState: false });
    }

  });

  new App().start();

});
