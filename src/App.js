import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import Home from './components/Home';
import SignIn from './components/SignIn';
import Settings from './components/Settings';
import NewReminder from './components/NewReminder';
import Reminder from './components/Reminder';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';
import Panel from './components/Panel';
import PanelUnlogged from './components/PanelUnlogged';

import UserProvider from './providers/UserProvider';

function App() {
  return (
    <Router>
      <UserProvider>
        <main className="app">
          <Switch>
            <Route path="/signIn">
              <PanelUnlogged>
                <SignIn />
              </PanelUnlogged>
            </Route>
            <Route path="/signUp">
              <PanelUnlogged>
                <SignUp />
              </PanelUnlogged>
            </Route>
            <Route path="/passwordReset">
              <PanelUnlogged>
                <PasswordReset />
              </PanelUnlogged>
            </Route>
            <Route path="/" exact>
              <Panel>
                <Home />
              </Panel>
            </Route>
            <Route path="/reminder/:reminderId">
              <Panel>
                <Reminder />
              </Panel>
            </Route>
            <Route path="/newreminder">
              <Panel>
                <NewReminder />
              </Panel>
            </Route>
            <Route path="/settings">
              <Panel>
                <Settings />
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
