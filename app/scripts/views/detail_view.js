define([
  'underscore',
  'backbone',
  'handlebars',
  'models/specie_model',
  'text!templates/specie_detail_tpl.handlebars'
], function(_, Backbone, Handlebars, SpecieModel, tpl) {

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
      this.model = new SpecieModel({ id: id });
      this.showSpecie();
    },

    render: function() {
      this.$el.html(this.template( this.model.attributes ));
      return this;
    },

    showSpecie: function() {
      this.model.fetch().done(_.bind(this.render, this));
    }

  });

  return DetailView;

});
