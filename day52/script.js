//first hw

function infoJoin(firstName, lastName, age, residence, hobby) {
    return `My name is ${firstName} ${lastName}. I am ${age} years old and I live in ${residence}. My hobby is ${hobby}.`;
}

let firstName = "Mate";
let lastName = "Beridze";
let age = 14;
let residence = "Your City";
let hobby = "coding and learning programming";

let info = infoJoin(firstName, lastName, age, residence, hobby);
console.log(info);
//second hw


function ageCheck(age) {
    if (age > 18) {
        console.log(`${age} is greater than 18.`);
    } else if (age < 18) {
        console.log(`${age} is less than 18.`);
    } else {
        console.log(`${age} is equal to 18.`);
    }
}

ageCheck(20);
ageCheck(15);
ageCheck(18);