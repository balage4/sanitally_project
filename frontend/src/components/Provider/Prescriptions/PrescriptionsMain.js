/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import AuthenticatedNavbar from "../../../Common/navbars/authenticatedNavbar/AuthenticatedNavbar";
import PrescriptionList from "./PrescriptionList";
import '../../../scss/prescriptions.scss';

export default function PrescriptionsMain({ user, setUser }) {
  return (
    <div className="text-center prescription">
      <AuthenticatedNavbar user={user} setUser={setUser} />

      {user.role === 'provider' && (<Link
        className="btn submit-btn m-3"
        to="/prescriptions/new"
      >Új recept írása felhasználónak</Link>)}
      {user.role === 'user' && (
        <>
          <h3 className="m-3">Receptjeim</h3>
          <PrescriptionList user={user} />
        </>
      )}
      {user.role === 'admin' && (
        <>
          <h3 className="m-3">A rendszerben rögzített összes recept</h3>
          <PrescriptionList user={user} />
        </>
      )}
    </div>
  )
}