define([
  'backbone',
  'handlebars',
  'text!templates/suggestions_tpl.handlebars'
], function(Backbone, Handlebars, tpl) {

  'use strict';

  var SuggestionListView = Backbone.View.extend({

    template: Handlebars.compile(tpl),

    initialize: function() {
      if (!this.collection) {
        throw 'A collection param must be defined';
      }
    },

    render: function() {
      this.$el.html(this.template( {
        suggestions: this.collection.toJSON()
      }));
    }

  });

  return SuggestionListView;

});
