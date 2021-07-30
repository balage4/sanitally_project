import ActionButtons from "../users/ActionButtons";

/* eslint-disable react/prop-types */
export default function ServicesTable({ listOfServices, handleActionButtons }) {
  const buttonsArray = ['Módosítás', 'Törlés'];

  const headerMap = [
    ['_id', 'ID'],
    ['serviceName', 'Service Name'],
    ['serviceNote', 'Service Note'],

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
          {listOfServices.services.map((service, servIndex) => (
            <tr key={service._id}>
              {headerMap.map((headerName, tdIndex) => {
                if (headerMap[tdIndex][0] === '_id') {
                  return (
                    <td key={service._id}>{servIndex + 1}</td>
                  )
                }
                return (<td key={service._id}>{service[headerName[0]]}</td>)

              })}
              <td><ActionButtons
                buttonsArray={buttonsArray}
                actionId={service._id}
                handleActionButtons={handleActionButtons}
              /></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )

}