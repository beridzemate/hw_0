const express = require('express');
const app = express();
app.use(express.json());

let accounts = [];

app.post('/create-account', (req, res) => {
  const { name, balance } = req.body;
  const account = { id: accounts.length + 1, name, balance };
  accounts.push(account);
  res.status(201).send(account);
});

app.post('/transfer', (req, res) => {
  const { from, to, amount } = req.body;
  const fromAccount = accounts.find(acc => acc.id === from);
  const toAccount = accounts.find(acc => acc.id === to);

  if (fromAccount && toAccount && fromAccount.balance >= amount) {
    fromAccount.balance -= amount;
    toAccount.balance += amount;
    res.send({ from: fromAccount, to: toAccount });
  } else {
    res.status(400).send('Invalid transaction');
  }
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
