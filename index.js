
/**
 * Lua script to map an external id to an
 * internal, sequential one.
 *
 * Attribution:
 * http://www.slideshare.net/crashlytics/crashlytics-on-redis-analytics
 */

var script = '\
  local identity = redis.call("ZSCORE", KEYS[1], ARGV[1])\
  if not identity then\
    identity = redis.call("ZCARD", KEYS[1])\
    redis.call("ZADD", KEYS[1], identity, ARGV[1])\
  end\
  return identity';

/**
 * Expose.
 */

module.exports = identity;

/*
 * Identity mapper where the id's are generated
 * via the lua `script`.
 *
 * @api public
 * @param {RedisClient} client
 * @param {String} [key]
 * @return {Function}
 */

function identity(client, key){
  key = key || 'identity-map';
  var cache = null;

  return function(id, cb){
    if (id == null) return cb(new Error('id is required'));

    if (!cache) {
      scriptload();
    } else {
      evalsha();
    }

    function scriptload(){
      client.send_command('SCRIPT', ['LOAD', script], function(err, sha1){
        if (err) return cb(err);
        cache = sha1;
        evalsha();
      });
    }

    function evalsha(){
      client.evalsha([cache, 1, key, id], function(err, res){
        if (err) return cb(err);
        cb(null, parseInt(res, 10));
      });
    }
  };
}

