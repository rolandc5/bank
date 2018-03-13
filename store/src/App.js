import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      accountNum: '',
    }
    this.handleBuy = this.handleBuy.bind(this);
    this.handleAccountNum = this.handleAccountNum.bind(this);
  }

  handleAccountNum(event) {
    this.setState({ accountNum: event.target.value });
  }

  handleBuy(event) {
    const data = { account: this.state.accountNum, merchant: 'The Store', amount: 299.99 };
    axios.post('http://localhost:3030/purchase', data)
    .then(() => {
      console.log('Success');
    })
    .catch((err) => {
      console.log('Failed');
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div>
          <img src="https://static-ca.ebgames.ca/images/products/728999/3max.jpg" alt="Shoes" height="300px" width="400px"/>
          Price: 299.99
          <div>
            <div>
              <form onSubmit={ this.handleBuy }>
                <div>
                  <input
                    type="text"
                    value={ this.state.accountNum }
                    onChange={ this.handleAccountNum }
                    placeholder="Account Number"
                  />
                </div>
              <input type="submit" value="Buy Now"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
