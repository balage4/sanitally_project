/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Table from "./Table";
import AuthenticatedNavbar from "../../../Common/navbars/authenticatedNavbar/AuthenticatedNavbar";
import fetchWithAuth, { backend } from "../../../utilities";

export default function ListOfUsers({ user, setUser }) {

  const history = useHistory();

  const [listOfUsers, setListOfUsers] = useState(null);

  const [fetchError, setFetchError] = useState(null);
  const [fetchMessage, setFetchMessage] = useState(null);

  async function fetchUsers() {
    try {
      const response = await fetchWithAuth(`${backend.endpoint}/admin/users`, user.token, 'GET', null);
      setListOfUsers(response.users);
    } catch (err) {
      setFetchError(err.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleDeleteUser(id) {
    try {
      const response = await fetchWithAuth(`${backend.endpoint}/admin/users/${id}`, user.token, 'DELETE', null)
      setFetchMessage(response.message);
      fetchUsers();
      setTimeout(() => {
        setFetchMessage(null);
      }, 2000);
    } catch (err) {
      setFetchError(err.message);
      setTimeout(() => {
        setFetchError(null);
      }, 2000);
    }
  }

  function handleModifyUser(id) {
    history.push(`/admin/users/${id}`);
  }

  function handleActionButtons(e) {
    const { id } = e.target.dataset;
    if (e.target.name === 'Törlés') handleDeleteUser(id);
    else if (e.target.name === 'Módosítás') handleModifyUser(id);
  }
  return (
    <div>
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <div className="admin-background d-flex flex-column align-items-center">
        <h2 className="m-4">Regisztrált felhasználók listája</h2>
        {listOfUsers && (
          <Table
            listOfUsers={listOfUsers}
            handleActionButtons={handleActionButtons}
          />
        )}
        {fetchError && (
          <div className="alert alert-danger" role="alert">
            {fetchError}
          </div>
        )}
        {fetchMessage && (
          <div className="alert alert-info" role="alert">
            {fetchMessage}
          </div>
        )}
      </div>
    </div>
  )
}
