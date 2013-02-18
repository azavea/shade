var fs = require('fs');
var path = require('path');
var test = require('tape');
var temp = require('temp');
var shade = require('../index.js');

test('creates a directory', function (t) {
    t.plan(3);
    temp.mkdir('shade-test', function(err, tmpdir){
        t.error(err, 'temp dir created for the test');
        var dir = path.join(tmpdir, 'deep', 'shade');
        shade(dir, function (err, db) {
            t.error(err, 'shade created without an error');
            fs.exists(dir, function (exists) {
                t.ok(exists, 'shade directory exists');
            });
        });
    });
});

test('returns a db with a path property', function (t) {
    t.plan(2);
    temp.mkdir('shade-test', function(err, dir) {
        shade(dir, function(err, db) {
            t.ok(db, 'truthy db passed to callback');
            t.equals(db.path, dir, 'db.path property matches argument');
        });
    });
});
