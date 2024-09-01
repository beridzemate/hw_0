document.getElementById('create-account-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const name = document.getElementById('account-name').value;
    const balance = document.getElementById('initial-balance').value;
  
    try {
      const response = await fetch('/create-account', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, balance }),
      });
  
      const data = await response.json();
      alert(`Account created: ${JSON.stringify(data)}`);
    } catch (error) {
      alert('Error creating account');
    }
  });
  
  document.getElementById('transfer-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const from = document.getElementById('from-account').value;
    const to = document.getElementById('to-account').value;
    const amount = document.getElementById('amount').value;
  
    try {
      const response = await fetch('/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ from, to, amount }),
      });
  
      const data = await response.json();
      alert(`Transfer successful: ${JSON.stringify(data)}`);
    } catch (error) {
      alert('Error transferring money');
    }
  });
  