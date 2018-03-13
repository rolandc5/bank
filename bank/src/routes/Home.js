import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import * as Pages from './';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      greet: '',
      balance: 0,
      accountNumber: 0,
      transactions: [],
      error: ''
    };
  }

  componentDidMount() {
    const token = localStorage.getItem('loggedIn');
    axios.get(`http://localhost:3030/me?token=${token}`)
      .then((response) => {
        console.log(response);
        this.setState({
          greet: 'Hello ' + response.data.firstName + '!',
          balance: response.data.balance,
          accountNumber: response.data.accountNum,
          transactions: response.data.transactions
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  render() {
    return(
      <div>
          <h1 className="Header"> { this.state.greet } </h1>
          <div className="Aligner">
            <div className="Border">
              <h2 className="header"> { `Balance: $${this.state.balance}` } </h2>
              <h3 className="header"> { `Account Number: ${this.state.accountNumber }` } </h3>
              <div>
                <h4 className="header"> Transactions </h4>
                <div>
                  {
                    this.state.transactions.length === 0 ?                  //If the length of transaction is 0 it will output no recent transaction.
                    <div className="transaction"> no recent transaction </div> :
                    <Transactions history= { this.state.transactions }/>
                  }
                </div>
              </div>
            </div>
          </div>
      </div>
    )
  }
}

const Transactions = (props) => {
  return (
    <div>
      <ul> { props.history.slice(0, 5).map((index, i) => {
        return (
          <li className="transDate" key={i}> <p>{ index.date }</p>
            <div className="trans1">
              <div>
                <div>
                  { index.merchant }
                </div>
                <div className="trans2">
                  { `${index.amount}`}
                </div>
              </div>
            </div>
          </li>
        );
      })}
      </ul>
      <Link className="viewAll" to="/activity"> Activity </Link>
    </div>
  );
};
