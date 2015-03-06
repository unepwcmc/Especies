define([
  'underscore',
  'backbone',
  'handlebars',
  'models/specie_model',
  'text!templates/edition_window_tpl.handlebars'
], function(_, Backbone, Handlebars, SpecieModel, tpl) {

  'use strict';

  var EditionWindowView = Backbone.View.extend({

    template: Handlebars.compile(tpl),

    events: {
      'click .btn-close': 'closeInfowindow'
    },

    /**
     * Initialize Editions page
     */
    initialize: function() {
      this.render();
    },

    render: function() {
      this.$el.append(this.template());
      return this;
    },

    closeInfowindow: function() {
      $('.m-modal-window').remove();
    }

  });

  return EditionWindowView;

});
