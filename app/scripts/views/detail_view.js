define([
  'underscore',
  'backbone',
  'handlebars',
  'models/species_model',
  'text!templates/species_detail_tpl.handlebars'
], function(_, Backbone, Handlebars, SpeciesModel, tpl) {

  'use strict';

  var DetailView = Backbone.View.extend({

    template: Handlebars.compile(tpl),

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
    }

  });

  return DetailView;

});
