/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import AuthenticatedNavbar from "../../../navbars/authenticatedNavbar/AuthenticatedNavbar";
import ListOfEvents from "./ListOfEvents";
import '../../../../scss/events.scss';

export default function EventsMain({ user, setUser }) {
  return (
    <div className="events-main">
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <ListOfEvents user={user} />
      <Link
        className="btn btn-primary m-3"
        to="/events/new">
        Új időpontot foglalok
      </Link>

    </div>
  )
}