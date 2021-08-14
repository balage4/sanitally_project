/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import fetchWithAuth, { backend } from "../../../../utilities";
import EventsTable from "./EventsTable";

export default function ListOfEvents({ user }) {

  const [listOfEvents, setListOfEvents] = useState(null);
  const [fetchError, setFetchError] = useState(null);


  async function fetchEvents() {
    try {
      let eventsEndpoint;
      if (user.role === 'admin') {
        eventsEndpoint = `${backend.endpoint}/events`
      } else if (user.role === 'provider') {
        eventsEndpoint = `${backend.endpoint}/provider/events/${user.email}`;
      } else {
        eventsEndpoint = `${backend.endpoint}/events/${user.email}`;
      }

      const eventsResponse = await fetchWithAuth(eventsEndpoint,
        user.token,
        'GET', null);
      const userResponse = await fetchWithAuth(`${backend.endpoint}/admin/users`, user.token, 'GET', null);

      if (eventsResponse.status < 200 || eventsResponse.status >= 300 || !eventsResponse) throw new Error(eventsResponse.error);
      if (userResponse.status < 200 || userResponse.status >= 300 || !userResponse) throw new Error(userResponse.error);


      await eventsResponse.events.forEach(event => {
        userResponse.users.forEach(userResp => {
          if (event.userId === userResp._id) {
            event.userName = `${userResp.lastName} ${userResp.firstName}`;
          }
          if (event.eventProvider === userResp._id) {
            event.eventProvider = `${userResp.lastName} ${userResp.firstName}`;
          }
        })
        userResponse.services.forEach(serviceResp => {
          if (event.eventService === serviceResp._id) {
            event.eventService = serviceResp.serviceName;
          }
        })
      });

      await setListOfEvents(eventsResponse.events);


    } catch (err) {
      setFetchError(err.message);
    }
  }

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      {user.role === 'admin' && (<h3 className="text-center m-3">A rendszerben rögzített események</h3>)}
      {user.role === 'user' && (<h3 className="text-center m-3">A rendszerben rögzített eseményeim</h3>)}
      {user.role === 'provider' && (<h3 className="text-center m-3">A szolgáltatásomra rögzített események</h3>)}
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
