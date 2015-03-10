define(['backbone'], function(Backbone) {

  'use strict';

  var apiDomain = 'http://ec2-54-94-97-96.sa-east-1.compute.amazonaws.com:8282';
  var apiUrl = apiDomain + '/api/taxa';

  var SpecieModel = Backbone.Model.extend({

    urlRoot: apiUrl,

    sortedCommonNames: function() {
      return _.sortBy(this.attributes.commonNames,
                      function(d) { return d.name; });
    },

    sortedDistribution: function() {
      return _.sortBy(this.attributes.distribution,
                      function(d) { return d.region; });
    }

  });

  return SpecieModel;

});
