/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import fetchWithAuth, { backend } from '../../../../utilities';
import InputFieldSet from "../../../InputFieldSet";

export default function NewEventForm({ user }) {

  const [servicesArray, setServicesArray] = useState([]);
  const [providersArray, setProvidersArray] = useState([]);

  const [fetchError, setFetchError] = useState(null);


  async function getServiceList() {
    try {
      const res = await fetchWithAuth(
        `${backend.endpoint}/services`,
        user.token,
        'GET',
        null
      );
      if (res.status < 200 || res.status >= 300) throw new Error(res?.error);
      const servicesList = [];
      res.services.forEach(service => {
        servicesList.push(service.serviceName)
      });
      setServicesArray(servicesList);
    } catch (err) { setFetchError(err.message) };
  }

  useEffect(() => {
    getServiceList();
  }, [])


  const [fieldValues, setFieldValues] = useState({
    eventDate: '',
    eventTime: '',
    eventService: '',
    eventProvider: ''
  });

  const [errors, setErrors] = useState({
    eventDate: '',
    eventTime: '',
    eventService: '',
    eventProvider: ''
  });

  async function getProviderListByService() {
    const choosedService = fieldValues.eventService;
    if (choosedService) {
      try {
        const res = await fetchWithAuth(
          `${backend.endpoint}/users/${choosedService}`,
          user.token,
          'GET', null
        );
        if (res.status < 200 || res.status >= 300) throw new Error(res?.error);

        const providers = [];

        res.providers.forEach(provider => {
          providers.push(`${provider.lastName} ${provider.firstName}`)
        })

        setProvidersArray(providers);
      } catch (err) { setFetchError(err.message) };
    }
  }

  const [formWasValidated, setFormWasValidated] = useState(false);
  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');

  const references = {
    eventDate: useRef(),
    eventTime: useRef(),
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

  async function handleSubmit(e) {
    e.preventDefault();

    setFormAlertText('');
    setFormAlertType('');
    setFormWasValidated(false);

    if (isFormValid()) {
      try {
        const res = await fetchWithAuth(`${backend.endpoint}/events/new`,
          user.token,
          'POST', JSON.stringify({
            userEmail: user.email,
            eventDate: fieldValues.eventDate,
            eventTime: fieldValues.eventTime,
            eventService: fieldValues.eventService,
            eventProvider: fieldValues.eventProvider
          }));
        if (res.status < 200 || res.status >= 300) throw new Error(res.message);
        setFormAlertText('Event Succesfully saved.');
      } catch (err) { setFormAlertText(err.message) }
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
    getProviderListByService();
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
          optionsarray={servicesArray}
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
          optionsarray={providersArray}
          required
        />
        <InputFieldSet
          reference={references.eventDate}
          name="eventDate"
          labelText="Esemény dátuma"
          type="date"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.eventTime}
          name="eventTime"
          labelText="Esemény időpontja"
          type="time"
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