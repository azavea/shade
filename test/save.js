var fs = require('fs');
var path = require('path');
var test = require('tape');
var temp = require('temp');
var shade = require('../index.js');

test('saves a string to key file in nested directories', function (t) {
    t.plan(5);
    temp.mkdir('shade-test', function(err, dir) {
        shade(dir, function(err, db) {
            var content = 'a string';
            var expectedKey = '555d01e6';
            var expectedKeyPath = path.join(dir, '55', '5d', '01', 'e6', expectedKey);
            db.save(content, function(err, key){
                t.error(err, 'saves without an error');
                t.equals(key, expectedKey, 'returns a key for the content');
                fs.exists(expectedKeyPath, function (exists) {
                    t.ok(exists, 'creates file in nested directories for key');
                    fs.readFile(expectedKeyPath, function(err, data){
                        t.error(err, 'key file read without an error');
                        t.equals(data.toString(), content, 'content was saved to the file');
                    });
                });
            });
        });
    });
});

test('does not throw if a callback is not supplied', function (t) {
    t.plan(1);
    temp.mkdir('shade-test', function(err, dir) {
        shade(dir, function(err, db) {
            t.doesNotThrow(function () {
                db.save('a string');
            });
        });
    });
});

test('does not throw when saving unsupported type', function (t) {
    t.plan(1);
    temp.mkdir('shade-test', function(err, dir) {
        shade(dir, function(err, db) {
            t.doesNotThrow(function () {
                db.save({an: 'unsupported object'});
            });
        });
    });
});

test('returns an err when saving unsupported type', function (t) {
    t.plan(1);
    temp.mkdir('shade-test', function(err, dir) {
        shade(dir, function(err, db) {
            db.save({an: 'unsupported object'}, function (err) {
                t.ok(err);
            });
        });
    });
});