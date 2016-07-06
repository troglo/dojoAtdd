'use strict';

const requestPromise = require('request-promise');

module.exports = function() {

 this.When(/^a supermarket clerk want add a "([^"]*)"$/, function (product, done) {
         const world = this;

         let chechoutResponse = world.getValue('checkoutCreationResponse');
         const options = {
            method: 'POST',
            uri: chechoutResponse.headers.location + "/items",
            json: {
                product: product
            },
            resolveWithFullResponse: true
        };

        requestPromise(options)
        .then(function (response) {
            response.statusCode.should.equal(201);
            done();
        })
        .catch(function (err) {
            done(err);
        });
    });
};
