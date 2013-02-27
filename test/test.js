
var redis = require('redis')
  , should = require('should')
  , client = redis.createClient()
  , identity = require('..')(client);

describe('identity', function(){

  describe('when a new id is passed in', function(){
    it('should map it to the internal id', function(done){
      get('xxx-123', 0);
      get('xxx-456', 1, done);
    });
    it('should map to the same id again', function(done){
      get('xxx-123', 0);
      get('xxx-456', 1, done);
    });
  });

  describe('when an empty id is passed', function(){
    it('should callback with err', function(done){
      identity(null, function(err, id){
        should.not.exist(id);
        err.should.be.instanceof(Error);
        err.message.should.equal('id is required');
        done();
      });
    });
  });

});

function get(id, expected, done){
  identity(id, function(err, id){
    should.not.exist(err);
    id.should.equal((expected));
    done && done();
  });
}