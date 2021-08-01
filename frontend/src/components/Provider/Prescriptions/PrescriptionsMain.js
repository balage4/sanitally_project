/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar";

export default function PrescriptionsMain({ user, setUser }) {
  return (
    <div>
      <div>
        <AuthenticatedNavbar user={user} setUser={setUser} />
      </div>

      <Link
        className="btn btn-primary"
        to="/provider/prescriptions/new"
      >Új recept írása felhasználónak</Link>
    </div>

  )
}