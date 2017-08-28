var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

;(function (root) {
    'use strict';

    var EasyDispatcher = function EasyDispatcher() {
        var _this = this;

        var handlers = {};

        /**
         * Attach an handler to an 'event'
         *
         * @param {string} type the event 'type' to subscribe
         * @param {function} handler the handler to attach to the event
         */
        var on = function on(type, handler) {
            if (handler && typeof handler === 'function') {
                if (!handlers[type]) {
                    handlers[type] = [];
                }
                handlers[type].push(handler);
            }
        };

        var off = function off() {};

        /**
         *
         * @param {string} type
         * @param {*} payload
         * @param {*} params
         */
        var trigger = function trigger(type, payload) {
            for (var _len = arguments.length, params = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                params[_key - 2] = arguments[_key];
            }

            var types = Array.isArray(type) ? type : [type];
            var typeHandlers = [];

            types.forEach(function (t) {
                if (handlers.hasOwnProperty(t)) {
                    typeHandlers.push.apply(typeHandlers, _toConsumableArray(handlers[t]));
                }
            });

            typeHandlers.forEach(function (handler) {
                handler.apply(undefined, [payload].concat(params));
            }, _this);
        };

        /**
         * Exports
         */
        return {
            on: on,
            off: off,
            trigger: trigger
        };
    };

    // Export to the global object
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof exports.nodeName !== 'string') {
        module.exports = EasyDispatcher;
    } else if (root) {
        root.EasyDispatcher = EasyDispatcher;
    }
})(this);