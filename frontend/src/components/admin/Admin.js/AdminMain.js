/* eslint-disable react/prop-types */
import { Redirect } from "react-router-dom"
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar"

export default function AdminMain({ user, setUser }) {

  if (user.role !== 'admin') {
    return <Redirect to="/login" />
  }

  return (
    <div className="admin">
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <h2>Admin menü</h2>
    </div>
  )
}