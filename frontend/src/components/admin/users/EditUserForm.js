/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import fetchWithAuth, { backend, getServiceIdByName, /* getServiceNameById */ } from "../../../utilities";
import InputFieldSet from "../../InputFieldSet";
import AuthenticatedNavbar from "../../../Common/navbars/authenticatedNavbar/AuthenticatedNavbar";
import '../../../scss/editUser.scss'

export default function EditUserForm({ user, setUser }) {
  const { id } = useParams();

  const [fieldValues, setFieldValues] = useState({
    firstName: '',
    lastName: '',
    role: '',
    providerTitle: ''
  });

  const [servicesArray, setServicesArray] = useState([]);
  const [servicesResponse, setServicesResponse] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  async function getServicesArray() {
    try {
      const res = await fetchWithAuth(
        `${backend.endpoint}/services`,
        user.token, 'GET', null);
      if (res.status < 200 || res.status >= 300) throw new Error(res?.error);
      const servicesList = [];
      res.services.forEach(service => {
        servicesList.push(service.serviceName)
      });
      setServicesArray(servicesList);
      setServicesResponse(res.services);
    } catch (err) { setSuccessMessage(err.message) }
  }

  const rolesArray = [
    'user',
    'provider',
    'admin',
  ];

  async function getUserData() {
    try {
      const res = await fetchWithAuth(`${backend.endpoint}/admin/users/${id}`, user.token, 'GET', null);
      if (res.status < 200 || res.status >= 300) throw new Error(res?.error);

      setFieldValues({
        firstName: res.singleUser.firstName ? res.singleUser.firstName : '',
        lastName: res.singleUser.lastName ? res.singleUser.lastName : '',
        role: res.singleUser.role ? res.singleUser.role : '',
        providerTitle: res.singleUser.providerTitle ? res.singleUser.providerTitle.serviceName : ''
      });
    } catch (err) {
      setSuccessMessage(err.message);
    }
  }

  useEffect(() => {
    getUserData();
    getServicesArray();
  }, []);


  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    role: '',
    providerTitle: ''
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    firstName: useRef(),
    lastName: useRef(),
    role: useRef(),
    providerTitle: useRef()
  };

  function isNotEmpty(value) {
    return value !== '';
  }

  const validators = {
    serviceName: {
      required: isNotEmpty,
    },
    serviceNote: {
      required: isNotEmpty,
    },
  };

  const errorTypes = {
    required: 'Value is missing'
  };

  function validateField(fieldName) {
    const value = fieldValues[fieldName];
    let isValid = true;
    setErrors(previousErrors => ({
      ...previousErrors,
      [fieldName]: '',
    }));
    references[fieldName].current.setCustomValidity('');

    if (validators[fieldName] !== undefined) {
      for (const [validationType, validatorFn] of Object.entries(
        validators[fieldName]
      )) {
        if (isValid) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = errorTypes[validationType];
            setErrors(previousErrors => ({
              ...previousErrors,
              [fieldName]: errorText,
            }));
            references[fieldName].current.setCustomValidity(errorText);
          }
        }
      }
    }
    return isValid;
  }

  function isFormValid() {
    let isValid = true;
    for (const fieldName of Object.keys(fieldValues)) {
      const isFieldValid = validateField(fieldName);
      if (!isFieldValid) {
        isValid = false;
      }
    }
    return isValid;
  }

  function handleInputChange(e) {
    const fieldValue = e.target.value;
    const fieldName = e.target.name;
    setFieldValues({
      ...fieldValues,
      [fieldName]: fieldValue,
    });
    setErrors(previousErrors => ({
      ...previousErrors,
      [fieldName]: '',
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setFormWasValidated(false);

    if (isFormValid()) {
      try {
        const { providerTitle } = fieldValues;
        const serviceId = getServiceIdByName(servicesResponse, providerTitle);
        fieldValues.providerTitle = serviceId;
        const res = await fetchWithAuth(`${backend.endpoint}/admin/users`,
          user.token,
          'PUT', JSON.stringify({
            id,
            updateData: fieldValues
          }));
        setSuccessMessage(res.message);
      } catch (err) {
        setSuccessMessage(err.message);
      }
    }
    setFormWasValidated(true);
    setSuccessMessage('');
  }

  function handleInputBlur(e) {
    const fieldName = e.target.name;
    validateField(fieldName);
  }

  return (
    <div className="edit-user">
      <AuthenticatedNavbar user={user} setUser={setUser} />
      <h3 className="mt-4">Felhasználó adatainak módosítása</h3>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={`needs-validation ${formWasValidated ? 'was-validated' : ''
          }`}
      >
        <InputFieldSet
          reference={references.lastName}
          name="lastName"
          labelText="Vezetéknév"
          type="text"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.firstName}
          name="firstName"
          labelText="Keresztnév"
          type="text"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.role}
          name="role"
          labelText="Jogosultság"
          type="select"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          optionsarray={rolesArray}
          required
        />
        <InputFieldSet
          reference={references.providerTitle}
          name="providerTitle"
          labelText="Szakterület"
          type="select"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          optionsarray={servicesArray}
          disabled={fieldValues.role !== 'provider'}
        />
        <button type="submit" className="btn submit-btn">
          Módosítás
        </button>
        {successMessage && (
          <div className="alert submit-btn mt-3" role="alert">
            {successMessage}
          </div>
        )}
      </form>
      <Link
        className="btn return-btn"
        to="/admin/users">Vissza</Link>
    </div>
  );
}