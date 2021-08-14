/* eslint-disable react/prop-types */
import { Link, Redirect } from "react-router-dom"
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar"

export default function AdminMain({ user, setUser }) {

  if (user.role !== 'admin') {
    return <Redirect to="/login" />
  }



  return (
    <div className="admin text-center">
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <h2>Admin menü</h2>
      <div className="m-3">
        <Link
          className="btn btn-primary m-3"
          to="/admin/users" >Felhasználók listázása
        </Link>
        <Link
          className="btn btn-secondary m-3"
          to="/admin/services" >Szolgáltatások listázása
        </Link>
        <Link
          className="btn btn-info m-3"
          to="/admin/categories" >Főoldali lista szerkesztése
        </Link>
      </div>

    </div>
  )
}