/* eslint-disable react/prop-types */
import AuthenticatedNavbar from "../../../Common/navbars/authenticatedNavbar/AuthenticatedNavbar"
import NewPrescriptionForm from "./NewPrescriptionForm";

export default function NewPrescription({ user, setUser }) {
  return (
    <div className="prescription">
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <h3 className="text-center m-3">Új recept felírása páciensnek</h3>
      <NewPrescriptionForm user={user} />
    </div>

  )
}