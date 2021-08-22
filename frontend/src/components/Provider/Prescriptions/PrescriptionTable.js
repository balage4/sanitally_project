/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { months } from "../../../utilities";

export default function PrescriptionTable({ prescriptionsList }) {

  const headerMap = [
    ['_id', 'Sorszám'],
    ['prescriptionFor', 'Felhasználó'],
    ['prescriptionVaccine', 'Gyógyszer'],
    ['prescriptionDosage', 'Adagolás'],
    ['prescriptionFrom', 'Recept kiállítója'],
    ['createdAt', 'Kiállítás időpontja']
  ];

  let prescriptionDate;

  return (
    <div className="container">
      <table className="table table-striped">
        <thead className="p-2">
          <tr>
            {headerMap.map((header, i) => (
              <th
                key={`th_${i + 1}`}
              >{headerMap[i][1]}</th>
            ))}
            <th>Előnézet</th>
          </tr>
        </thead>
        <tbody>
          {
            prescriptionsList.map((prescription, prescriptionIndex) => (
              <tr key={`tr_${prescriptionIndex + 1}`}>
                {headerMap.map((headerName, i) => {
                  if (headerMap[i][0] === '_id') {
                    return (
                      <td key={`td_${i + 1}`}>{i + 1}</td>
                    )
                  }
                  if (headerMap[i][0] === 'createdAt') {
                    const mongoDate = new Date(prescription.createdAt);
                    prescriptionDate = `${mongoDate.getFullYear()}. ${months[mongoDate.getMonth()]} ${mongoDate.getDate()}.`;
                    return (
                      <td key={`td_${i + 1}`}>{prescriptionDate}</td>
                    )
                  }
                  return (<td key={`td_${i + 1}`}>{prescription[headerName[0]]}</td>)
                })}
                <td>
                  <Link
                    className="btn submit-btn"
                    to={`/prescriptions/preview/${prescription.prescriptionFrom}/${prescription.prescriptionVaccine}/${prescription.prescriptionDosage}/${prescriptionDate}`}
                    target="_blank"
                  >Nyomtat</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}