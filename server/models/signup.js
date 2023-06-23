// // signup.js

// const express = require('express');
// const router = express.Router();
// const LoginModel = require('./loginSchema'); // Import the Mongoose schema

// router.post('/', async (req, res) => {
//   const { username, password, email, salary } = req.body;

//   try {
//     // Create a new instance of the Login model
//     const login = new LoginModel({
//       username,
//       password,
//       email,
//       salary
//     });

//     // Save the data to the database
//     await login.save();

//     res.status(200).json({ message: 'Signup data received and saved successfully.' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error occurred while saving the data.' });
//   }
// });

// module.exports = router;
