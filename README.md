# EasyDispatcher
A super easy dispatcher js for Node and javascript.

### Javascpript
Import inside HTML as usual.

    <script src="../lib/EasyDispatcher.js"></script>

### Nodejs
Use **require** to import the library

### Usage
Initialize the EasyDispatcher as follow:

    var easyDispatcher = new EasyDispatcher();

Attach an event

    easyDispatcher.on('event', function() { /* do something */ });

Trigger an event

    easyDispatcher.trigger('btn-clicked', ...])