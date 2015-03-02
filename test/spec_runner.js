require.config({

  baseUrl: 'scripts',

  paths: {
    jquery: '../../bower_components/jquery/dist/jquery',
    foundation: '../../bower_components/foundation/js/foundation',
    underscore: '../../bower_components/underscore/underscore',
    backbone: '../../bower_components/backbone/backbone',
    handlebars: '../../bower_components/handlebars/handlebars',
    text: '../../bower_components/text/text',
    mocha: '../../bower_components/mocha/mocha',
    chai: '../../bower_components/chai/chai'
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

  require(['../../specs/collections/species_collection_spec'], function() {

    (window.mochaPhantomJS) ? mochaPhantomJS.run() : mocha.run();

  });

});
