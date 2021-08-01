/* eslint-disable react/prop-types */
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar"
import NewPrescriptionForm from "./NewPrescriptionForm";

export default function NewPrescription({ user, setUser }) {
  return (
    <div>
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <NewPrescriptionForm user={user} />
    </div>

  )
}