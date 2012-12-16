[![Build Status](https://travis-ci.org/gjohnson/redis-identity.png)](https://travis-ci.org/gjohnson/redis-identity)

# redis-identity

Redis script for mapping external ID's to sequential ones. Adapted from [crashlytics](http://www.slideshare.net/crashlytics/crashlytics-on-redis-analytics).

## Install

```shell
$ npm install redis-identity
```

## Usage

Pass in a node-redis client, and an optional key to use for the id mappings. The key will default to `identity-map`.

```javascript
var redis = require('redis')
  , client = redis.createClient()
  , identity = require('redis-identity')(client);

identity('xxx-123-456', function(err, id){
  // ...
});
```


```javascript
var redis = require('redis')
  , client = redis.createClient()
  , identity = require('redis-identity')(client, 'my-id-map');

identity('xxx-123-456', function(err, id){
  // ...
});
```

## TODO

  - script loading/caching with evalsha? not sure the upsides/downsides yet.

## License

MIT