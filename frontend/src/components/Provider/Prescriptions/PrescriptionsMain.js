/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar";
import PrescriptionList from "./PrescriptionList";

export default function PrescriptionsMain({ user, setUser }) {
  return (
    <div>
      <AuthenticatedNavbar user={user} setUser={setUser} />

      {user.role === 'provider' && (<Link
        className="btn btn-primary"
        to="/prescriptions/new"
      >Új recept írása felhasználónak</Link>)}
      {user.role === 'user' && (
        <PrescriptionList user={user} />
      )}
    </div>

  )
}