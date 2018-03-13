import React, { Component } from 'react';
import axios from 'axios';
import './form.css';

export default class SignUp extends Component {
  constructor() {
    super()
    this.state = {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
    };
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeFirstName(event) {
    this.setState({ firstName: event.target.value });
  }

  handleChangeLastName(event) {
    this.setState({ lastName: event.target.value });
  }

  handleSubmit(event) {
    const stuff = this.state
    event.preventDefault();
    const user = { username: stuff.username, password: stuff.password, firstName: stuff.firstName, lastName: stuff.lastName };
    axios.post('http://localhost:3030/create', user)
      .then((data) => {
        console.log(data);
        setTimeout(() => {
          window.location = '/';
        });
      })
      .catch((err) => {
        console.log(err);
        alert('Username already exists');
      });
  }
  render() {
    return (
      <div className="LoginForm">
        <form onSubmit={this.handleSubmit}>
            <div>
              <input
                className="nameBox"
                type="text"
                value={ this.state.firstName }
                onChange={ this.handleChangeFirstName }
                placeholder="First Name *"
              />
              <input
                className="nameBox"
                type="text"
                value={ this.state.lastName }
                onChange={ this.handleChangeLastName }
                placeholder="Last Name *"
              />
            </div>
            <div>
              <input
                id="formHorizontalEmail"
                className="box"
                type="text"
                value={ this.state.username }
                onChange={ this.handleChangeUsername }
                placeholder="Username *"
              />
            </div>
              <div>
                <input
                  id="formHorizontalPassword"
                  className="box"
                  type="password"
                  value={ this.state.password }
                  onChange={ this.handleChangePassword }
                  placeholder="Password *"
                />
            </div>
          <div>
          <input className="button" type="submit" value="SignUp"/>
          </div>
        </form>
      </div>
    );
  }
}
