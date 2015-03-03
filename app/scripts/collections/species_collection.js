define(['backbone'], function(Backbone) {

  'use strict';

  var SpeciesCollection = Backbone.Collection.extend({

    url: '/api/taxa'

  });

  return SpeciesCollection;

});
