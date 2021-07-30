import ActionButtons from "./ActionButtons"

/* eslint-disable react/prop-types */
export default function Table({ listOfUsers, handleActionButtons }) {

  const buttonsArray = ['Edit', 'Delete'];
  const headerMap = [
    ['_id', 'ID'],
    ['lastName', 'Last Name'],
    ['firstName', 'First Name'],
    ['email', 'Email'],
    ['role', 'Role']
  ];

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          {headerMap.map((header, i) => (
            <th
              key={header[i]}
            >{headerMap[i][1]}</th>
          ))}
          <th>Actions</th>
        </thead>
        <tbody>
          {listOfUsers.map(user => (
            <tr key={user._id}>
              {headerMap.map((headerName, i) => {
                if (headerMap[i][0] === '_id') {
                  return (
                    <td key={user._id}>{i + 1}</td>
                  )
                }
                return (<td key={user._id}>{user[headerName[0]]}</td>)

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