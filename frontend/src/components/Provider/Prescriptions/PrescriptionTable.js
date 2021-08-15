/* eslint-disable react/prop-types */
export default function PrescriptionTable({ prescriptionsList }) {

  const headerMap = [
    ['_id', 'ID'],
    ['prescriptionFor', 'Felhasználó'],
    ['prescriptionVaccine', 'Gyógyszer'],
    ['prescriptionDosage', 'Adagolás'],
    ['prescriptionFrom', 'Szolgáltató neve']
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
          {prescriptionsList.map((prescription, prescriptionIndex) => (
            <tr key={`tr_${prescriptionIndex + 1}`}>
              {headerMap.map((headerName, i) => {
                if (headerMap[i][0] === '_id') {
                  return (
                    <td key={`td_${i + 1}`}>{i + 1}</td>
                  )
                }

                return (<td key={`td_${i + 1}`}>{prescription[headerName[0]]}</td>)
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}