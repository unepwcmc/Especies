define([
  'backbone'
  ], function(Backbone) {

  'use strict';

  var ListView = Backbone.View.extend({

    render: function() {
      this.$el.html( this.template() );
      return this;
    }

  });

  return ListView;

});
