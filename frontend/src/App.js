import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import './scss/global.scss';

function App() {

  function getUser() {
    return localStorage.getItem('user');
  }

  const [user, setUser] = useState(getUser());


  return (
    <>
      <Router>
        <Switch>
          <Route path="/dashboard">
            <Dashboard
              user={user}
              setUser={setUser}
            />
          </Route>
          <Route path="/register">
            <Registration />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
