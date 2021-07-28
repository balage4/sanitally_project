import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Dashboard from './components/dashboard/users/Dashboard';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import ListOfUsers from './components/admin/users/ListOfUsers';
import './scss/global.scss';
import NewEvent from './components/dashboard/users/NewEvent.js/NewEvent';
import AdminMain from './components/admin/Admin.js/AdminMain';
import ServicesMain from './components/admin/Services/ServicesMain';
import NewService from './components/admin/Services/NewService';

function getUser() {
  const storageUser = localStorage.getItem('user');
  if (!storageUser) {
    return null;
  }
  return JSON.parse(storageUser);
}

function App() {
  const [user, setUser] = useState(getUser());

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/"><Home user={user} setUser={setUser} /></Route>
          <Route path="/register"><Registration user={user} setUser={setUser} /></Route>
          <Route path="/login"><Login user={user} setUser={setUser} /></Route>
          <ProtectedRoute
            path="/dashboard"
            component={() => <Dashboard user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/admin/users"
            component={() => <ListOfUsers user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/admin/services"
            component={() => <ServicesMain user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/admin/services/new"
            component={() => <NewService user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/admin"
            component={() => <AdminMain user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/events/new"
            component={() => <NewEvent user={user} setUser={setUser} />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
