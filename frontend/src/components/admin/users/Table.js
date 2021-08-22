import ActionButtons from "./ActionButtons"

/* eslint-disable react/prop-types */
export default function Table({ listOfUsers, handleActionButtons }) {

  const buttonsArray = ['Módosítás', 'Törlés'];
  const headerMap = [
    ['_id', 'Sorszám'],
    ['lastName', 'Vezetéknév'],
    ['firstName', 'Keresztnév'],
    ['email', 'E-mail'],
    ['role', 'Jogosultság'],
    ['providerTitle', 'Szolgáltató']
  ];

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            {headerMap.map((header, headerIndex) => (
              <th
                key={`th_${headerIndex + 1}`}
                className="text-center"
              >{headerMap[headerIndex][1]}</th>
            ))}
            <th
              className="text-center"
            >Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {listOfUsers.map((user, userIndex) => (
            <tr key={`tr_${userIndex + 1}`}>
              {headerMap.map((headerName, i) => {
                if (headerMap[i][0] === '_id') {
                  return (
                    <td key={`td_${i + 1}`}
                      className="text-center">{userIndex + 1}</td>
                  )
                }
                if (headerMap[i][0] === 'providerTitle') {
                  if (user.providerTitle) {
                    return <td key={`td_${i + 1}`}>{user.providerTitle.serviceName}</td>
                  }
                  return <td key={`td_${i + 1}`} />
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