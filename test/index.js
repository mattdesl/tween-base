var Base = require('../')
var inherits = require('inherits')

module.exports = function(target, end, opt) {
    return new TimelineTween(target, end, opt)
}

function TimelineTween(target, end, opt) {
    Base.call(this, opt)
    this.target = target
    this.start = this.target
    this.end = end
}

inherits(TimelineTween, Base)

TimelineTween.prototype.ready = function() {
    if (this.start === this.target) {
        this.start = this.target.slice()
    }
}

TimelineTween.prototype.lerp = function(alpha) {
    lerp(this.start, this.end, alpha, this.target)
}
