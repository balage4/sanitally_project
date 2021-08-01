import ActionButtons from "./ActionButtons"

/* eslint-disable react/prop-types */
export default function Table({ listOfUsers, handleActionButtons }) {

  const buttonsArray = ['Edit', 'Delete'];
  const headerMap = [
    ['_id', 'ID'],
    ['lastName', 'Last Name'],
    ['firstName', 'First Name'],
    ['email', 'Email'],
    ['role', 'Role'],
    ['providerTitle', 'Provider Title']
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
                    <td key={`td_${i + 1}`}>{i + 1}</td>
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