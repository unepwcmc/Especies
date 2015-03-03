define(['backbone'], function(Backbone) {

  'use strict';

  var SpecieModel = Backbone.Model.extend({

    urlRoot: '/api/taxa'

  });

  return SpecieModel;

});
