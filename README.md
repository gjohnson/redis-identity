
# redis-identity

Redis script for mapping external ID's to sequential ones. Adapted from [crashlytics](http://www.slideshare.net/crashlytics/crashlytics-on-redis-analytics).

## install

```shell
$ npm install redis-identity
```

## usage

Pass in a node-redis client, and an optional key to use for the id mappings. 

```javascript
var redis = require('redis')
  , client = redis.createClient()
  , identity = require('redis-identity')(client);

identity('xxx-123-456', function(err, id){
  // ...
});
```

The second argument is the optional for the mapping, it defaults to `identity-map`.

```javascript
var redis = require('redis')
  , client = redis.createClient()
  , identity = require('redis-identity')(client, 'my-id-map');

identity('xxx-123-456', function(err, id){
  // ...
});
```

## notes

  - this will only work with node_redis >= 0.8.2.

## license

MIT