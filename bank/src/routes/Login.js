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
      <div class="container d-flex justify-content-center">
        <form class="col-5" onSubmit={ this.handleSubmit }>
          <div class="form-group">
              <input
                class="form-control"
                type="text"
                value={ this.state.username }
                onChange={ this.handleChangeUsername }
                placeholder="Username"
              />
            </div>
            <div class="form-group">
              <input
                class="form-control"
                type="password"
                value={ this.state.password }
                onChange={ this.handleChangePassword }
                placeholder="Password"
              />
            </div>
            <input class="btn btn-secondary btn-block" type="submit" value="Login"/>
            <Link class="btn btn-secondary btn-block" to="/signup">SignUp</Link>
        </form>
      </div>
    )
  }
}
