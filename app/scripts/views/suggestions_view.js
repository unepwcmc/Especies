define([
  'backbone',
  'handlebars',
  'text!templates/suggestion_list_tpl.handlebars'
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
      this.$el.html( this.template( this.collection.toJSON() ) );
    }

  });

  return SuggestionListView;

});
