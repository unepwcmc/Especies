define([
  'underscore',
  'backbone',
  'handlebars',
  'collections/suggestions_collection',
  'views/suggestions_view',
  'text!templates/search_tpl.handlebars'
], function(_, Backbone, Handlebars,
    SuggestionsCollection, SuggestionsView, tpl) {

  'use strict';

  /**
   * Search View with suggestions
   */
  var SearchView = Backbone.View.extend({

    events: {
      'keyup input': 'showSuggestions'
    },

    defaults: {
      timer: 300
    },

    template: Handlebars.compile(tpl),

    initialize: function(settings) {
      var options = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, options);
      this.collection = new SuggestionsCollection();
    },

    render: function() {
      this.$el.html( this.template() );
      return this;
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

  return SearchView;

});
