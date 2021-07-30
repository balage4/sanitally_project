/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import Table from "./Table";
import AuthenticatedNavbar from "../../navbars/authenticatedNavbar/AuthenticatedNavbar";

// eslint-disable-next-line react/prop-types
export default function ListOfUsers({ user, setUser }) {

  const [listOfUsers, setListOfUsers] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const {
    REACT_APP_BACKEND_PROTOCOL,
    REACT_APP_BACKEND_HOST,
    REACT_APP_BACKEND_PORT,
    REACT_APP_BACKEND_ROUTE
  } = process.env;

  const backend = {
    users: `${REACT_APP_BACKEND_PROTOCOL}://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/${REACT_APP_BACKEND_ROUTE}/admin/users`,
  }

  async function handleDeleteUser(id) {
    await fetch(`${backend.users}/${id}`, {
      method: 'DELETE',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: null
    })
  }
  function handleModifyUser(id) {
    return <Redirect to={`/users/${id}`} />
  }

  useEffect(() => {
    fetch(backend.users, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      },
    })
      .then(response => response.json())
      .then(response => {
        if (response.status < 200 || response.status >= 300) throw new Error(response.error);
        else setListOfUsers(response.users);

      })
      .catch(err => setFetchError(err.message))

  }, []);


  function handleActionButtons(e) {
    const { id } = e.target.dataset;
    if (e.target.name === 'Delete') handleDeleteUser(id);
    else if (e.target.name === 'Edit') handleModifyUser(id);
  }
  return (
    <div>
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <div className="d-flex flex-column align-items-center">
        <h2>List of users</h2>
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
      </div>
    </div>
  )
}
