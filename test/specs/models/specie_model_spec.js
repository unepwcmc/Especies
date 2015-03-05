define([
  'chai',
  'sinon',
  'models/specie_model'
], function(chai, sinon, SpecieModel) {

  'use strict';

  var expect = chai.expect;
  var apiDomain = 'http://ec2-54-94-97-96.sa-east-1.compute.amazonaws.com:8282';
  var apiUrl = apiDomain + '/api/taxa/';

  before(function() {
    this.specie = new SpecieModel({ id: 1 });
    this.server = sinon.fakeServer.create();
  });

  after(function() {
    this.server.restore();
  });

  describe('@Specie Model', function() {

    it('should be a instance of SpecieModel', function() {
      expect(this.specie).to.be.an.instanceOf(SpecieModel);
      expect(this.specie.id).to.be.equal(1);
    });

  });

  describe('#Fetch specie', function() {

      it('should return a correct json data', function(done) {

        this.server.respondWith('GET', apiUrl + this.specie.id, [
          200,
          { 'Content-Type': 'application/json' },
          JSON.stringify({
            kingdomName: 'string',
            phylumName: 'string',
            className: 'string',
            orderName: 'string',
            familyName: 'string',
            genusName: 'string',
            scientificName: 'string',
            speciesId: 'number',
            speciesPlusId: 'number',
            gbifId: 'number',
            citesListings: 'array'
          })
        ]);

        this.specie
          .fetch({
            success: function() {
              // expect(model.attributes)
              //   .to.have.all.keys(
              //     'kingdomName', 'phylumName', 'className', 'orderName',
              //     'familyName', 'genusName', 'scientificName', 'speciesId',
              //     'speciesPlusId', 'gbifId', 'citesListings'
              //   );
              done();
            }
          });

        this.server.respond();

      });

    });

});
