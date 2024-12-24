const readline = require('readline');
const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('customEvent', (data) => {
    console.log(`Custom event triggered with data: ${data}`);
});

myEmitter.emit('customEvent', 'Hello, World!');

myEmitter.on('multiListenerEvent', () => {
    console.log('Listener 1 triggered');
});
myEmitter.on('multiListenerEvent', () => {
    console.log('Listener 2 triggered');
});
myEmitter.emit('multiListenerEvent');

const listenerToRemove = () => {
    console.log('This listener will be removed');
};
myEmitter.on('removeListenerEvent', listenerToRemove);
myEmitter.removeListener('removeListenerEvent', listenerToRemove);
myEmitter.emit('removeListenerEvent');

myEmitter.once('onceEvent', () => {
    console.log('This will only trigger once');
});
myEmitter.emit('onceEvent');
myEmitter.emit('onceEvent');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.setPrompt('Enter input: ');
rl.prompt();
rl.on('line', (input) => {
    console.log(`You entered: ${input}`);
    rl.prompt();
});

rl.on('line', (input) => {
    if (input.trim() === 'exit') {
        rl.close();
    } else {
        console.log(`You entered: ${input}`);
        rl.prompt();
    }
});

rl.question('Enter first number: ', (num1) => {
    rl.question('Enter second number: ', (num2) => {
        rl.question('Enter operator (+, -, *, /): ', (operator) => {
            const n1 = parseFloat(num1);
            const n2 = parseFloat(num2);
            let result;
            switch (operator) {
                case '+':
                    result = n1 + n2;
                    break;
                case '-':
                    result = n1 - n2;
                    break;
                case '*':
                    result = n1 * n2;
                    break;
                case '/':
                    result = n1 / n2;
                    break;
                default:
                    console.log('Invalid operator');
                    rl.close();
                    return;
            }
            console.log(`Result: ${result}`);
            rl.close();
        });
    });
});

rl.on('line', (input) => {
    console.log(input.toUpperCase());
    rl.prompt();
});

const progressBar = (total) => {
    let progress = 0;
    const interval = setInterval(() => {
        progress += 1;
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(`Progress: [${'#'.repeat(progress)}${' '.repeat(total - progress)}] ${progress * 10}%`);
        if (progress >= total) {
            clearInterval(interval);
            console.log('\nDone!');
        }
    }, 100);
};

progressBar(10);
