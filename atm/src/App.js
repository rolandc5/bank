import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      accountNumber: '',
      deposit: '',
      withdraw: ''
    };
    this.handleAccountNumber = this.handleAccountNumber.bind(this);
    this.handleDeposit = this.handleDeposit.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  handleAccountNumber(event) {
    this.setState({ accountNumber: event.target.value });
  };

  handleDeposit(event) {
    this.setState({ deposit: event.target.value });
  }

  handleWithdraw(event) {
    this.setState({ withdraw: event.target.value });
  };

  handleSubmit(event) {
    event.preventDefault();
    const state = this.state;
    const data = { accountNumber: state.accountNumber, withdraw: state.withdraw, deposit: state.deposit };
    console.log(data);
    axios.post('http://localhost:3030/atm', data)
    .then((response) => {
      console.log(response);
    })
    .catch((err) => {
      console.log(err);
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          <form onSubmit={ this.handleSubmit }>
            <div>
              Account Number
              <input
                type="text"
                value={ this.state.accountNumber }
                onChange={ this.handleAccountNumber }
              />
            </div>
            <div>
              Withdraw
              <input
                type="text"
                value={ this.state.withdraw }
                onChange={ this.handleWithdraw }
              />
            <div>
              Deposit
              <input
                type="text"
                value={ this.state.deposit }
                onChange={ this.handleDeposit }
              />
             </div>
              <input type="submit" value="Enter"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default App;
