define(['backbone'], function(Backbone) {

  'use strict';

  var Router = Backbone.Router.extend({

    routes: {
      '(/)': 'welcome',
      'especies(/)': 'listSpecies',
      'especies/:id(/)': 'showSpecies'
    }

  });

  return Router;

});
