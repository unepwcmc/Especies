define([
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/search_tpl.handlebars'
], function(_, Backbone, Handlebars, tpl) {

  'use strict';

  /**
   * Search View with suggestions
   */
  var SearchView = Backbone.View.extend({

    events: {
      'keyup input': 'onKeyUp',
      'submit form': 'onSubmit'
    },

    defaults: {
      timer: 100
    },

    template: Handlebars.compile(tpl),

    initialize: function(settings) {
      var options = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, options);
    },

    render: function() {
      this.$el.html( this.template() );
      return this;
    },

    /**
     * Trigger event with query search on keyup
     * @param  {@event} e
     */
    onKeyUp: function(e) {
      var self = this;
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(function() {
        console.log(e.currentTarget.value);
        self.trigger('search:change', e.currentTarget.value);
      }, this.options.timer);
    },

    /**
     * Trigger event with query search on submit
     * @param  {@event} e
     */
    onSubmit: function(e) {
      e.preventDefault();
      var params = $(e.currentTarget).serializeArray();
      var value = _.findWhere(params, {name: 'query'});
      console.log(value);
      this.trigger('search:change', value ? value.value : null);
    }

  });

  return SearchView;

});
