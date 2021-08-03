import { useEffect, useState } from "react"
import fetchWithAuth from "../../../utilities"

/* eslint-disable react/prop-types */
export default function PrescriptionList({ user }) {

  const [prescriptions, setPrescriptions] = useState(null);

  const {
    REACT_APP_BACKEND_PROTOCOL,
    REACT_APP_BACKEND_HOST,
    REACT_APP_BACKEND_PORT,
    REACT_APP_BACKEND_ROUTE,
  } = process.env;

  const endpoint = {
    prescriptionsByUser: `${REACT_APP_BACKEND_PROTOCOL}://${REACT_APP_BACKEND_HOST}:${REACT_APP_BACKEND_PORT}/${REACT_APP_BACKEND_ROUTE}/prescriptions/${user.email}`
  }

  useEffect(() => {
    const res = fetchWithAuth(endpoint.prescriptionsByUser, user.token, 'GET', null);
    setPrescriptions(res.prescriptions);

  }, [])
  return (
    <div>
      {console.log(prescriptions)}
    </div>
  )
}