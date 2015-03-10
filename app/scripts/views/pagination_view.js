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
      items: 20,
      limit: 10
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
      var self = this;

      this.data.query = this.getUrlParam('q');
      this.data.currentPage = Number(this.getUrlParam('page')) || 1;
      this.data.prevPage = this.data.currentPage <= 1 ?
        null : this.data.currentPage - 1;
      this.data.nextPage = this.data.currentPage === pages ?
        null : this.data.currentPage + 1;

      if (pages > this.options.limit) {
        this.data.trunc = true;
      }

      console.log(pages);
      var bottomPage = this.data.currentPage > 10 ?
        this.data.currentPage - (this.options.limit/2) :
        1;
      var pagesArr = _.first(_.range(bottomPage,
                                     pages + 1), this.options.limit);

      var pagesData = _.map(pagesArr, function(page) {
        return { name: page, current: (page === self.data.currentPage) };
      });

      this.data.pages = pagesData.length <= 1 ? null : pagesData;

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
