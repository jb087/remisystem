import React, { useContext } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import HomePanel from './components/HomePanel';
import SignIn from './components/SignIn';
import SettingsPanel from './components/SettingsPanel';
import NewReminder from './components/NewReminder';
import ReminderPanel from './components/ReminderPanel';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';

import UserProvider, { UserContext } from './providers/UserProvider';
import Panel from './components/Panel';

function App() {
  return (
    <Router>
      <UserProvider>
        <main className="app">
          <Switch>
            <Route path="/signIn">
              <SignIn />
            </Route>
            <Route path="/signUp">
              <SignUp />
            </Route>
            <Route path="/passwordReset">
              <PasswordReset />
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
              <Panel>
                <SettingsPanel />
              </Panel>
            </Route>
            <Route render={() => <Redirect to="/" />} />
          </Switch>
        </main>
      </UserProvider>
    </Router>
  );
}

export default App;
