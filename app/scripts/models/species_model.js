define(['backbone'], function(Backbone) {

  'use strict';

  var apiDomain = 'http://localhost:8282';
  var apiUrl = apiDomain + '/api/taxa';

  var SpecieModel = Backbone.Model.extend({

    urlRoot: apiUrl

  });

  return SpecieModel;

});
