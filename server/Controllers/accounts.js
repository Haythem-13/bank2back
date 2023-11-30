const mongoose = require("mongoose");
const bcrypt= require("bcrypt");
require('dotenv').config();
const jwt = require('jsonwebtoken');
const BankOperation = require("../models/bankoperations");
const Accounts = require("../models/accounts"); 

const createNewAccounts = async (req, res) => {
  try {
    const { username, email, password, salary } = req.body;

    const existingUsername = await Accounts.findOne({ username });
    const existingEmail = await Accounts.findOne({ email });

    if (existingUsername) {
      res.status(400).send({ msg: 'Username is already used' });
    } else if (existingEmail) {
      res.status(400).send({ msg: 'Email is already used' });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await Accounts.create({
        username,
        email,
        salary,
        password: hashedPassword,
      });

      res.send({ msg: 'Account successfully created', newUser });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ msg: 'Cannot create the account', error });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ msg: "Username and password are required" });
    }
    const foundAccount = await Accounts.findOne({ username });
    if (!foundAccount) {
      return res.status(400).json({ msg: 'Invalid username' });
    }
    const validPassword = await bcrypt.compare(password, foundAccount.password);
    if (!validPassword) {
      return res.status(400).json({ msg: 'Invalid password' });
    }
    // Generate token
    const token = jwt.sign(
      { userId: foundAccount._id, username: foundAccount.username },
      process.env.PRIVATE_KEY
    );
    
    res.send({ msg: 'Login successful', token ,username});
  } catch (error) {
    res.status(500).json({ msg: 'An error occurred. Please try again later.', error });
  }
}

const transferAmount = async (req, res) => {
  try {
    const { amount, fromAccount, toAccount } = req.body;

    // Find the accounts involved in the transfer
    const sourceAccount = await Accounts.findOne({ username: fromAccount });
    const destinationAccount = await Accounts.findOne({ username: toAccount });

    if (!sourceAccount) {
      return res.status(404).send({ msg: 'The source account is not found' });
    }
    if (!destinationAccount) {
      return res.status(404).send({ msg: 'The destination account is not found' });
    }
    // Check if the source account has sufficient balance for the transfer
    if (sourceAccount.salary < amount) {
      return res.status(400).send({ msg: 'Insufficient balance for the transfer' });
    }

    // Perform the transfer by updating the balances
    sourceAccount.salary -= amount;
    destinationAccount.salary += amount;

    // Save the updated account balances
    await sourceAccount.save();
    await destinationAccount.save();

    // Create a new BankOperation to record the transfer
    const transferOperation = new BankOperation({
      username: sourceAccount.username,
      description: 'Transfer',
      amount: -amount,
    });

    // Save the transfer operation
    await transferOperation.save();

    res.send({ msg: 'Transfer successful' });
  } catch (error) {
    res.status(500).send({ msg: 'Transfer failed', error });
  }
};

const fixedAmounts = async (req, res) => {
  try {
    const { username } = req.body; // Assuming you have the username passed in the request body

    // Find the account based on the username
    const account = await Accounts.findOne({ username });

    if (!account) {
      return res.status(404).send({ msg: 'Account not found' });
    }

    // Check if 6 months have passed since the last deduction
    const currentDate = new Date();
    const lastDeductionDate = account.lastDeductionDate || currentDate; // Initialize with currentDate if lastDeductionDate is not set
    const monthsDiff = (currentDate.getFullYear() - lastDeductionDate.getFullYear()) * 12 +
      (currentDate.getMonth() - lastDeductionDate.getMonth());

    if (monthsDiff >= 6) {
      // Deduction
      account.salary -= account.fees;
      account.lastDeductionDate = currentDate;

      // Save the updated account
      await account.save();

      // Create a new BankOperation to record the fixed amount deduction
      const deductionOperation = new BankOperation({
        username: account.username,
        description: 'Fixed Amount Deduction',
        amount: -account.fees,
      });

      // Save the deduction operation
      await deductionOperation.save();
    }

    res.send({ msg: 'Fixed amounts processed successfully', account });
  } catch (error) {
    res.status(500).send({ msg: 'Failed to process fixed amounts', error });
  }
};

const handleLoan = async (req, res) => {
  try {
    const { username, principal, duration } = req.body; // Assuming you have the username, principal, and duration passed in the request body

    // Find the account based on the username
    const account = await Accounts.findOne({ username });

    if (!account) {
      return res.status(404).send({ msg: 'Account not found' });
    }

    // Calculate the total loan amount
    const interestRate = getInterestRate(duration);
    const totalAmount = parseFloat(principal) + parseFloat(principal) * interestRate * duration;

    // Deduct the total loan amount from the account balance
    account.salary -= totalAmount;

    // Calculate the monthly loan payment
    const monthlyLoanPay = totalAmount / (duration * 12);

    // Create a new entry in the bank history for the monthly loan payments
    const loanHistory = new BankOperation({
      username: account.username,
      description: 'Monthly Loan Payment',
      amount: -monthlyLoanPay,
    });

    account.bankHistory.push(loanHistory);

    // Save the updated account
    await account.save();

    res.send({ msg: 'Loan processed successfully', account });
  } catch (error) {
    res.status(500).send({ msg: 'Failed to process loan', error });
  }
};

const getInterestRate = (duration) => {
  let interestRate = 0.05;
  if (duration > 10) {
    interestRate += 0.002; 
  } else {
    interestRate += duration * 0.001; 
  }
  return interestRate;
};

const getAllAccounts = async (req, res) => {
  try {
    let allAccounts = await Accounts.find();
    res.send(allAccounts);
  } catch (error) {
    res.send({ msg: "Cannot retrieve accounts", error });
  }
};

const getBankHistory = async (req, res) => {
  try {
    const bankHistory = await BankOperation.find();
    res.send(bankHistory);
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching bank history', error });
  }
};

module.exports = { createNewAccounts, login, transferAmount, fixedAmounts, handleLoan, getAllAccounts, getBankHistory };
