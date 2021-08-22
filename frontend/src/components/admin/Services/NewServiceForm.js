/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import InputFieldSet from '../../InputFieldSet';
import fetchWithAuth, { backend } from '../../../utilities';

export default function NewServiceForm({ token, id, serviceData }) {
  const [fieldValues, setFieldValues] = useState(() => {
    if (serviceData) {
      return {
        serviceName: serviceData.serviceName,
        serviceNote: serviceData.serviceNote,
      };
    } return {
      serviceName: '',
      serviceNote: '',
    }
  }
  );

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
    required: 'Hiányzó adat!'
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

      const fetchBody = {
        new: {
          serviceName: fieldValues.serviceName,
          serviceNote: fieldValues.serviceNote,
        },
        update: {
          serviceName: fieldValues.serviceName,
          serviceNote: fieldValues.serviceNote,
        }
      }

      try {
        const fetchData = {
          url: id ? `${backend.endpoint}/admin/services/${id}` : `${backend.endpoint}/admin/services/new`,
          method: id ? 'PUT' : 'POST',
          body: id ? fetchBody.update : fetchBody.new
        }
        const res = await fetchWithAuth(
          fetchData.url,
          token,
          fetchData.method,
          JSON.stringify(id ? fetchBody.update : fetchBody.new));
        if (res.status < 200 || res.status >= 300) throw new Error(res.error);
        setFieldValues({
          serviceName: '',
          serviceNote: '',
        });
        setFormAlertText(id ? 'Sikeres módosítás' : 'Sikeres mentés');
        setFormAlertType('primary');
      } catch (err) {
        setFormWasValidated(false);
        setFormAlertText(err.message);
        setFormAlertType('danger');
        setFieldValues({
          serviceName: '',
          serviceNote: '',
        });
      }
    }
  }

  function handleInputBlur(e) {
    const fieldName = e.target.name;
    validateField(fieldName);
  }

  return (
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
      <button type="submit" className="btn submit-btn">
        {serviceData ? 'Módosítás' : 'Rögzítés'}
      </button>
      {formAlertText && (
        <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
          {formAlertText}
        </div>
      )}
    </form>

  );
}
