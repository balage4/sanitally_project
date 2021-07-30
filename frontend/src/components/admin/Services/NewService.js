/* eslint-disable react/prop-types */
import { useState } from "react";
import { Link, useParams } from "react-router-dom"
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar"
import NewServiceForm from "./NewServiceForm";


export default function NewService({ user, setUser }) {
  const { id } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  if (id) {
    fetch(`http://localhost:5000/admin/services/${id}`, {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: null,
    })
      .then(res => res.json())
      .then(res => {
        if (res.status < 200 || res.status >= 300) throw new Error(res?.error);
        setServiceData(res.service);
      }).catch(err => setFetchError(err.message));
  }

  return (
    <div className="new-service">
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <Link to="/admin/services">Vissza</Link>
      <h3>Új szolgáltatás felvitele</h3>
      {fetchError && (
        <div className="alert alert-danger" role="alert">
          {fetchError}
        </div>
      )}
      <NewServiceForm token={user.token} serviceData={serviceData} />
    </div>
  )
}