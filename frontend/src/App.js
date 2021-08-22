import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './components/home/Home';
import Login from './components/login/Login';
import Registration from './components/registration/Registration';
import ProtectedRoute from './Common/protectedRoute/ProtectedRoute';
import ListOfUsers from './components/admin/users/ListOfUsers';
import NewEvent from './components/dashboard/users/NewEvent/NewEvent';
import AdminMain from './components/admin/Admin.js/AdminMain';
import ServicesMain from './components/admin/Services/ServicesMain';
import NewService from './components/admin/Services/NewService';
import EditUserForm from './components/admin/users/EditUserForm';
import EventsMain from './components/dashboard/users/Events/EventsMain';
import PrescriptionsMain from './components/Provider/Prescriptions/PrescriptionsMain';
import NewPrescription from './components/Provider/Prescriptions/NewPrescription';
import CategoriesMain from './components/admin/Categories/CategoriesMain';
import './scss/global.scss';
import Preview from './components/Provider/Prescriptions/Preview';

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
            exact path="/admin/users"
            component={() => <ListOfUsers user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/admin/users/:id"
            component={() => <EditUserForm user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/admin/services"
            component={() => <ServicesMain user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/admin/services/new"
            component={() => <NewService user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/admin/services/:id"
            component={() => <NewService user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/admin/categories"
            component={() => <CategoriesMain user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/admin"
            component={() => <AdminMain user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/events"
            component={() => <EventsMain user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/events/new"
            component={() => <NewEvent user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/prescriptions"
            component={() => <PrescriptionsMain user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/prescriptions/new"
            component={() => <NewPrescription user={user} setUser={setUser} />} />
          <ProtectedRoute
            exact path="/prescriptions/preview/:provider/:vaccine/:dosage"
            component={() => <Preview user={user} setUser={setUser} />} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
