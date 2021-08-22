/* eslint-disable react/prop-types */
import { useParams } from 'react-router-dom';
import '../../../scss/printPreview.scss';

export default function PrintPreview({ user }) {

  const { provider } = useParams();

  return (
    <div className="book">
      <div className="page">
        Hello {provider}
        Bello{user.firstName}
        <div className="subpage">Page 1/2</div>
      </div>
      <div className="page">
        <div className="subpage">Page 2/2</div>
      </div>
    </div>

  )
}