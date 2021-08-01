/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import fetchWithAuth from "../../../../utilities";
import EventsTable from "./EventsTable";

export default function ListOfEvents({ user }) {

  const [listOfEvents, setListOfEvents] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const {
    REACT_APP_BACKEND_PROTOCOL,
    REACT_APP_BACKEND_HOST,
    REACT_APP_BACKEND_PORT,
    REACT_APP_BACKEND_ROUTE
  } = process.env;

  const backend = {
    events: `${REACT_APP_BACKEND_PROTOCOL}://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/${REACT_APP_BACKEND_ROUTE}/events/${user.email}`,
  }

  async function fetchEvents() {
    try {
      const res = await fetchWithAuth(backend.events, user.token, 'GET', null);
      if (res.status < 200 || res.status >= 300 || !res) throw new Error(res?.error);
      setListOfEvents(res.events);
    } catch (err) {
      setFetchError(err.message);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {listOfEvents && (
        <div>
          Nincs rögzített esemény
        </div>
      )}
      {listOfEvents && (
        <EventsTable listOfEvents={listOfEvents}
        />
      )}
      {fetchError && (
        <div className="alert alert-danger" role="alert">
          {fetchError}
        </div>
      )}
    </div>

  )
}
