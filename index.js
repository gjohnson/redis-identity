
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
 *
 * @api public
 * @param {RedisClient} client
 * @param {String} [key]
 * @return {Function}
 */

module.exports = function(client, key){
  key = key || 'identity-map';
  return function(id, cb){
    var args = [script, 1, key, id];
    if (id == null) return cb(new Error('id is required'));
    client.send_command('eval', args, cb);
  };
};