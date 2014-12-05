var base = require('../')
var array = require('./array')
var test = require('tape').test

test("a basic tween object for others to build on", function(t) {
    var start = [10, 20],
        end = [0, 10]

    t.plan(6)

    var tween = array(start, end, { duration: 1})
    tween
        .on('cancelling', function(ev) {
            t.equal(ev.target, start, 'got cancelling')
        })
        .on('update', function(ev) {
            t.equal(ev.target, start, 'got update')
        })
        .on('start', function(ev) {
            t.equal(ev.target, start, 'got start')
        })
        .on('complete', function(ev) {
            t.equal(ev.target, start, 'got complete')
        })

    tween.tick(0.25)
    t.deepEqual(start, [7.5, 17.5], 'tweens array')
    tween.cancel()
    tween.tick(0.25)
    t.deepEqual(start, [7.5, 17.5], 'stops tweening array')
})