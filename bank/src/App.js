import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
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
      <div className="App">
        <div className="App-header">
          <header>
            { loggedIn === false ? <Link to="/"><img src={ logo } className="App-logo" alt="logo" /></Link> : null }
            { loggedIn === true ? <Link to="/home"><img src={ logo } className="App-logo" alt="logo" /></Link> : null }
            { loggedIn === true ? <button> settings </button> : null }

          </header>
        </div>
        <div>
          { loggedIn === false ? <div><Route path="/" exact component={ Pages.Login }></Route></div> : null }
          { loggedIn === true ? <div><button className="logout" onClick={ this.doLogout }>Logout</button></div> : null }
        </div>
        <div>
        <Route path="/signup" exact component={ Pages.SignUp }></Route>
        <Route path="/home" exact component={ Pages.Home }></Route>
        <Route path="/activity" exact component={ Pages.Activity }></Route>
        </div>
      </div>
    );
  }
}

export default App;
