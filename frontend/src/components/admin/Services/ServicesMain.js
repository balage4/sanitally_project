/* import { useState } from "react"; */
import { Link } from "react-router-dom";
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar";
/* eslint-disable react/prop-types */
export default function ServicesMain({ user, setUser }) {

  /*  const [listOfServices, setListOfUsers] = useState(null); 
  const [fetchError, setFetchError] = useState(null); */


  return (
    <div className="services">
      <AuthenticatedNavbar user={user} setUser={setUser} />

      <h2>Szolgáltatások listája</h2>


      <Link
        to="/admin/services/new"
        className="btn btn-primary">Új szolgáltatás felvitele</Link>
    </div>
  )
}