/* import { useState } from "react"; */
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import fetchWithAuth, { backend } from "../../../utilities";
import AuthenticatedNavbar from "../../../Common/navbars/authenticatedNavbar/AuthenticatedNavbar";
import ServicesTable from "./ServicesTable";

/* eslint-disable react/prop-types */
export default function ServicesMain({ user, setUser }) {

  const [listOfServices, setListOfServices] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const history = useHistory();

  async function fetchServices() {
    try {
      const res = await fetchWithAuth(`${backend.endpoint}/services`, user.token, 'GET', null);
      if (res.status < 200 || res.status >= 300) throw new Error(res?.error);
      setListOfServices(res.services);
    } catch (err) { setFetchError(err.message) };
  }

  useEffect(() => {
    fetchServices();
  }, []);

  async function handleDeleteService(id) {
    try {
      const res = await fetchWithAuth(`${backend.endpoint}/admin/services/${id}`, user.token, 'DELETE', null);
      if (res.status < 200 || res.status >= 300) throw new Error(res?.error);
      setSuccessMessage('Szolgáltatás sikeresen törölve.');
      fetchServices();
      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);
    } catch (err) { setFetchError(err.message) };
  }

  function handleModifyService(id) {
    history.push(`/admin/services/${id}`);
  }

  function handleActionButtons(e) {
    const { id } = e.target.dataset;

    if (e.target.name === 'Törlés') handleDeleteService(id);
    else if (e.target.name === 'Módosítás') handleModifyService(id);
  }

  return (
    <div className="services">
      <AuthenticatedNavbar user={user} setUser={setUser} />

      <h2 className="text-center m-2">Szakterületek listája</h2>
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
        <div className="container text-center col-4 alert alert-danger" role="alert">
          {successMessage}
        </div>
      )}

      <Link
        to="/admin/services/new"
        className="btn submit-btn m-3">Új szakterület rögzítése</Link>
    </div>
  )
}