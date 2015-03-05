define([
  'backbone',
  'handlebars',
  'text!templates/pagination_tpl.handlebars'
], function(Backbone, Handlebars, tpl) {

  'use strict';

  var PaginationView = Backbone.View.extend({

    template: Handlebars.compile(tpl),

    render: function() {
      this.$el.html( this.template() );
    }

  });

  return PaginationView;

});
