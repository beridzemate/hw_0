
//pirveli davaleba
const previousButton = document.getElementById('previous-btn');
const nextButton = document.getElementById('next-btn');
const galleryImage = document.getElementById('gallery-image');

const images = ['image1.jpg', 'image2.jpg'];
let currentIndex = 0;

previousButton.onclick = () => {
  currentIndex = (currentIndex - 1 + images.length) % images.length;
  galleryImage.src = 'images/' + images[currentIndex];
};

nextButton.onclick = () => {
  currentIndex = (currentIndex + 1) % images.length;
  galleryImage.src = 'images/' + images[currentIndex];
};

//meore davaleba


const pi = 3.14;
const radius = 10;


const area = pi * (radius * radius);
const circumference = 2 * pi * radius;
//mesame davaleba


let ricxvi1 = 20;
let ricxvi2 = 15;

console.log("Area of the circle:", area);
console.log("Circumference of the circle:", circumference);
console.log("Number 1:", ricxvi1);
console.log("Number 2:", ricxvi2);
console.log("Is ricxvi1 greater than ricxvi2?", ricxvi1 > ricxvi2);
console.log("Is ricxvi1 greater than or equal to ricxvi2?", ricxvi1 >= ricxvi2);
console.log("Is ricxvi1 less than ricxvi2?", ricxvi1 < ricxvi2);
console.log("Is ricxvi1 less than or equal to ricxvi2?", ricxvi1 <= ricxvi2);
console.log("Is ricxvi1 equal to ricxvi2?", ricxvi1 == ricxvi2);
console.log("Is ricxvi1 not equal to ricxvi2?", ricxvi1 != ricxvi2);

//meotxe davaleba

const bookTitle = "To Kill a Mockingbird";
const totalPages = 281;


console.log(`The book "${bookTitle}" has ${totalPages} pages.`);



//mexute davaleba


const number1 = 20;
const number2 = 7;

console.log("Number 1:", number1);
console.log("Number 2:", number2);

console.log("Addition:", number1 + number2);
console.log("Subtraction:", number1 - number2);
console.log("Multiplication:", number1 * number2);
console.log("Division:", number1 / number2);
console.log("Remainder (Modulo):", number1 % number2);
console.log("Integer Division (Floor Division):", Math.floor(number1 / number2));

