/* import { useState } from "react"; */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar";
import ServicesTable from "./ServicesTable";
/* eslint-disable react/prop-types */
export default function ServicesMain({ user, setUser }) {

  const [listOfServices, setListOfServices] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  async function fetchServices() {
    fetch('http://localhost:5000/api/admin/services', {
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
        setListOfServices(res);
      })
      .catch(err => setFetchError(err.message));
  }

  useEffect(() => {
    fetchServices();
  }, []);

  async function handleDeleteService(id) {
    fetch(`http://localhost:5000/api/admin/services/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: null
    })
      .then(res => res.json())
      .then(res => {
        if (res.status < 200 || res.status >= 300) throw new Error(res?.error);
        setSuccessMessage('Delete service successful!');
        fetchServices();
        setTimeout(() => {
          setSuccessMessage(null);
        }, 2000);
      })
      .catch(err => setFetchError(err.message));
  }

  function handleActionButtons(e) {
    const { id } = e.target.dataset;
    if (e.target.name === 'Törlés') handleDeleteService(id);
    /*  else if (e.target.name === 'Edit') handleModifyUser(id); */
  }


  return (
    <div className="services">
      <AuthenticatedNavbar user={user} setUser={setUser} />

      <h2 className="text-center m-2">Szolgáltatások listája</h2>
      {listOfServices && (
        <ServicesTable
          listOfServices={listOfServices}
          handleActionButtons={handleActionButtons} />
      )}
      {fetchError && (
        <div className="alert alert-danger" role="alert">
          {fetchError}
        </div>
      )}
      {successMessage && (
        <div className="container text-center col-4 alert alert-info" role="alert">
          {successMessage}
        </div>
      )}

      <Link
        to="/admin/services/new"
        className="btn btn-primary">Új szolgáltatás felvitele</Link>
    </div>
  )
}