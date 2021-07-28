/* eslint-disable react/prop-types */
import { Link, Redirect } from "react-router-dom"
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar"

export default function AdminMain({ user, setUser }) {

  if (user.role !== 'admin') {
    return <Redirect to="/login" />
  }



  return (
    <div className="admin">
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <h2>Admin menü</h2>
      <Link
        className="btn btn-primary"
        to="/admin/users" >List of users
      </Link>
      <Link
        className="btn btn-secondary"
        to="/admin/services" >Services
      </Link>

    </div>
  )
}