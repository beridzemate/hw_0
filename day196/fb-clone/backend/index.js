const express = require('express');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const cors = require('cors');
const PORT = 3000;
app.use(cors());


let accounts = []
let posts = []


app.post('/register', (req, res) => {
    const  {email, name, password} = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('Invalid input');
    }
    const accountsExist = accounts.find(account => account.email === email);
    if (accountsExist) {
    return res.status(400).json('Account already exists');}
    
    const newAccount = {
        email,
        password
     }
    accounts.push(newAccount);
    res.status(200).json('Account created successfully');
});




app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})