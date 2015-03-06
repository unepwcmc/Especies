define([
  'underscore',
  'backbone',
  'handlebars',
  'text!templates/pagination_tpl.handlebars'
], function(_, Backbone, Handlebars, tpl) {

  'use strict';

  var PaginationView = Backbone.View.extend({

    template: Handlebars.compile(tpl),

    defaults: {
      items: 14
    },

    initialize: function(settings) {
      var options = settings && settings.options ? settings.options : {};
      this.options = _.extend({}, this.defaults, options);
      if (!this.collection) {
        throw 'collection must be defined.';
      }
      this.data = {};
      this.setListeners();
    },

    render: function() {
      this.$el.html( this.template( this.data ) );
    },

    setListeners: function() {
      this.listenTo(this.collection, 'sync', this.changePagination);
    },

    changePagination: function() {
      var i = this.collection.total / this.options.items;
      var pages = Math.ceil(i);
      this.data.pages = pages <= 1 ? null : _.range(1, pages + 1);
      this.data.query = this.getUrlParam('q');
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

  return PaginationView;

});
