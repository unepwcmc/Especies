require.config({

  baseUrl: './scripts',

  paths: {
    // Project libraries
    jquery: '../../bower_components/jquery/dist/jquery',
    underscore: '../../bower_components/underscore/underscore',
    backbone: '../../bower_components/backbone/backbone',
    handlebars: '../../bower_components/handlebars/handlebars',
    text: '../../bower_components/text/text',

    // Test libraries
    mocha: '../../bower_components/mocha/mocha',
    chai: '../../bower_components/chai/chai',
    sinon: '../../bower_components/sinonjs/sinon'
  },

  shim: {
    foundation: {
      deps: ['jquery'],
      exports: '$'
    },
    mocha: {
      exports: 'mocha'
    }
  }

});


require([
  'mocha'
], function(mocha) {

  'use strict';

  mocha.ui('bdd');

  require([
    '../../specs/router_spec',
    '../../specs/models/specie_model_spec',
    '../../specs/collections/species_collection_spec'
  ], function() {

    (window.mochaPhantomJS) ? mochaPhantomJS.run() : mocha.run();

  });

});
