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
      this.$el.html(this.template({
        attributes: this.model.attributes,
        sortedCommonNames: this.model.sortedCommonNames(),
        sortedDistribution: this.model.sortedDistribution(),
        citesListing: this.model.attributes.citesListing ?
          this.model.attributes.citesListing.split(',') :
          []
      }));
      $('#speciesName').text(this.model.attributes.scientificName);
      var sortedCommonNames = _.map(this.model.sortedCommonNames(),
                                    function(d) { return d.name; });
      $('#commonNames').text(_.first(sortedCommonNames, 3).join(', '));
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
      this.listenTo(this.editionWindowView, 'editionWindowView:recordSaved',
                    this.render);

      $('body').append( this.editionWindowView.render().el );
    }

  });

  return DetailView;

});
