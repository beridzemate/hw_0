let count = 0;

document.getElementById('increment').addEventListener('click', () => {

  count++;

  document.getElementById('count').innerText = count;
});

document.getElementById('decrement').addEventListener('click', () => {
  
  count--;
  
  document.getElementById('count').innerText = count;
});
