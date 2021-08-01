/* eslint-disable react/prop-types */
import AuthenticatedNavbar from "../../../navbars/authenticatedNavbar/AuthenticatedNavbar";
import ListOfEvents from "./ListOfEvents";

export default function EventsMain({ user, setUser }) {
  return (
    <div>
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <ListOfEvents user={user} />
    </div>
  )
}