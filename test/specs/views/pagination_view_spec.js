define([
  'chai',
  'views/search_view'
], function(chai, PaginationView) {

  'use strict';

  var expect = chai.expect;

  before(function() {
    this.paginationView = new PaginationView();
  });

  describe('@Search View', function() {

    it('should be a instance of PaginationView', function() {
      expect(this.paginationView).to.be.an.instanceOf(PaginationView);
    });

  });

});
