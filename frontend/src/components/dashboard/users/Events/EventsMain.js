/* eslint-disable react/prop-types */
import AuthenticatedNavbar from "../../../navbars/authenticatedNavbar/AuthenticatedNavbar";

export default function EventsMain({ user, setUser }) {
  return (
    <>
      <AuthenticatedNavbar user={user} setUser={setUser} />
      EventsMain
    </>
  )
}