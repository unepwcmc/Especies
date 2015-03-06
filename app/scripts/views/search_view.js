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
      'keyup input': 'onKeyUp'
    },

    defaults: {
      timer: 50,
      placeholder: 'Search by scientific name, taxon or common name'
    },

    template: Handlebars.compile(tpl),

    initialize: function(settings) {
      var options = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, options);
    },

    render: function() {
      this.$el.html( this.template( this.options ) );
      return this;
    },

    /**
     * Trigger event with query search on keyup
     * @param  {@event} e
     */
    onKeyUp: function(e) {
      if (e.keyCode === 38 || e.keyCode === 40) {
        this.$el.find('input').blur();
        return;
      } else if (e.keyCode == 32) {
        this.$el.find('button').click();
        return;
      }
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(function() {
        Backbone.Events.trigger('search:change', e.currentTarget.value);
      }, this.options.timer);
    }

  });

  return SearchView;

});
