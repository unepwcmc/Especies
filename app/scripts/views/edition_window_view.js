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
      'submit #update-description': 'updateDescription',
      'submit #update-distribution': 'updateDistribution',
      'click #add-new-dist': 'addNewDist',
      'submit #update-common-names': 'updateCommonNames',
      'click #add-new-common': 'addNewCommon'
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
      var url = 'http://ec2-54-94-97-96.sa-east-1.compute.amazonaws.com:8282' +
        '/api/distribution';
      var speciesId = this.model.attributes.speciesId;

      // Add new
      var self = this;
      $.each(e.target.children[0].children, function() {
        if($(this).hasClass('labels')){
          return true;
        }
        var val = this.children[0].value;
        var id;
        if($(this.children[0]).hasClass('new-item')){
          id = null;
        } else {
          id = parseInt(this.children[0].id.replace('region-', ''));
          var item = _.findWhere(self.model.attributes.distribution,
                                 {id: id});
          item['region'] = val;
        }
        $.ajax({
          url: url,
          type: 'PUT',
          data: JSON.stringify({
            id: id,
            region: val,
            speciesId: speciesId
          }),
          contentType: 'application/json',
          dataType: 'json',
          success: function(data) {
            if(!_.findWhere(self.model.attributes.distribution,
                            {id: data.id})){
              self.model.attributes.distribution.push({
                id: data.id,
                speciesId: data.speciesId,
                region: data.region
              });
              self.trigger('editionWindowView:recordSaved');
            }
          }
        });
      });
      this.trigger('editionWindowView:recordSaved');
      this.closeInfowindow();
    },

    addNewDist: function(e) {
      e.preventDefault();
      var $el = $('.m-existing-item').last().clone();
      $el.find('input').attr('id','').val('');
      $el.find('input').addClass('new-item');
      $('.existing-items-list').append($el);
    },

    updateCommonNames: function(e) {
      e.preventDefault();
      var url = 'http://ec2-54-94-97-96.sa-east-1.compute.amazonaws.com:8282' +
        '/api/commonNames';
      var speciesId = this.model.attributes.speciesId;

      // Add new
      var self = this;
      $.each(e.target.children[0].children, function() {
        if($(this).hasClass('labels')){
          return true;
        }
        var name = this.children[0].value;
        var language = this.children[1].value;
        var region = this.children[2].value;
        var id;
        if($(this).hasClass('new-item')){
          id = null;
        } else {
          id = parseInt(this.id.replace('common-name-', ''));
          var item = _.findWhere(self.model.attributes.commonNames,
                                 {id: id});
          item['name'] = name;
          item['language'] = language;
          item['region'] = region;
        }
        $.ajax({
          url: url,
          type: 'PUT',
          data: JSON.stringify({
            id: id,
            region: region,
            speciesId: speciesId,
            language: language,
            name: name
          }),
          contentType: 'application/json',
          dataType: 'json',
          success: function(data) {
            if(!_.findWhere(self.model.attributes.commonNames,
                            {id: data.id})){
              self.model.attributes.commonNames.push({
                id: data.id,
                speciesId: data.speciesId,
                region: data.region,
                language: data.language,
                name: data.name
              });
              self.trigger('editionWindowView:recordSaved');
            }
          }
        });
      });
      this.trigger('editionWindowView:recordSaved');
      this.closeInfowindow();
    },

    addNewCommon: function(e) {
      e.preventDefault();
      var $el = $('.m-existing-item').last().clone();
      $el.attr('id','');
      $el.addClass('new-item');
      $el.find('.input').val('');
      $('.existing-items-list').append($el);
    }

  });

  return EditionWindowView;

});
