"use strict";
var chai = require('chai')
  ,	expect = chai.expect
  , updateCompose = require('../src/updateComposeFile')
  , resetCompose = require('./resetComposeFile')

  , path = require('path')
  , fs = require('fs')
  ;


function checkForVersion(data, version) {
    var lines = data.split(`\n`)
      , hasVersion = false
      ;

    for(let i = 0; i < lines.length; i++) {
        if (lines[i].includes(`:${version}`)) {
            // return true if we find the version
            hasVersion = true;
            i = lines.length;
        }
    }

    return hasVersion;
}


describe('updateComposeSpec', function () {

    describe('Nominal operation', function () {
      afterEach(function (done) {
          // set compose file back
          resetCompose(__dirname)
            .then(done)
            .catch(done)
            ;
      });

      it('should operate correctly', function (done) {
          const VERSION = '1.0.0';
          updateCompose(__dirname, VERSION)
            .then(function () {
              // read compose and check for update
                fs.readFile(path.join(__dirname, 'docker-compose.yml'), 'utf-8', function(err, data) {
                    if (err) {
                        return done(err);
                    }

                    expect(checkForVersion(data.toString(), VERSION)).to.equal(true);
                    done();
                });
            })
            .catch(done)
      });
    });
});