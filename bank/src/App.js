import React, { Component } from 'react';
import { Link, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

import * as Pages from './routes';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      loggedIn: false,
    }
    this.doLogout = this.doLogout.bind(this);
  }

  componentDidMount() {
    this.setState({ loggedIn: localStorage.hasOwnProperty('loggedIn') });
  }

  doLogout() {
    localStorage.removeItem("loggedIn");
    this.setState({ loggedIn: false });
    window.location = '/';
  }

  render() {
    const { loggedIn } = this.state;
    return (
      <div>
        <header className="App-header">
          { loggedIn === false ? <Link to="/"><img src={ logo } className="App-logo" alt="logo" /></Link> : null }
          { loggedIn === false ? <Route path="/signup" exact component={ Pages.SignUp }></Route> : null }
          { loggedIn === true ? <Link to="/home"><img src={ logo } className="App-logo" alt="logo" /></Link> : null }
          { loggedIn === true ? <button class="btn btn-outline-secondary float-right"> settings </button> : null }
          { loggedIn === true ? <button class="btn btn-outline-secondary float-right" onClick={ this.doLogout }>Logout</button> : null }
        </header>
        { loggedIn === false ? <div><Route path="/" exact component={ Pages.Login }></Route></div> : null }
        { loggedIn === true ? <Route path="/home" exact component={ Pages.Home }/> : <Route path="/home" exact component = { Pages.notLogged }/> }
        { loggedIn === true ? <Route path="/activity" exact component={ Pages.Activity }/> : <Route path="/activity" exact component = { Pages.notLogged }/> }
      </div>
    );
  }
}

export default App;
