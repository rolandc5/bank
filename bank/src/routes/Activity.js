import React, { Component } from 'react';
import axios from 'axios';

export default class Activity extends Component {
    constructor(props) {
    super(props);
    this.state = {
      transactions: []
    }
  }

  componentDidMount() {
    axios.get('http://localhost:3030/me')
    .then((response) => {
      this.setState({ transactions: response.data.transactions });
    })
    .catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <Transactions history={ this.state.transactions }/>
      </div>
    )
  }
}

const Transactions = (props) => {
  return (
    <div>
      <ul> { props.history.map((index, i) => {
        return (
          <li className="transDate" key={i}> <p>{ index.date }</p>
            <div className="trans1">
              <div>
                <div>
                  { index.merchant }
                </div>
                <div className="trans2">
                  { index.amount }
                </div>
              </div>
            </div>
          </li>
        );
      })}
      </ul>
    </div>
  );
};