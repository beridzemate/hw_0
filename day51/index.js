//first hw
let myName = "mate"
let myLastname = "beridze"
let myCity = "batumi"
let mySchool = "10 public"


console.log(myName, myCity, myLastname, mySchool);



//second hw
let mother = {
    firstName: "Natalia",
    lastName: "Kharchenko",
    age: 35
};

let father = {
    firstName: "Nugzar",
    lastName: "Beridze",
    age: 37
};

console.log("Mother:");
console.log("First Name:", mother.firstName);
console.log("Last Name:", mother.lastName);
console.log("Age:", mother.age);

console.log("\nFather:");
console.log("First Name:", father.firstName);
console.log("Last Name:", father.lastName);
console.log("Age:", father.age);




//third hw

console.log("Original values of the first task object:");
console.log("First Name:", mother.firstName);
console.log("Last Name:", mother.lastName);
console.log("Age:", mother.age);

mother.firstName = "NewFirstName";
mother.lastName = "NewLastName";
mother.age = 50;


console.log("\nUpdated values of the first task object:");
console.log("First Name:", mother.firstName);
console.log("Last Name:", mother.lastName);
console.log("Age:", mother.age);


//fourth hw
let father1 = {
    firstName: "Nugzar",
    lastName: "Beridze",
    age: 48
};

let mother1 = {
    firstName: "Natalia",
    lastName: "Kharchenko",
    age: 45
};


console.log("Are the two objects equal?", father1 == mother1);



//fifth hw
let weatherForecast = {
    location: "New York City",
    temperature: "68°F",
    timeLength: "24 hours",
    weather: "Partly cloudy",
    conditions: "Mild with a chance of showers in the evening"
};

console.log("Weather Forecast for", weatherForecast.location);
console.log("Temperature:", weatherForecast.temperature);
console.log("Time Length:", weatherForecast.timeLength);
console.log("Weather:", weatherForecast.weather);
console.log("Conditions:", weatherForecast.conditions);
