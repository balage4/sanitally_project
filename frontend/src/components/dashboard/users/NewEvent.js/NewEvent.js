/* eslint-disable react/prop-types */
import AuthenticatedNavbar from "../../../navbars/authenticatedNavbar/AuthenticatedNavbar";
import NewEventForm from "./NewEventForm";

export default function NewEvent({ user, setUser }) {
  return (
    <div className="new-event">
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <h3>Új esemény rögzítése</h3>
      <NewEventForm user={user} />
    </div>
  )
}