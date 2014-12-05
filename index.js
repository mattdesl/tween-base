var noop = function(){}
var linear = require('eases/linear')
var EventEmitter = require('events').EventEmitter
var inherits = require('inherits')

function BaseTween(opt) {
    EventEmitter.call(this)
    this.target = null

    //users generally don't need to change these
    this.duration = (opt && opt.duration)||0
    this.delay = (opt && opt.delay)||0
    this.time = 0
    this.ease = opt && opt.ease
    this.active = true
    this.cancelling = false
    this._started = false
    
    if (opt && opt.onStart)
        this.on('start', opt.onStart)
    if (opt && opt.onComplete)
        this.on('complete', opt.onComplete)
    if (opt && opt.onUpdate)
        this.on('update', opt.onUpdate)
}

inherits(BaseTween, EventEmitter)

BaseTween.prototype.lerp = noop
BaseTween.prototype.prepare = noop

BaseTween.prototype.cancel = function() {
    this.cancelling = true
}

BaseTween.prototype.tick = function(dt, ease) {
    ease = typeof ease === 'function' ? ease : defaultEase

    if (this.cancelling && this.active) {
        this.active = false
        this.emit('cancelling', this)
        this.emit('complete', this)
    }

    if (!this.active)
        return

    var last = this.time
    this.time += dt
            
    var alpha = (this.time-this.delay) / this.duration
    if (this.time-this.delay > 0) {
        if (!this._started) {
            this._started = true
            this.ready()
            this.emit('start', this)
        }

        if (alpha < 0)
            alpha = 0
        else if (alpha > 1)
            alpha = 1
        alpha = ease(this, alpha)
        this.lerp(alpha)
        this.emit('update', this)
    }

    if (this.time >= (this.duration+this.delay)) {
        this.active = false
        this.emit('complete', this)
    }
}

function defaultEase(tween, alpha) {
    if (typeof tween.ease === 'function')
        return tween.ease(alpha)
    return linear(alpha)
}

module.exports = BaseTween