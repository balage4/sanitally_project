/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import InputFieldSet from "../../../InputFieldSet";

export default function NewEventForm({ user }) {

  const [providerList, setProviderList] = useState([]);
  const [fetchError, setFetchError] = useState(null);

  async function getServiceList() {
    const options = {
      method: 'GET',
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      },
      body: null,
    }
    fetch('http://localhost:5000/api/services', options)
      .then(res => res.json())
      .then(res => {
        if (res.status < 200 || res.status >= 300) throw new Error(res?.error);
        const servicesArray = [];
        res.services.forEach(service => {
          servicesArray.push(service.serviceName)
        });
        setProviderList(servicesArray);
      }).catch(err => setFetchError(err.message));
  }

  useEffect(() => {
    getServiceList();
  }, [])


  const [fieldValues, setFieldValues] = useState({
    eventDate: '',
    eventService: '',
    eventProvider: ''
  });

  const [errors, setErrors] = useState({
    eventDate: '',
    eventService: '',
    eventProvider: ''
  });

  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const [formWasValidated, setFormWasValidated] = useState(false);

  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');

  const references = {
    eventDate: useRef(),
    eventService: useRef(),
    eventProvider: useRef()
  };

  const errorTypes = {
    required: "Value is missing",
  };

  function isNotEmpty(value) {
    return value !== '';
  }

  const validators = {
    eventDate: {
      required: isNotEmpty
    },
    eventService: {
      required: isNotEmpty
    },
    eventProvider: {
      required: isNotEmpty
    }
  }

  function validateField(fieldName) {
    const value = fieldValues[fieldName];
    let isValid = true;
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: ''
    }));
    references[fieldName].current.setCustomValidity('');

    if (validators[fieldName] !== undefined) {
      // eslint-disable-next-line no-restricted-syntax
      for (const [validationType, validatorFn] of Object.entries(validators[fieldName])) {
        if (isValid !== false) {
          isValid = validatorFn(value);
          if (!isValid) {
            const errorText = errorTypes[validationType];
            setErrors((previousErrors) => ({
              ...previousErrors,
              [fieldName]: errorText
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

  const backend = {
    protocol: 'http',
    host: '127.0.0.1',
    port: 5000,
  };

  const backendUrl = `${backend.protocol}://${backend.host}:${backend.port}`;

  const endpoint = {
    newEvent: `${backendUrl}/api/events/new`,
  };

  function handleSubmit(e) {
    e.preventDefault();

    setFormAlertText('');
    setFormAlertType('');
    setFormWasValidated(false);

    const isValid = isFormValid();


    if (isValid) {
      fetch(endpoint.newEvent, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}`
        },
        body: JSON.stringify({
          userEmail: user.email,
          eventDate: fieldValues.eventDate
        })
      })
        .then((response) => {
          if (response.status < 200 || response.status >= 300) {
            const err = new Error();
            err.response = response;
            throw err;
          }
          if (response.status === 204) {
            setFormWasValidated(true);
            setFormAlertText('');
            setFormAlertType('');
            setIsRegisterSuccess(true);
          }
        })
        .catch((error) => {
          if (error.response) {
            error.response.json().then(data => {
              setFormWasValidated(false);
              setFormAlertText(data.error);
              setFormAlertType('danger');
              setIsRegisterSuccess(false);
            })
          } else {
            setFormWasValidated(false);
            setFormAlertText("unknown error");
            setFormAlertType('danger');
            setIsRegisterSuccess(false);
          }
        })
    }
  }

  function handleInputChange(e) {
    const { value } = e.target;
    const fieldName = e.target.name;
    setFieldValues({
      ...fieldValues,
      [fieldName]: value
    });
    setErrors((previousErrors) => ({
      ...previousErrors,
      [fieldName]: ''
    }));
  }

  function handleInputBlur(e) {
    const { name } = e.target;
    validateField(name);
  }

  if (isRegisterSuccess) {
    return <Redirect to="/login" />;
  }

  return (
    <main className="registrate d-flex justify-content-center">
      <form onSubmit={handleSubmit} noValidate
        className={`text-center my-4 mb-3 needs-validation ${formWasValidated ? 'was-validated' : ''}`}>

        <InputFieldSet
          reference={references.eventService}
          name="eventService"
          labelText="Szolgáltatás típusa"
          type="select"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
          optionsArray={providerList}
        />
        <InputFieldSet
          reference={references.eventProvider}
          name="eventProvider"
          labelText="Szakember kiválasztása"
          type="select"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.eventDate}
          name="eventDate"
          labelText="Esemény időpontja"
          type="date"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />

        <button type="submit" className="btn btn-primary">Esemény rögzítése</button>

        {formAlertText &&
          <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
            {formAlertText}
          </div>
        }
        {fetchError && (
          <div className="alert alert-danger" role="alert">
            {fetchError}
          </div>
        )}

      </form>
    </main>
  )
}