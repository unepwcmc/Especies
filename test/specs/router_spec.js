define([
  'chai',
  'router'
], function(chai, Router) {

  'use strict';

  var expect = chai.expect;

  before(function() {
    this.router = new Router();
  });

  describe('@Router', function() {

    it('should be a instance of Router', function() {
      expect(this.router).to.be.an.instanceOf(Router);
    });

    it('should have the correct routes', function() {
      expect(this.router.routes).to.be.an('object');
      expect(this.router.routes['(/)']).to.be.equal('welcome');
      expect(this.router.routes['especies(/)']).to.be.equal('listSpecies');
      expect(this.router.routes['especies/:id(/)']).to.be.equal('showSpecie');
    });

  });

});
