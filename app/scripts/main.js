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
  'underscore',
  'backbone',
  'handlebars',
  'router',
  'views/search_view',
  'views/suggestions_view',
  'views/list_view',
  'views/detail_view',
  'text!templates/welcome_page_tpl.handlebars',
  'text!templates/list_page_tpl.handlebars',
  'text!templates/detail_page_tpl.handlebars'
], function(_, Backbone, Handlebars,
  Router, SearchView, SuggestionsView, ListView, DetailView,
  welcomeTpl, listTpl, detailTpl) {

  'use strict';

  /**
   * Application
   */
  var App = Backbone.View.extend({

    el: '#main',

    templates: {
      welcome: Handlebars.compile(welcomeTpl),
      list: Handlebars.compile(listTpl),
      detail: Handlebars.compile(detailTpl)
    },

    initialize: function() {
      this.router = new Router();
      this.setListeners();
    },

    setListeners: function() {
      this.listenTo(this.router, 'route', this.showPage);
    },

    render: function() {
      this.$el.html( this.currentTemplate() );
    },

    /**
     * Page dispatcher by route name
     * @param  {String} routeName
     */
    showPage: function(routeName, params) {
      if (routeName === 'welcome') {
        this.showWelcomePage();
      } else if (routeName === 'listSpecies') {
        this.showEspeciesPage();
      } else if (routeName === 'showSpecie') {
        this.showSpeciePage(params[0]);
      }
    },

    /**
     * Instance and render modules for welcome page
     */
    showWelcomePage: function() {
      this.currentTemplate = this.templates.welcome;
      this.render();
      this.searchModule();
    },


    /**
     * Instance and render modules for list page
     */
    showEspeciesPage: function() {
      this.currentTemplate = this.templates.list;
      this.render();
      this.searchModule();
      new ListView({ el: '.m-especies-list' });
    },

    /**
     * Instance and render modules for detail page
     */
    showSpeciePage: function(id) {
      this.currentTemplate = this.templates.detail;
      this.render();
      this.searchModule();
      new DetailView({ el: '.especie-detail' }, id);
    },

    /**
     * Search module
     */
    searchModule: function() {
      new SuggestionsView({ el: '.m-suggestions' });
      new SearchView({ el: '.m-search' }).render();
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
