//Function declarations and Arrow Functions
//1
function sum(a, b) {
    return a + b;
  }
//2
function reverseString(str) {
    return str.split('').reverse().join('');
  }

//3
function isEven(num) {
    return num % 2 === 0;
  }

//4
const arrayLength = arr => arr.length;

//5
const rectangleArea = (width, height) => width * height;

//6
function doubleArray(arr) {
    return arr.map(num => num * 2);
}

//7
function toUpperCase(str) {
    return str.toUpperCase();
}


//8
const filterOdds = arr => arr.filter(num => num % 2 === 0);

//9
function factorial(num) {
    if (num === 0) return 1;
    return num * factorial(num - 1);
}


//10
const countVowels = str => {
    const vowels = 'aeiouAEIOU';
    return str.split('').filter(char => vowels.includes(char)).length;
};


//Template Literals:

//1
const name = 'mate';
const greeting = `Hello, ${name}!`;
console.log(greeting); 

//2
const multilineString = `This is a string
that spans across multiple
lines.`;
console.log(multilineString);

//3
const a = 5;
const b = 10;
const sumMessage = `The sum of ${a} and ${b} is ${a + b}.`;
console.log(sumMessage);  

//4
const day = 26;
const month = 'July';
const year = 2024;
const formattedDate = `Today's date is ${day} ${month} ${year}.`;
console.log(formattedDate);  


//5
const protocol = 'https';
const domain = 'google.com';
const path = 'path/to/google';
const url = `${protocol}://${domain}/${path}`;
console.log(url);  

//6
const isLoggedIn = true;
const loginStatus = `User is ${isLoggedIn ? 'logged in' : 'logged out'}.`;
console.log(loginStatus); 

//7
const street = 'javakhishvili';
const city = 'batumi';
const zip = '6000';
const address = `Address: ${street}, ${city}, ${zip}`;
console.log(address);


//8 
const content = 'Welcome to my website!';
const html = `<html>
<head><title>My Website</title></head>
<body>
  <h1>${content}</h1>
</body>
</html>`;
console.log(html);


//9
const items = ['Apple', 'Banana', 'Cherry'];
const listHTML = `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
console.log(listHTML);  

//10
function getGreeting(name) {
    return `Hello, ${name}!`;
  }
  const userName = 'mate';
  const greetingMessage = `${getGreeting(userName)} welcome to the site.`;
  console.log(greetingMessage);  
  

//Short Conditionals


//1
const isLoggedIn1 = true;
isLoggedIn1 && console.log('User is logged in.');


//2
const userName1 = '';
const displayName = userNam0e1 || 'Guest';
console.log(displayName);  

//3
const age = 18;
const status = age >= 18 ? 'Adult' : 'Minor';
console.log(status);  


//4
const user = { name: 'mate ' };
user && console.log(`User's name is ${user.name}.`);


//5






