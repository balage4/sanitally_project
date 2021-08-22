/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import '../../../scss/printPreview.scss';

export default function PrintPreview({ user }) {

  const { provider, vaccine, dosage, date } = useParams();

  return (
    <div className="book">
      <div className="page">
        <div className="subpage">
          <h3>SanitAlly recept</h3>
          <table className="print-table">
            <thead>
              <tr>
                <th>Kiállítás dátuma</th>
                <th>Recept kiállítója</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{date}</td>
                <td>{provider}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>Páciens neve</th>
                <th>Gyógyszer neve</th>
                <th>Előírt adagolás</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{`${user.lastName} ${user.firstName}`}</td>
                <td>{vaccine}</td>
                <td>{dosage}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

  )
}