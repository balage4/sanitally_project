import ActionButtons from "../users/ActionButtons";

/* eslint-disable react/prop-types */
export default function ServicesTable({ listOfServices, handleActionButtons }) {
  const buttonsArray = ['Módosítás', 'Törlés'];

  const headerMap = [
    ['_id', 'Sorszám'],
    ['serviceName', 'Szolgáltatás neve'],
    ['serviceNote', 'Rövid leírás'],

  ];

  return (
    <div className="container">
      <table className="table table-striped">
        <thead>
          <tr>
            {headerMap.map((header, i) => (
              <th
                key={`header_${i + 1}`}
              >{headerMap[i][1]}</th>
            ))}
            <th
            >Műveletek</th>
          </tr>
        </thead>
        <tbody>
          {listOfServices.map((service, servIndex) => (
            <tr key={`tr_${servIndex + 1}`}>
              {headerMap.map((headerName, tdIndex) => {
                if (headerMap[tdIndex][0] === '_id') {
                  return (
                    <td key={`td_${tdIndex + 1}`}
                      className="text-center"
                    >{servIndex + 1}</td>
                  )
                }
                return (<td key={`td_${tdIndex + 1}`}>{service[headerName[0]]}</td>)

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