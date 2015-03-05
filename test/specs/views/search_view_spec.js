define([
  'chai',
  'views/search_view'
], function(chai, SearchView) {

  'use strict';

  var expect = chai.expect;

  before(function() {
    this.searchView = new SearchView();
  });

  describe('@Search View', function() {

    it('should be a instance of SearchView', function() {
      expect(this.searchView).to.be.an.instanceOf(SearchView);
    });

  });

});
