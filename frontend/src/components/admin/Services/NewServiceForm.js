/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import InputFieldSet from '../../InputFieldSet';

export default function NewServiceForm({ token }) {
  const [fieldValues, setFieldValues] = useState({
    serviceName: '',
    serviceNote: '',
  });

  const [errors, setErrors] = useState({
    serviceName: '',
    serviceNote: '',
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    serviceName: useRef(),
    serviceNote: useRef(),
  };

  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');

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

  const backend = {
    protocol: 'http',
    host: 'localhost',
    port: 5000,
  };

  const backendUrl = `${backend.protocol}://${backend.host}:${backend.port}`;

  const endpoint = {
    newService: `${backendUrl}/api/admin/services/new`,
  };

  function handleSubmit(e) {
    e.preventDefault();
    setFormAlertText('');
    setFormAlertType('');
    setFormWasValidated(false);

    const isValid = isFormValid();

    if (isValid) {
      fetch(endpoint.newService, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          serviceName: fieldValues.serviceName,
          serviceNote: fieldValues.serviceNote,
        }),
      })
        .then(res => res.json())
        .then(res => {
          if (res.status < 200 || res.status >= 300) throw new Error(res?.error);
          setFieldValues({
            serviceName: '',
            serviceNote: '',
          });
          setFormAlertText('Sikeres mentés');
          setFormAlertType('primary');
        })
        .catch(error => {
          setFormWasValidated(false);
          setFormAlertText(error.message);
          setFormAlertType('danger');
          setFieldValues({
            serviceName: '',
            serviceNote: '',
          });
        });
    }
    setFormWasValidated(true);
    setFormAlertText('');
    setFormAlertType('');
  }

  function handleInputBlur(e) {
    const fieldName = e.target.name;
    validateField(fieldName);
  }

  return (
    <main className="d-flex justify-content-center py-5">
      <form
        onSubmit={handleSubmit}
        noValidate
        className={`needs-validation ${formWasValidated ? 'was-validated' : ''
          }`}
      >
        <InputFieldSet
          reference={references.serviceName}
          name="serviceName"
          labelText="Szolgáltatás neve"
          type="text"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.serviceNote}
          name="serviceNote"
          labelText="Szolgáltatás rövid leírása"
          type="textarea"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <button type="submit" className="btn login-btn">
          Rögzítés
        </button>
        {formAlertText && (
          <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
            {formAlertText}
          </div>
        )}
      </form>
    </main>
  );
}
