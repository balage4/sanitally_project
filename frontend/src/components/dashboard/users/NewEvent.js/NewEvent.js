/* eslint-disable react/prop-types */
import AuthenticatedNavbar from "../../../navbars/authenticatedNavbar/AuthenticatedNavbar";

export default function NewEvent({ user, setUser }) {
  return (
    <>
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <h3>Új esemény rögzítése</h3>
    </>
  )
}