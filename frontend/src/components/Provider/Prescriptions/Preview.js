/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import '../../../scss/preview.scss';

export default function Preview({ user }) {

  const { provider, vaccine, dosage } = useParams();

  return (
    <div className="m-3 p-3 border border-dark col-10 m-auto">

      <h2 className="m-3">SanitAlly recept</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Recept kiállítója</th>
            <th>Szakterület</th>
            <th>Beteg neve</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{provider}</td>
            <td>{`${user.lastName} ${user.firstName}`}</td>
            <td>{vaccine}</td>
            <td>{dosage}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}