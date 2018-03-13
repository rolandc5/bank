import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './form.css';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
    }
    this.handleChangeUsername = this.handleChangeUsername.bind(this);
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeUsername(event) {
    this.setState({ username: event.target.value });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    if (!this.state.username || !this.state.password ) {
      alert('input Username or Password');
    };
    const user = { username: this.state.username, password: this.state.password };
    axios.post('http://localhost:3030/login', user)
      .then((response) => {
        localStorage.setItem('loggedIn', response.data.token);
        window.location = ('/home');
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  render() {
    return (
      <div className="LoginForm">
        <form onSubmit={this.handleSubmit}>
            <div>
              <input
                id="formHorizontalEmail"
                className="box"
                type="text"
                value={ this.state.username }
                onChange={ this.handleChangeUsername }
                placeholder="Username"
              />
            </div>
              <div>
                <input
                  id="formHorizontalPassword"
                  className="box"
                  type="password"
                  value={ this.state.password }
                  onChange={ this.handleChangePassword }
                  placeholder="Password"
                />
            </div>
          <div>
          <input className="button" type="submit" value="Login"/>
          </div>
        </form>
      <div>
      <Link to="/signup"><button className="button">SignUp</button></Link>
      </div>
      </div>
    )
  }
}
