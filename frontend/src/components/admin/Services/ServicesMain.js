/* eslint-disable react/prop-types */
export default function ServicesMain({ user, setUser }) {

  const [listOfServices, setListOfUsers] = useState(null);
  const [fetchError, setFetchError] = useState(null);


  return (
    <div>
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <div className="d-flex flex-column align-items-center">
        <h2>List of Services</h2>
        {listOfServices && (
          <ServicesTable listOfServices={listOfServices} />
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