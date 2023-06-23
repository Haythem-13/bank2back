const express = require("express");
const router = express.Router();
// const verifyToken =require("../middelware/auth")
const { getAllAccounts, createNewAccounts, login ,transferAmount,fixedAmounts,handleLoan  } = require("../Controllers/accounts");
const {getBankHistory} = require("../Controllers/bankHistory")

router.post("/login", login);
router.post("/create", createNewAccounts); 
router.get("/", getAllAccounts);
router.post("/transfer",transferAmount)
router.post("/history",getBankHistory)
router.post('/fixed-amounts', fixedAmounts);
router.post('/loan', handleLoan);

module.exports = router;