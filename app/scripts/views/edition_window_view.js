define([
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/edition_window_tpl.handlebars'
], function(_, Backbone, Handlebars, tpl) {

  'use strict';

  var EditionWindowView = Backbone.View.extend({

    template: Handlebars.compile(tpl),

    events: {
      'click .btn-close': 'closeInfowindow',
      'click .modal-background': 'closeInfowindow'
    },

    /**
     * Initialize Editions page
     */
    initialize: function(settings) {
      var options = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, options);

      this.windowType = this.options.windowType;

      this.render();
    },

    render: function() {
      var templateOptions;

      if (this.windowType === 'description') {
        templateOptions = {description: true};
      } else if (this.windowType === 'distribution'){
        templateOptions = {distribution: true};
      } else if (this.windowType === 'common-names'){
        templateOptions = {commonNames: true};
      }

      this.$el.append(this.template(
        templateOptions
      ));

      return this;
    },

    closeInfowindow: function() {
      $('.m-modal-window').remove();
    }

  });

  return EditionWindowView;

});
