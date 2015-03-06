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
      'click .modal-background': 'closeInfowindow',
      'submit #updateDescription': 'updateDescription',
      'submit #updateDistribution': 'updateDistribution'
    },

    /**
     * Initialize Editions page
     */
    initialize: function(settings) {
      var options = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, options);

      this.windowType = this.options.windowType;
      this.model = this.options.model;

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

      templateOptions['species'] = this.model.attributes;

      this.$el.append(this.template(
        templateOptions
      ));

      return this;
    },

    closeInfowindow: function() {
      $('.m-modal-window').remove();
    },

    updateDescription: function(e) {
      e.preventDefault();
      this.model.save({'description': e.target.children.description.value});
      this.closeInfowindow();
      this.trigger('editionWindowView:recordSaved');
    },

    updateDistribution: function(e) {
      e.preventDefault();
      var url = 'http://ec2-54-94-97-96.sa-east-1.compute.amazonaws.com:8282';
      $.each(this.model.attributes.distribution, function() {
        var val = e.target.children[0].children[0].children[0].value;
        this['region'] = val;
        $.ajax({
          url: url+'/api/distribution',
          type: 'PUT',
          data: JSON.stringify({
            id: this.id,
            region: val,
            speciesId: this.speciesId
          }),
          contentType: 'application/json',
          dataType: 'json',
          success: function() {
          }
        });
      });
      this.trigger('editionWindowView:recordSaved');
      this.closeInfowindow();
    }

  });

  return EditionWindowView;

});
