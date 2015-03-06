define([
  'jquery',
  'underscore',
  'backbone',
  'handlebars',
  'collections/suggestions_collection',
  'text!templates/suggestions_tpl.handlebars'
], function($, _, Backbone, Handlebars, SuggestionsCollection, tpl) {

  'use strict';

  var SuggestionListView = Backbone.View.extend({

    template: Handlebars.compile(tpl),

    initialize: function() {
      this.collection = new SuggestionsCollection();
      this.setListeners();
    },

    setListeners: function() {
      Backbone.Events.on('search:change', this.showSuggestions, this);
      $(document).on('keyup', _.bind(this.onKeyUp, this));
    },

    render: function() {
      var data = this.collection.toJSON();
      this.$el.html(this.template( {
        suggestions: (this.collection.length > 0) ? data : null
      }));
      return this;
    },

    /**
     * Getting suggestions from collection and show it
     * @param  {query} e
     */
    showSuggestions: function(query) {
      // to get better perfomance first abort pending request
      if(this.xhr && this.xhr.readyState > 0 && this.xhr.readyState < 4){
        this.xhr.abort();
      }
      if (!query) {
        this.collection.reset();
        return this.render();
      }
      this.xhr = this.collection
        .fetch({ data: { query: query } })
        .done(_.bind(this.render, this));
    },

    onKeyUp: function(e) {
      // up arrow key
      if (e.keyCode === 38) {
        // TODO: When user press up arrow key
      }
      // down arrow key
      if (e.keyCode === 40) {
        // TODO: When user press down arrow key
      }
    }

  });

  return SuggestionListView;

});
