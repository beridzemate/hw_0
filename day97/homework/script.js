//1
fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))
//2
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => console.log(data));

//3
fetch('https://invalid.url')
  .then(response => response.json())
  .catch(error => console.error('Error:', error));


//4
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
  .finally(() => console.log('Fetch request completed.'));

//6
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => {
    console.log('Title:', data.title);
    return data;
  })
  .then(data => {
    console.log('Body:', data.body);
  });

//8
setTimeout(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
  }, 3000);
  

//9
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => {
    setTimeout(() => {
      console.log(data);
    }, 3000);
  })
  .catch(error => console.error('Error:', error));


//10
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => {
    console.log('First fetch:', data);
    return new Promise(resolve => setTimeout(resolve, 3000));
  })
  .then(() => fetch('https://jsonplaceholder.typicode.com/posts/2'))
  .then(response => response.json())
  .then(data => console.log('Second fetch:', data))
  .catch(error => console.error('Error:', error));

//11
fetch('https://invalid.url')
  .then(response => response.json())
  .catch(error => {
    setTimeout(() => {
      console.error('Error:', error);
    }, 3000);
  });

//12
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error))
  .finally(() => {
    setTimeout(() => {
      console.log('Fetch request completed.');
    }, 3000);
  });


//13
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => response.json())
  .then(data => {
    setTimeout(() => {
      alert(`Title: ${data.title}`);
    }, 3000);
  })
  .catch(error => console.error('Error:', error));

