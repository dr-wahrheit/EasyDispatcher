describe('EasyDispatcher test', function () {
    // describe('#on()', function() {
    //     it('should be successful', function () {
    //         var easyDispatcher = new EasyDispatcher();

    //         expect(easyDispatcher.ping()).to.be('pong');
    //     });
    // });


    describe('#trigger()', function() {

        it('single event type', function () {
            var easyDispatcher = new EasyDispatcher();
            var eventCode = 'pippo';

            easyDispatcher.on(eventCode, function(payload) {
                expect(payload).to.be('payload');
            });

            easyDispatcher.trigger(eventCode, 'payload', {}, false);
        });


        it('multiple event type', function () {
            var easyDispatcher = new EasyDispatcher();
            var eventCodes = ['pippo', 'pluto'];

            easyDispatcher.on('pippo', function(payload) {
                expect(payload).to.be('payload');
            });

            easyDispatcher.on('pluto', function(payload) {
                console.log(arguments)
                expect(payload).to.be('payload');
            });

            easyDispatcher.trigger(eventCodes, 'payload', {}, false);
        });
    });




});

