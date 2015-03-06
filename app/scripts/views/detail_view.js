define([
  'underscore',
  'backbone',
  'handlebars',
  'models/species_model',
  'views/edition_window_view',
  'text!templates/species_detail_tpl.handlebars'
], function(_, Backbone, Handlebars, SpeciesModel, EditionWindowView, tpl) {

  'use strict';

  var DetailView = Backbone.View.extend({

    template: Handlebars.compile(tpl),

    events: {
      'click .btn-edit':'openEditWindow'
    },

    /**
     * Initialize details page
     * @param  {Object} settings
     * @param  {Number} id
     */
    initialize: function(settings, id) {
      if (!id) {
        throw 'ID param must be defined.';
      }
      this.model = new SpeciesModel({ id: id });
      this.showSpecies();
    },

    render: function() {
      this.$el.html(this.template( this.model.attributes ));
      return this;
    },

    showSpecies: function() {
      this.model.fetch().done(_.bind(this.render, this));
    },

    openEditWindow: function(e) {
      e.preventDefault();

      if (this.editionWindowView) {
        this.editionWindowView.remove();
      }

      var windowType = $(e.currentTarget).attr('data');

      this.editionWindowView = new EditionWindowView({
        el: 'body',
        options: {
          windowType: windowType
        }
      });
    }

  });

  return DetailView;

});
