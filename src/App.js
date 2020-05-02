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
import NewNote from './components/NewNote';
import Note from './components/Note';
import SignUp from './components/SignUp';
import PasswordReset from './components/PasswordReset';
import Panel from './components/Panel';
import PanelUnlogged from './components/PanelUnlogged';

import UserProvider from './providers/UserProvider';

function App() {
  return (
    <>
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
              <Route path="/newnote">
                <Panel>
                  <NewNote />
                </Panel>
              </Route>
              <Route path="/note/:noteId">
                <Panel>
                  <Note />
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
      <div id="modal-backdrop"></div>
    </>
  );
}

export default App;
