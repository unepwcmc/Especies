define([
  'chai',
  'sinon',
  'collections/suggestions_collection'
], function(chai, sinon, SuggestionsCollection) {

  'use strict';

  var expect = chai.expect;
  var apiDomain = 'http://ec2-54-94-97-96.sa-east-1.compute.amazonaws.com:8282';
  var apiUrl = apiDomain + '/api/autocomplete';

  before(function() {
    this.server = sinon.fakeServer.create();
    this.suggestions = new SuggestionsCollection();
  });

  after(function() {
    this.server.restore();
  });

  describe('@SuggestionsCollection', function(){

    it('should be a instance of SuggestionsCollection', function() {
      expect(this.suggestions).to.be.an.instanceOf(SuggestionsCollection);
    });

    describe('#Fetch species', function() {

      it('should return a correct json data', function(done) {

        this.server.respondWith('GET', apiUrl, [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify([{
            'speciesId': 73067,
            'scientificName': 'Aa argyrolepis '
          },{
            'speciesId': 50040,
            'scientificName': 'Abarema acreana '
          }])
        ]);

        this.suggestions
          .fetch({
            success: function(collection) {
              expect(collection.length).to.be.equal(2);
              expect(collection.at(0).attributes)
                .to.have.all.keys(
                  'speciesId', 'scientificName'
                );
              done();
            }
          });

        this.server.respond();

      });

    });

  });

});
