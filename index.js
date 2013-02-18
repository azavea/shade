var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var mkdirp = require('mkdirp');

var Store = function(path) {
    this.path = path;
};

Store.prototype.save = function(thing, cb) {
    var sha1, key, keyDir, keyPath;
    try {
        sha1 = crypto.createHash('sha1');
        sha1.update(thing);
        key = sha1.digest('hex').substring(0,8);
        keyDir = path.join(
            this.path,
            key.substring(0,2),
            key.substring(2,4),
            key.substring(4,6),
            key.substring(6,8)
        );
        keyPath = path.join(keyDir, key);
        mkdirp(keyDir, function(err) {
            if (!err) {
                fs.writeFile(keyPath, thing, function(err) {
                    if (cb) { cb(err, key); }
                });
            } else {
                if (cb) { cb(err, undefined); }
            }
        });
    } catch(err) {
        if (cb) { cb(err, undefined); }
    }
};

exports = module.exports = function(p, cb) {
    if (!cb) { return; }
    mkdirp(p, function(err) {
        cb(err, new Store(p));
    });
};