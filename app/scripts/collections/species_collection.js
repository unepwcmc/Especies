define(['backbone'], function(Backbone) {

  'use strict';

  var apiDomain = 'http://localhost:8282';
  var apiUrl = apiDomain + '/api/taxa';

  var SpeciesCollection = Backbone.Collection.extend({

    url: apiUrl,

    parse: function(data) {
      this.total = data.total;
      return data.species;
    }

  });

  return SpeciesCollection;

});
