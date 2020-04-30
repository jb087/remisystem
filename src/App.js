import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePanel from './components/HomePanel';
import Login from './components/Login';
import AccountSettings from './components/AccountSettings';
import NewReminder from './components/NewReminder';

import './App.css';

function App() {
  return (
    <Router>
      <main className="app">
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/home">
            <HomePanel />
          </Route>
          <Route path="/newreminder">
            <NewReminder />
          </Route>
          <Route path="/settings">
            <AccountSettings />
          </Route>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
