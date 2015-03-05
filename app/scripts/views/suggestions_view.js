define([
  'backbone',
  'handlebars',
  'collections/suggestions_collection',
  'text!templates/suggestions_tpl.handlebars'
], function(Backbone, Handlebars, SuggestionsCollection, tpl) {

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
    },

    /**
     * Showing suggestions from collection and show it
     * @param  {@event} e
     */
    showSuggestions: function(e) {
      var self = this;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(function() {
        self.collection
          .fetch({ data: { query: e.currentTarget.value } })
          .done(self.renderSuggestionsList);
        }, this.options.timer);
    },

    /**
     * Create a list with suggestions and render it
     */
    renderSuggestionsList: function() {
      this.suggestions = new SuggestionsView({
        collection: this.collection
      });
      this.$el.find('.m-suggestion-list').html( this.suggestions.render().el );
      return this;
    }

  });

  return SuggestionListView;

});
