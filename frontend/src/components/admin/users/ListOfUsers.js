/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Table from "./Table";
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar";
import fetchWithAuth from "../../../utilities";

export default function ListOfUsers({ user, setUser }) {

  const history = useHistory();

  const [listOfUsers, setListOfUsers] = useState(null);
  const [listOfServices, setListOfServices] = useState(null);
  const [fetchError, setFetchError] = useState(null);
  const [fetchMessage, setFetchMessage] = useState(null);

  const {
    REACT_APP_BACKEND_PROTOCOL,
    REACT_APP_BACKEND_HOST,
    REACT_APP_BACKEND_PORT,
    REACT_APP_BACKEND_ROUTE
  } = process.env;

  const backend = {
    users: `${REACT_APP_BACKEND_PROTOCOL}://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/${REACT_APP_BACKEND_ROUTE}/admin/users`,
  }

  async function fetchUsers() {
    try {
      const response = await fetchWithAuth(backend.users, user.token, 'GET', null);
      setListOfUsers(response.users);
      setListOfServices(response.services);
    } catch (err) {
      setFetchError(err.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  async function handleDeleteUser(id) {
    try {
      const response = await fetchWithAuth(`${backend.users}/${id}`, user.token, 'DELETE', null)
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
    if (e.target.name === 'Delete') handleDeleteUser(id);
    else if (e.target.name === 'Edit') handleModifyUser(id);
  }
  return (
    <div>
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <div className="admin-background d-flex flex-column align-items-center">
        <h2>List of users</h2>
        {listOfUsers && listOfServices && (
          <Table
            listOfUsers={listOfUsers}
            listOfServices={listOfServices}
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
