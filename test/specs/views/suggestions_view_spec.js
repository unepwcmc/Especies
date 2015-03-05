define([
  'chai',
  'backbone',
  'views/suggestions_view'
], function(chai, Backbone, SuggestionsView) {

  'use strict';

  var expect = chai.expect;
  var Collection = Backbone.Collection.extend({});

  before(function() {
    this.suggestionsView = new SuggestionsView({
      collection: new Collection()
    });
  });

  describe('@Search View', function() {

    it('should have a collection', function() {
      expect(this.suggestionsView.collection).to.be.a('object');
    });

    it('should be a instance of SuggestionsView', function() {
      expect(this.suggestionsView).to.be.an.instanceOf(SuggestionsView);
    });

  });

});
