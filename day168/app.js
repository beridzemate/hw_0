const os = require('os');

console.log('Command-line arguments:', process.argv);
console.log('Current working directory:', process.cwd());
console.log('Operating System:', os.type());
console.log('Platform:', os.platform());
console.log('Memory usage of current process:', process.memoryUsage());
console.log('Environment variables:', process.env);
console.log('Total system memory:', os.totalmem());
console.log('Free system memory:', os.freemem());
console.log('Node.js version:', process.version);
console.log('Script execution path:', process.argv[1]);
console.log('CPU architecture:', os.arch());
console.log('System uptime:', os.uptime(), 'seconds');
console.log('Process uptime:', process.uptime(), 'seconds');

if (process.argv.length === 5) {
    const firstNumber = parseFloat(process.argv[2]);
    const operator = process.argv[3];
    const secondNumber = parseFloat(process.argv[4]);

    let result;

    switch (operator) {
        case '+':
            result = firstNumber + secondNumber;
            break;
        case '-':
            result = firstNumber - secondNumber;
            break;
        case '*':
            result = firstNumber * secondNumber;
            break;
        case '/':
            if (secondNumber !== 0) {
                result = firstNumber / secondNumber;
            } else {
                console.log('Error: Division by zero');
                process.exit(1);
            }
            break;
        case '%':
            result = firstNumber % secondNumber;
            break;
        default:
            console.log('Error: Invalid operator. Use +, -, *, /, or %');
            process.exit(1);
    }

    console.log(`Result: ${firstNumber} ${operator} ${secondNumber} = ${result}`);
} else {
    console.log('Usage: node system-info-and-calculator.js <first-number> <operator> <second-number>');
    console.log('Example: node system-info-and-calculator.js 5 + 3');
}
