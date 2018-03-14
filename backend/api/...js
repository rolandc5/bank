const User = require('./model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');



module.exports = {
  create: (req, res) => {
    const { username, password, firstName, lastName, balance = 0 } = req.body;
    User.collection.stats((err, response) => {
      if (err) return res.status(500).json({ message: 'Server error, could not retrieve data' });
      accountNum = response.count + 10000 + 1
      bcrypt.hash(password, 11, (err, hashed) => {
        if (err) return res.status(500).json({ message: 'Error creating account, please try again later!' });
        const newUser = new User();
        newUser.balance = balance;
        newUser.accountNum = accountNum;
        newUser.username = username;
        newUser.password = hashed;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.save((err, data) => {
          if (err) return res.status(403).json(err.message);
          res.status(200).json('Success');
        });
      });
    });
  },

  login: (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username })
      .then(user => {
        bcrypt.compare(password, user.password, (err, data) => {
          if (data === false) {
            res.status(400).json({ err: 'Wrong password'});
          }
          if (!user) res.status(400).json({ err: 'user not found'});
          const payload = {
            iss: 'banking_system',
            id: user._id
          }
          const token = jwt.sign(payload, 'fizzbuzz');
          res.json({ message: 'Success', token: token });
        });
      })
      .catch((err) => {
        res.status(500).json({ err: err.message });
      });
  },

  me: (req, res) => {
    User.findById(req.userId, (err, data) => {
      res.json(data);
    });
  },

  atm: (req, res) => {
    const { accountNumber, withdraw, deposit } = req.body;
    const data = User.findOne({ accountNum: accountNumber });
    if (withdraw > 0) {
      data.balance = (data.balance - parseInt(withdraw)).toFixed(2);
      const amount = '-$' + withdraw;
      const merchant = 'ATM withdraw';
      data.transactions.unshift({ date, merchant, amount });
    }
    if (deposit > 0) {
      data.balance = (data.balance + parseInt(deposit)).toFixed(2);
      const amount = '+$' + deposit;
      const merchant = 'ATM deposit';
      data.transactions.unshift({ date, merchant, amount });
    }
    data.save();
      res.json(`new balance is ${data.balance}`);
  },
}
