const BankOperation = require('../models/bankoperations');

const getBankHistory = async (req, res) => {
  try {
    const bankHistory = await BankOperation.find();
    res.send(bankHistory);
  } catch (error) {
    res.status(500).send({ msg: 'Error fetching bank history', error });
  }
};

module.exports = { getBankHistory };