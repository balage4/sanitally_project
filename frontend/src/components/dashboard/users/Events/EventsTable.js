/* eslint-disable react/prop-types */
export default function EventsTable({ listOfEvents }) {

  const headerMap = [
    ['_id', 'ID'],
    ['eventDate', 'Date'],
    ['eventService', 'Service'],
    ['eventProvider', 'Provider'],
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
          {listOfEvents.map((event, eventIndex) => (
            <tr key={`tr_${eventIndex + 1}`}>
              {headerMap.map((headerName, i) => {
                if (headerMap[i][0] === '_id') {
                  return (
                    <td key={`td_${i + 1}`}>{eventIndex + 1}</td>
                  )
                }
                return (<td key={`td_${i + 1}`}>{event[headerName[0]]}</td>)
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}