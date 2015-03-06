define([
  'underscore',
  'backbone',
  'handlebars',
  'models/specie_model',
  'views/edition_window_view',
  'text!templates/specie_detail_tpl.handlebars'
], function(_, Backbone, Handlebars, SpecieModel, EditionWindowView, tpl) {

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
      this.model = new SpecieModel({ id: id });
      this.showSpecie();
    },

    render: function() {
      this.$el.html(this.template( this.model.attributes ));
      return this;
    },

    showSpecie: function() {
      this.model.fetch().done(_.bind(this.render, this));
    },

    openEditWindow: function(e) {
      var editionWindowView;

      if (editionWindowView) {
        editionWindowView.remove();
      }

      var windowType = $(e.currentTarget).attr('data');

      editionWindowView = new EditionWindowView({
        el: 'body',
        options: {
          windowType: windowType
        }
      });
    }

  });

  return DetailView;

});
