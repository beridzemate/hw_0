const os = require('os');
const process = require('process');
const EventEmitter = require('events');

console.log('Operating System Type:', os.type());
console.log('OS Release Version:', os.release());
console.log('Total Memory:', os.totalmem());
console.log('Free Memory:', os.freemem());

const uptime = os.uptime();
const hours = Math.floor(uptime / 3600);
const minutes = Math.floor((uptime % 3600) / 60);
const seconds = uptime % 60;
console.log(`System Uptime: ${hours}h ${minutes}m ${seconds}s`);

console.log('Environment Variables:', process.env);
console.log('PATH Variable:', process.env.PATH);

const usage = process.memoryUsage();
console.log('Memory Usage:', usage);
console.log('CPU Usage:', process.cpuUsage());

const eventEmitter = new EventEmitter();
eventEmitter.on('greet', () => {
    console.log('Hello, world!');
});
eventEmitter.emit('greet');

eventEmitter.on('greetWithData', (message) => {
    console.log('Greeting:', message);
});
eventEmitter.emit('greetWithData', 'Hello, with data!');

eventEmitter.on('start', () => {
    console.log('Start event triggered');
});
eventEmitter.on('stop', () => {
    console.log('Stop event triggered');
});
eventEmitter.emit('start');
eventEmitter.emit('stop');

console.log('Number of listeners for greet:', eventEmitter.listenerCount('greet'));

const listenerToRemove = () => {
    console.log('This listener will be removed');
};
eventEmitter.on('removeMe', listenerToRemove);
eventEmitter.on('removeMe', () => {
    console.log('Another listener');
});
console.log('Number of listeners for removeMe before removal:', eventEmitter.listenerCount('removeMe'));
eventEmitter.removeListener('removeMe', listenerToRemove);
console.log('Number of listeners for removeMe after removal:', eventEmitter.listenerCount('removeMe'));
