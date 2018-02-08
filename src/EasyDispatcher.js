;(function(root) {
    'use strict'

    /**
     * A easy event Dispatcher
     */
    const EasyDispatcher = function() {
        const handlers = {};

        /**
         * Attach an handler to an 'event'
         *
         * @param {string} event the 'event' to subscribe
         * @param {function} handler the handler to attach to the event
         */
        const on = (event, handler) => {
            if (handler && typeof handler === 'function') {
                if (!handlers[event]) {handlers[event] = []; }
                handlers[event].push(handler);
            }
        };


        /**
         * Detach  an handler to an 'event'
         *
         * @param {string} event the 'event' to unsubscribe
         * @param {function} handler the handler to detach
         */
        const off = (event, handler) => {
            const eventHandlers = getEventHandlers(event);

            if (eventHandlers.length > 0) {
                const idx = eventHandlers.findIndex(el => Object.is(el, handler));
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
        const trigger = (event, ...params) => {
            const eventsList = Array.isArray(event) ? event : [ event ];
            const eventsHandlers = [];

            eventsList.forEach(ev => {
                eventsHandlers.push(...getEventHandlers(ev));
            });

            // call each handler as soon as possible
            eventsHandlers.forEach(handler => {
                setTimeout(() => {
                    // Don't care about the result
                    try {
                        handler(...params)
                    }
                    catch(ex) {
                        console.warn(ex);
                    }
                }, 0);
            }, this);
        }


        /**
         * Return all the handlers attached to the event
         *
         * @param {string} event the 'event' to get
         */
        const getEventHandlers = (event) => {
            const eventHandlers = [];
            if (handlers.hasOwnProperty(event)) {
                eventHandlers.push(...handlers[event]);
            }
            return eventHandlers;
        }


        /**
         * Exports
         */
        return {
            on: on,
            off: off,
            trigger: trigger,
            getEventHandlers: getEventHandlers
        }
    };

    // Export to the global object
    if (typeof exports === 'object' && typeof exports.nodeName !== 'string') {
        module.exports = EasyDispatcher;
    } else if(root) {
        root.EasyDispatcher = EasyDispatcher;
    }

})(this);
