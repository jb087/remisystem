import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomePanel from './components/HomePanel';
import Login from './components/Login';
import AccountSettings from './components/AccountSettings';
import NewReminder from './components/NewReminder';

import './App.css';

export const userContext = React.createContext({ color: 'black' });

function App() {
  const [userData, setUserData] = useState(null);
  const login = (data) => setUserData(data);

  return (
    <Router>
      <userContext.Provider value={{ login, userData }}>
        <main className="app">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/" exact>
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
      </userContext.Provider>
    </Router>
  );
}

export default App;
