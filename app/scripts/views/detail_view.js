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
    initialize: function() {
      // bind template to model changes
      this.listenTo(this.model, 'save', this.render);
    },

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
      $('#speciesName').text(this.model.attributes.scientificName);
      $('#commonNames').text(this.model.attributes.commonNames.join(', '));
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
        options: {
          windowType: windowType,
          model: this.model
        }
      });

      $('body').append( this.editionWindowView.render().el );
    }

  });

  return DetailView;

});
