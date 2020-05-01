import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import HomePanel from './components/HomePanel';
import Login from './components/Login';
import SettingsPanel from './components/SettingsPanel';
import NewReminder from './components/NewReminder';
import ReminderPanel from './components/ReminderPanel';

export const userContext = React.createContext(null);

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
            <Route path="/reminder/:reminderId">
              <ReminderPanel />
            </Route>
            <Route path="/newreminder">
              <NewReminder />
            </Route>
            <Route path="/settings">
              <SettingsPanel />
            </Route>
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </main>
      </userContext.Provider>
    </Router>
  );
}

export default App;
