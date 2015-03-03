define([
  'chai',
  'sinon',
  'collections/species_collection'
], function(chai, sinon, SpeciesCollection) {

  'use strict';

  var expect = chai.expect;

  before(function() {
    this.server = sinon.fakeServer.create();
    this.species = new SpeciesCollection();
  });

  after(function() {
    this.server.restore();
  });

  describe('@SpeciesCollection', function(){

    it('should be a instance of SpeciesCollection', function() {
      expect(this.species).to.be.an.instanceOf(SpeciesCollection);
    });

    describe('#Fetch species', function() {

      it('should return a correct json data', function(done) {

        this.server.respondWith('GET', '/api/taxa', [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify([{
            'className': null,
            'distribution': 'Sergipe',
            'familyName': null,
            'kingdomName': 'Plants',
            'orderName': 'Arthoniales',
            'phylumName': 'Ascomycota',
            'scientificName': 'Arthonia andamanica '
          }, {
            'className': null,
            'distribution': 'Pernambuco, Rio Grande do Norte, Alagoas',
            'familyName': null,
            'kingdomName': 'Plants',
            'orderName': 'Arthoniales',
            'phylumName': 'Ascomycota',
            'scientificName': 'Arthonia bessalis'
          }])
        ]);

        this.species
          .fetch({
            success: function(collection) {
              expect(collection.length).to.be.equal(2);
              expect(collection.at(0).attributes)
                .to.have.all.keys(
                  'className', 'distribution', 'familyName', 'kingdomName',
                  'orderName', 'phylumName', 'scientificName'
                );
              done();
            }
          });

        this.server.respond();

      });

    });

  });

});
