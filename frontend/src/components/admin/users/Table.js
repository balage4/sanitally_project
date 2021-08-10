import ActionButtons from "./ActionButtons"

/* eslint-disable react/prop-types */
export default function Table({ listOfUsers, listOfServices, handleActionButtons }) {

  const buttonsArray = ['Módosítás', 'Törlés'];
  const headerMap = [
    ['_id', 'ID'],
    ['lastName', 'Vezetéknév'],
    ['firstName', 'Keresztnév'],
    ['email', 'E-mail'],
    ['role', 'Jogosultság'],
    ['providerTitle', 'szolgáltató']
  ];

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            {headerMap.map((header, i) => (
              <th
                key={`th_${i + 1}`}
              >{headerMap[i][1]}</th>
            ))}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listOfUsers.map((user, userIndex) => (
            <tr key={`tr_${userIndex + 1}`}>
              {headerMap.map((headerName, i) => {
                if (headerMap[i][0] === '_id') {
                  return (
                    <td key={`td_${i + 1}`}>{userIndex + 1}</td>
                  )
                }
                if (headerMap[i][0] === 'providerTitle') {
                  let providerString;
                  listOfServices.forEach(service => {
                    if (service._id === user[headerName[0]]) {
                      providerString = service.serviceName
                    }
                  })
                  return (
                    <td key={`td_${i + 1}`}>{providerString}</td>
                  )
                }
                return (<td key={`td_${i + 1}`}>{user[headerName[0]]}</td>)
              })}
              <td><ActionButtons
                buttonsArray={buttonsArray}
                actionId={user._id}
                handleActionButtons={handleActionButtons}
              /></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}