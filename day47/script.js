//davaleba1
const btn1 = document.getElementById('btn1');
const btn2 = document.getElementById('btn2');
const photo = document.getElementById('photo');


btn1.addEventListener('click', function() {
  photo.style.width = '300px';
  alert('Photo width set to 300');
});

btn2.addEventListener('click', function() {
  photo.style.width = '500px';
  alert('Photo width set to 500')});
  
  
  //davaleba2
const num1 = 10;
const num2 = 20;

console.log("Sum of num1 and num2:", num1 + num2);
