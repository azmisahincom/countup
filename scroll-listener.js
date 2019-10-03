/*
    ████████████████████████████████████████████████████████████████████████████████████████████████████
    * Application: scroll-listener v0.0.0.1
    * https://gunessahin.github.io/
    ════════════════════════════════════════════════════════════════════════════════════════════════════
    * Copyright gunessahin@outlook.com.tr
    * Licence (https://github.com/gunessahin)
    ████████████████████████████████████████████████████████████████████████████████████████████████████
*/

var ScrollListener = function (element, callback) {
    this._el = element
    this._cb = callback
    this._at = false
    this._hasBeenVisible = false
    this._hasBeenInvisible = true
    var _me = this

    window.onscroll = function () {
        var q
        for (q in ScrollListener.queue.onvisible) {
            ScrollListener.queue.onvisible[q].call()
        }
        for (q in ScrollListener.queue.oninvisible) {
            ScrollListener.queue.oninvisible[q].call()
        }
    }

    return {
        onvisible: function () {
            ScrollListener.queue.onvisible.push(function () {
                if (!_me._at && _me._hasBeenInvisible && (window.pageYOffset + window.innerHeight) > _me._el.offsetTop && window.pageYOffset < (_me._el.offsetTop + _me._el.scrollHeight)) {
                    _me._cb.call()
                    _me._at = true
                    _me._hasBeenVisible = true
                }
            })
            ScrollListener.queue.oninvisible.push(function () {
                if (_me._hasBeenVisible && ((window.pageYOffset + window.innerHeight) < _me._el.offsetTop || window.pageYOffset > (_me._el.offsetTop + _me._el.scrollHeight))) {
                    _me._hasBeenInvisible = true
                    _me._hasBeenVisible = false
                    _me._at = false
                }
            })
        },
        oninvisible: function () {
            ScrollListener.queue.oninvisible.push(function () {
                if (!_me._at && _me._hasBeenVisible && ((window.pageYOffset + window.innerHeight) < _me._el.offsetTop || window.pageYOffset > (_me._el.offsetTop + _me._el.scrollHeight))) {
                    _me._cb.call()
                    _me._at = true
                    _me._hasBeenInvisible = true
                }
            })
            ScrollListener.queue.onvisible.push(function () {
                if (_me._hasBeenInvisible && (window.pageYOffset + window.innerHeight) > _me._el.offsetTop && window.pageYOffset < (_me._el.offsetTop + _me._el.scrollHeight)) {
                    _me._hasBeenVisible = true
                    _me._hasBeenInvisible = false
                    _me._at = false
                }
            })
        }
    }
}
ScrollListener.queue = {
    onvisible: [],
    oninvisible: []
}