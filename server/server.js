const express = require('express');
require('dotenv').config();
const connection = require('./connection');
const auth = require('./middelware/auth');

connection();
const app = express();
const port = 4000;
app.use(express.json());

const cors = require('cors');
app.use(cors());

const accountRoute = require('./Routers/accounts');

const { createNewAccounts } = require('./Controllers/accounts');
const { getBankHistory } = require('./Controllers/bankHistory'); // Import the getBankHistory controller

app.use('/accounts', accountRoute);
app.post('/accounts/create', createNewAccounts);
app.get('/bankhistory', getBankHistory); // Register the bank history route

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
