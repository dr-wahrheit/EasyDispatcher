describe('EasyDispatcher test', function () {
    describe('#on()', function() {
        it('attach an event', function () {
            var easyDispatcher = new EasyDispatcher();
            var eventCode = 'pippo';

            var eventHandlers = easyDispatcher.getEventHandlers('pippo')
            expect(eventHandlers.length).to.be(0);
            easyDispatcher.on(eventCode, function() {});

            eventHandlers = easyDispatcher.getEventHandlers('pippo')
            expect(eventHandlers.length).to.be(1);

        });
    });


    describe('#trigger()', function() {

        it('single event type', function () {
            var easyDispatcher = new EasyDispatcher();
            var eventCode = 'pippo';

            easyDispatcher.on(eventCode, function(payload) {
                expect(payload).to.be('payload');
            });

            easyDispatcher.trigger(eventCode, 'payload');
        });


        it('multiple event type', function () {
            var easyDispatcher = new EasyDispatcher();
            var eventCodes = ['pippo', 'pluto'];

            easyDispatcher.on('pippo', function(payload) {
                expect(payload).to.be('payload');
            });

            easyDispatcher.on('pluto', function(payload) {
                expect(payload).to.be('payload');
            });

            easyDispatcher.trigger(eventCodes, 'payload');
        });


        it('single event type with params', function () {
            var easyDispatcher = new EasyDispatcher();
            var eventCode = 'pippo';
            var p1 = {}

            easyDispatcher.on(eventCode, function() {
                expect(arguments.length).to.be(3);

                var arg0 = arguments[0];
                expect(arg0).to.be('payload');

                var arg1 = arguments[1];
                expect(Object.is(arg1, p1)).to.be(true);

                var arg2 = arguments[2];
                expect(arg2).to.be(false);
            });

            easyDispatcher.trigger(eventCode, 'payload', p1, false);
        });


        it('multiple event type with params', function () {
            var easyDispatcher = new EasyDispatcher();
            var eventCodes = ['pippo', 'pluto'];
            var p1 = {}

            easyDispatcher.on('pippo', function() {
                expect(arguments.length).to.be(3);

                var arg0 = arguments[0];
                expect(arg0).to.be('payload');

                var arg1 = arguments[1];
                expect(Object.is(arg1, p1)).to.be(true);

                var arg2 = arguments[2];
                expect(arg2).to.be(false);
            });

            easyDispatcher.on('pluto', function() {
                expect(arguments.length).to.be(3);

                var arg0 = arguments[0];
                expect(arg0).to.be('payload');

                var arg1 = arguments[1];
                expect(Object.is(arg1, p1)).to.be(true);

                var arg2 = arguments[2];
                expect(arg2).to.be(false);
            });

            easyDispatcher.trigger(eventCodes, 'payload', p1, false);
        });

    });


    describe('#off()', function() {
        it('detach an event', function () {
            var easyDispatcher = new EasyDispatcher();
            var eventCode = 'pippo';
            var eventFn = function() {};

            var eventHandlers = easyDispatcher.getEventHandlers(eventCode)
            expect(eventHandlers.length).to.be(0);

            easyDispatcher.on(eventCode, eventFn);
            eventHandlers = easyDispatcher.getEventHandlers(eventCode)
            expect(eventHandlers.length).to.be(1);

            easyDispatcher.off(eventCode, eventFn);
            eventHandlers = easyDispatcher.getEventHandlers(eventCode)
            expect(eventHandlers.length).to.be(0);
        });
    });




});

