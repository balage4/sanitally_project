import { months } from "../../../../utilities";

/* eslint-disable react/prop-types */
export default function EventsTable({ listOfEvents }) {

  const headerMap = [
    ['_id', 'Sorszám'],
    ['userName', 'Páciens neve'],
    ['eventDate', 'Dátum'],
    ['eventTime', 'Időpont'],
    ['eventService', 'Szakterület'],
    ['eventProvider', 'Orvos neve']
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
                if (headerMap[i][0] === 'eventDate') {
                  const date = new Date(event.eventDate);
                  const dateString = `${date.getFullYear()}. ${months[date.getMonth()]} ${date.getDate()}.`;
                  return (
                    <td key={`td_${i + 1}`}>{dateString}</td>
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