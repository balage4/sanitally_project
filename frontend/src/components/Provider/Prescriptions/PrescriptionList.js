import { useEffect, useState } from "react"
import fetchWithAuth, { backend } from "../../../utilities"

/* eslint-disable react/prop-types */
export default function PrescriptionList({ user }) {

  const [prescriptions, setPrescriptions] = useState(null);


  useEffect(() => {
    const res = fetchWithAuth(`${backend.endpoint}/prescriptions/${user.email}`, user.token);
    setPrescriptions(res.prescriptions);

  }, [])
  return (
    <div>
      <p className="m-3">Önnek nincs megtekinthető receptje!</p>
      {console.log(prescriptions)}
    </div>
  )
}