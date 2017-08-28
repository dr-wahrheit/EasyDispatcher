;(function(root) {
    'use strict'

    const EasyDispatcher = function() {
        const handlers = {};

        /**
         * Attach an handler to an 'event'
         *
         * @param {string} type the event 'type' to subscribe
         * @param {function} handler the handler to attach to the event
         */
        const on = (type, handler) => {
            if (handler && typeof handler === 'function') {
                if (!handlers[type]) {handlers[type] = []; }
                handlers[type].push(handler);
            }
        };


        const off = () => {

        };


        /**
         *
         * @param {string} type
         * @param {*} payload
         * @param {*} params
         */
        const trigger = (type, payload, ...params) => {
            const types = Array.isArray(type) ? type : [ type ];
            const typeHandlers = [];

            types.forEach(t => {
                if (handlers.hasOwnProperty(t)) {
                    typeHandlers.push(...handlers[t]);
                }
            });

            typeHandlers.forEach(handler => {
                handler(payload, ...params);
            }, this);
        }


        /**
         * Exports
         */
        return {
            on: on,
            off: off,
            trigger: trigger
        }
    };

    // Export to the global object
    if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        module.exports = EasyDispatcher;
    } else if(root) {
        root.EasyDispatcher = EasyDispatcher;
    }

})(this);
