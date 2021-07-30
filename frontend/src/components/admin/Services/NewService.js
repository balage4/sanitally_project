/* eslint-disable react/prop-types */
import { Link } from "react-router-dom"
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar"
import NewServiceForm from "./NewServiceForm"

export default function NewService({ user, setUser }) {
  return (
    <div className="new-service">
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <Link to="/admin/services">Vissza</Link>
      <h3>Új szolgáltatás felvitele</h3>
      <NewServiceForm token={user.token} />
    </div>
  )
}