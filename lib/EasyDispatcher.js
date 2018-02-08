var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

;(function (root) {
    'use strict';

    /**
     * A easy event Dispatcher
     */

    var EasyDispatcher = function EasyDispatcher() {
        var _this = this;

        var handlers = {};

        /**
         * Attach an handler to an 'event'
         *
         * @param {string} event the 'event' to subscribe
         * @param {function} handler the handler to attach to the event
         */
        var on = function on(event, handler) {
            if (handler && typeof handler === 'function') {
                if (!handlers[event]) {
                    handlers[event] = [];
                }
                handlers[event].push(handler);
            }
        };

        /**
         * Detach  an handler to an 'event'
         *
         * @param {string} event the 'event' to unsubscribe
         * @param {function} handler the handler to detach
         */
        var off = function off(event, handler) {
            var eventHandlers = getEventHandlers(event);

            if (eventHandlers.length > 0) {
                var idx = eventHandlers.findIndex(function (el) {
                    return Object.is(el, handler);
                });
                if (idx !== -1) {
                    eventHandlers.splice(idx, 1);
                    handlers[event] = eventHandlers;
                }
            }
        };

        /**
         * Trigger an event
         *
         * Call each subscribed handlers
         *
         * @param {string|Array} event the event or the events to trigger. Input could be a string or an array.
         * @param {*} params the params to send to the handler
         */
        var trigger = function trigger(event) {
            for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                params[_key - 1] = arguments[_key];
            }

            var eventsList = Array.isArray(event) ? event : [event];
            var eventsHandlers = [];

            eventsList.forEach(function (ev) {
                eventsHandlers.push.apply(eventsHandlers, _toConsumableArray(getEventHandlers(ev)));
            });

            // call each handler as soon as possible
            eventsHandlers.forEach(function (handler) {
                setTimeout(function () {
                    // Don't care about the result
                    try {
                        handler.apply(undefined, params);
                    } catch (ex) {
                        console.warn(ex);
                    }
                }, 0);
            }, _this);
        };

        /**
         * Return all the handlers attached to the event
         *
         * @param {string} event the 'event' to get
         */
        var getEventHandlers = function getEventHandlers(event) {
            var eventHandlers = [];
            if (handlers.hasOwnProperty(event)) {
                eventHandlers.push.apply(eventHandlers, _toConsumableArray(handlers[event]));
            }
            return eventHandlers;
        };

        /**
         * Exports
         */
        return {
            on: on,
            off: off,
            trigger: trigger,
            getEventHandlers: getEventHandlers
        };
    };

    // Export to the global object
    if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object' && typeof exports.nodeName !== 'string') {
        module.exports = EasyDispatcher;
    } else if (root) {
        root.EasyDispatcher = EasyDispatcher;
    }
})(this);