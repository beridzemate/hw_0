const calculator = {
    addition: function(x, y) {
        return x + y;
    },
    subtraction: function(x, y) {
        return x - y;
    },
    multiplication: function(x, y) {
        return x * y;
    },
    division: function(x, y) {
        if (y === 0) {
            return "Error: Division by zero!";
        } else {
            return x / y;
        }
    },
    average: function(x, y) {
        return (x + y) / 2;
    }
};

console.log("Addition: " + calculator.addition(5, 3));
console.log("Subtraction: " + calculator.subtraction(10, 4));
console.log("Multiplication: " + calculator.multiplication(6, 7));
console.log("Division: " + calculator.division(20, 4));
console.log("Average: " + calculator.average(8, 12));
