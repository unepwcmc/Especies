define([
  'underscore',
  'backbone',
  'handlebars',
  'collections/suggestions_collection',
  'text!templates/suggestions_tpl.handlebars'
], function(_, Backbone, Handlebars, SuggestionsCollection, tpl) {

  'use strict';

  var SuggestionListView = Backbone.View.extend({

    template: Handlebars.compile(tpl),

    initialize: function() {
      this.collection = new SuggestionsCollection();
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('search:change', this.showSuggestions, this);
    },

    render: function() {
      this.$el.html(this.template( {
        suggestions: this.collection.toJSON()
      }));
      return this;
    },

    /**
     * Getting suggestions from collection and show it
     * @param  {query} e
     */
    showSuggestions: function(query) {
      this.collection
        .fetch({ data: { query: query } })
        .done(_.bind(this.render, this));
    }

  });

  return SuggestionListView;

});
