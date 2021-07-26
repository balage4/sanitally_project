import React from 'react';
import AuthenticatedNavbar from '../../navbars/authenticatedNavbar/AuthenticatedNavbar';
import EventsForm from './EventsForm';
import '../../../scss/events.scss';

// eslint-disable-next-line react/prop-types
export default function NewForm({ user, setUser }) {
  return (
    <>
      <div className="row">
        <div className="col pe-0 ps-4">
          <AuthenticatedNavbar user={user} setUser={setUser} />
          <div className="header d-flex justify-content-center py-5">
            <h1 className="text-center mb-5">Create event</h1>
          </div>
          <EventsForm type="new" />
        </div>
      </div>
    </>
  );
}
