var Base = require('../')
var inherits = require('inherits')
var lerp = require('lerp-array')

module.exports = function(target, end, opt) {
    return new ArrayTween(target, end, opt)
}

function ArrayTween(target, end, opt) {
    Base.call(this, opt)
    this.target = target
    this.start = this.target
    this.end = end
}

inherits(ArrayTween, Base)

ArrayTween.prototype.ready = function() {
    if (this.start === this.target) {
        this.start = this.target.slice()
    }
}

ArrayTween.prototype.lerp = function(alpha) {
    lerp(this.start, this.end, alpha, this.target)
}
