define([
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/breadcrumbs_tpl.handlebars'
], function(_, Backbone, Handlebars, tpl) {

  'use strict';

  var BreadcrumbsView = Backbone.View.extend({

    initialize: function() {
      if (!this.collection) {
        throw 'collection must be defined.';
      }
      this.setListeners();
    },

    template: Handlebars.compile(tpl),

    render: function() {
      this.$el.html(this.template(this.data));
      return this;
    },

    setListeners: function() {
      this.listenTo(this.collection, 'sync', this.setData);
    },

    setData: function() {
      var query = this.getUrlParam('q');
      if (query) {
        return this.$el.addClass('is-hidden');
      }

      var species = this.collection.length > 0 ?
        this.collection.at(0).attributes : {};

      console.log(species);

      this.data = {
        breadcrumbs: [{
          name: species.kingdomName,
          rank: 'Kingdom'
        }, {
          name: species.phylumName,
          rank: 'Phylum'
        }, {
          name: species.className,
          rank: 'Class'
        }, {
          name: species.orderName,
          rank: 'Order'
        }, {
          name: species.familyName,
          rank: 'Family'
        }]
      };

      this.render();
    },

    getUrlParam: function(name) {
      var expr = new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)');
      var param = decodeURIComponent(
        (expr.exec(location.search) || [,''])[1].replace(/\+/g, '%20')
      );
      return param || null;
    }

  });

  return BreadcrumbsView;

});
