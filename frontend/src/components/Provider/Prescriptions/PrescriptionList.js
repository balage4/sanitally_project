import { useEffect, useState } from "react"
import fetchWithAuth, { backend, listOfPrescriptionsStringify } from "../../../utilities"
import PrescriptionTable from "./PrescriptionTable";

/* eslint-disable react/prop-types */
export default function PrescriptionList({ user }) {

  const [prescriptionsList, setPrescriptionsList] = useState(null);
  const [fetchError, setFetchError] = useState(null);



  useEffect(async () => {
    try {
      const prescriptionResponse = await fetchWithAuth(`${backend.endpoint}/prescriptions/${user.email}`, user.token);
      const userResponse = await fetchWithAuth(`${backend.endpoint}/admin/users`, user.token);
      if (prescriptionResponse.status < 200 || prescriptionResponse.status >= 300 || !prescriptionResponse) throw new Error(userResponse.error);
      if (userResponse.status < 200 || userResponse.status >= 300 || !userResponse) throw new Error(userResponse.error);


      const prescriptionString = await listOfPrescriptionsStringify(prescriptionResponse.prescriptions, userResponse.users);

      setPrescriptionsList(prescriptionString);

    } catch (err) {
      setFetchError(err.message);
    }



  }, []);

  return (
    <div>
      {prescriptionsList && <PrescriptionTable prescriptionsList={prescriptionsList} />}
      {fetchError && (
        <div className="alert alert-danger" role="alert">
          {fetchError}
        </div>
      )}
    </div>

  )
}
