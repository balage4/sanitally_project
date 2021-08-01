/* eslint-disable react/prop-types */
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar";

export default function PrescriptionsMain({ user, setUser }) {
  return (
    <>
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <div>
        Prescriptions main</div>
    </>
  )
}