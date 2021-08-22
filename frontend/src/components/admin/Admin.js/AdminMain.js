/* eslint-disable react/prop-types */
import { Link, Redirect } from "react-router-dom"
import AuthenticatedNavbar from "../../../Common/navbars/authenticatedNavbar/AuthenticatedNavbar"
import usersIcon from '../../../assets/usersIcon.png';
import medicalServicesIcon from '../../../assets/medicalServicesIcon.png';
import categoriesIcon from '../../../assets/categoriesIcon.png';
import '../../../scss/admin.scss';

export default function AdminMain({ user, setUser }) {

  if (user.role !== 'admin') {
    return <Redirect to="/login" />
  }



  return (
    <div className="admin text-center">
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <h2>Admin menü</h2>
      <div className="admin-menu">
        <Link
          className="admin-link-item"
          to="/admin/users">Felhasználók listázása
          <img src={usersIcon} alt="users" width="150" />
        </Link>

        <Link
          className="admin-link-item"
          to="/admin/services" >Szolgáltatások listázása
          <img src={medicalServicesIcon} alt="users" width="150" />
        </Link>
        <Link
          className="admin-link-item"
          to="/admin/categories" >Főoldali lista szerkesztése
          <img src={categoriesIcon} alt="users" width="150" />
        </Link>

      </div>

    </div>
  )
}