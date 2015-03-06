define([
  'underscore',
  'backbone',
  'handlebars',
  'collections/species_collection',
  'text!templates/species_list_tpl.handlebars'
], function(_, Backbone, Handlebars, SpeciesCollection, tpl) {

  'use strict';

  var ListView = Backbone.View.extend({

    template: Handlebars.compile(tpl),

    initialize: function() {
      this.collection = new SpeciesCollection();
      this.showSpecies();
    },

    render: function() {
      var data = this.collection.toJSON();
      this.$el.html(this.template({
        species: (this.collection.length > 0) ? data : null
      }));
      return this;
    },

    showSpecies: function() {
      var query = this.getUrlParam('q');
      var page = this.getUrlParam('page');
      var rank = this.getUrlParam('rank');
      var name = this.getUrlParam('name');
      var params = {
        page: page || 1,
        perPage: 14
      };
      if (query && !rank) {
        params.scientificName = query || ' ';
      } else if (rank) {
        params.rank = rank;
        params.scientificName = name;
      }
      this.collection.fetch({
        data: params
      }).done(_.bind(this.render, this));
    },

    getUrlParam: function(name) {
      var expr = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)');
      var param = decodeURIComponent(
        (expr.exec(location.search) || [,''])[1].replace(/\+/g, '%20')
      );
      return param || null;
    }

  });

  return ListView;

});
