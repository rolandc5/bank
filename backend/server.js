const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const cors = require('cors');

const server = express();
server.use(cors());
const port = process.env.PORT || 3030;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://root:admin@ds012578.mlab.com:12578/bankingsystem', { useMongoClient: true });

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.use('/', require('./api/'));

/*
server.post('/logOff', (req, res) => {
  res.json('Success');
});
*/
/*
server.post('/transfer', (req, res) => {
  const { giver, given, amount } = req.body;
  const merchant = 'Balance transfer';
  User.findOne({ accountNum: giver }, (err, giverData) => {
    User.findOne({ accountNum: given }, (err,givenData) => {
      console.log('I am the giver', giverData);
      console.log('I am the given', givenData);
    });
  });
});
*/
/*
server.post('/purchase', (req, res) => {
  const { account, merchant, amount } = req.body;
  const d = new Date();
  const day = d.getDate();
  const month = d.getMonth() + 1;
  const year = d.getFullYear();
  const date = `${month}/${day}/${year}`;
  User.findOne({ accountNum: account }, (err, data) => {
    data.balance = (data.balance - parseInt(amount)).toFixed(2);
    amount = '-$' + amount;
    data.transactions.unshift({ date, merchant, amount });
    console.log('Did I push??');
    data.save((err) => {
      res.json({message: 'Successfully Purchased'});
    });
  });
});

const atm = (req, res) => {

}

*/

server.listen(port, () => {
  console.log(`Server up and runnning on ${port}`);
});
