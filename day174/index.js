const EventEmitter = require('events');

const eventEmitter = new EventEmitter();

eventEmitter.on('start', () => {
    console.log('The start event has occurred.');
});
eventEmitter.emit('start');

eventEmitter.on('userJoined', (name) => {
    console.log(`Welcome, ${name}!`);
});
eventEmitter.emit('userJoined', 'Alice');

eventEmitter.on('newOrder', (order) => {
    console.log(`Order received: ${order}`);
});
eventEmitter.on('newOrder', (order) => {
    console.log(`Sending email for order: ${order}`);
});
eventEmitter.on('newOrder', (order) => {
    console.log(`Updating inventory for order: ${order}`);
});
eventEmitter.emit('newOrder', 'Order #1234');

eventEmitter.once('shutdown', () => {
    console.log('Shutdown event occurred. Listener will be removed.');
});
eventEmitter.emit('shutdown');
eventEmitter.emit('shutdown');

eventEmitter.on('fileRead', (err) => {
    if (err) {
        console.error(`Error reading file: ${err.message}`);
    } else {
        console.log('File read successfully.');
    }
});

eventEmitter.emit('fileRead', new Error('File not found'));
