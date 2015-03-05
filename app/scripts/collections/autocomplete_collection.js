define(['backbone'], function(Backbone) {

  'use strict';

  var apiDomain = 'http://ec2-54-94-97-96.sa-east-1.compute.amazonaws.com:8282';
  var apiUrl = apiDomain + '/api/autocomplete';

  var AutocompleteCollection = Backbone.Collection.extend({

    url: apiUrl

  });

  return AutocompleteCollection;

});
