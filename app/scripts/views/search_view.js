define([
  'backbone',
  'handlebars',
  'views/list_view',
  'text!templates/search_view_template.handlebars'
  ], function(Backbone, Handlebars, ListView, tpl) {

  'use strict';

  var SearchView = Backbone.View.extend({

    template: Handlebars.compile(tpl),

    render: function() {
      this.$el.html( this.template() );
      return this;
    }

  });

  return SearchView;

});
