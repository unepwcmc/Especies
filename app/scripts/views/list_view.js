define([
  'backbone',
  'handlebars',
  'text!templates/list_view_template.handlebars'
  ], function(Backbone, Handlebars, tpl) {

  'use strict';

  var ListView = Backbone.View.extend({

    template: Handlebars.compile(tpl),

    render: function() {
      this.$el.html( this.template() );
      return this;
    }

  });

  return ListView;

});
