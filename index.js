var path = require('path');
var mkdirp = require('mkdirp');

var Store = function(path) {
    this.path = path;
};

exports = module.exports = function(p, cb) {
    mkdirp(p, function(err) {
        cb(err, new Store(p));
    });
};