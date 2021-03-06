/* eslint-disable react/prop-types */
import React, { useState, useRef, useEffect } from 'react';
import fetchWithAuth, { backend } from '../../../utilities';
import InputFieldSet from '../../InputFieldSet';

// eslint-disable-next-line no-unused-vars
export default function NewPrescriptionForm({ user }) {

  const [usersFullNameArray, setUsersFullName] = useState(null);

  const [fieldValues, setFieldValues] = useState({
    prescriptionFor: '',
    prescriptionVaccine: '',
    prescriptionDosage: '',
  });

  const [errors, setErrors] = useState({
    prescriptionFor: '',
    prescriptionVaccine: '',
    prescriptionDosage: '',
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    prescriptionFor: useRef(),
    prescriptionVaccine: useRef(),
    prescriptionDosage: useRef(),
  };

  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');

  function isNotEmpty(value) {
    return value !== '';
  }

  const validators = {
    prescriptionFor: {
      required: isNotEmpty,
    },
    prescriptionVaccine: {
      required: isNotEmpty,
    },
    prescriptionDosage: {
      required: isNotEmpty
    }
  };

  const errorTypes = {
    required: 'Hiányzó adat!'
  };


  async function fetchUserNames() {
    try {
      const res = await fetchWithAuth(`${backend.endpoint}/admin/users`, user.token);
      if (res.status < 200 || res.status >= 300) throw new Error(res);
      const usersFullName = [];
      res.users.forEach(resUser => {
        if (resUser.role === 'user') {
          usersFullName.push(`${resUser.lastName} ${resUser.firstName}`)
        }
      });
      setUsersFullName(usersFullName);

    } catch (err) {
      setFormAlertText(err.message);
      setFormAlertType('danger')
    }
  }

  useEffect(() => {
    fetchUserNames();
  }, []);

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
    setFormAlertText('');
    setFormAlertType('');
    setFormWasValidated(false);

    if (isFormValid()) {

      const prescriptionData = {
        prescriptionFor: fieldValues.prescriptionFor,
        prescriptionVaccine: fieldValues.prescriptionVaccine,
        prescriptionDosage: fieldValues.prescriptionDosage,
        prescriptionFrom: user.email
      }
      try {
        const res = await fetchWithAuth(
          `${backend.endpoint}/provider/prescriptions/new`,
          user.token,
          'POST',
          JSON.stringify(prescriptionData)
        );
        if (res.status < 200 || res.status >= 300) throw new Error(res.error);
        setFormAlertText('Recept sikeresen elmentve.');
        setFormAlertType('primary');
        setTimeout(() => {
          setFormAlertText(null);
        }, 2000);
      } catch (err) {
        setFormAlertText(err.message);
        setFormAlertType('danger');
      }

    }
    setFormWasValidated(true);
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
        reference={references.prescriptionFor}
        name="prescriptionFor"
        labelText="Páciens neve"
        type="select"
        errors={errors}
        fieldValues={fieldValues}
        handleInputBlur={handleInputBlur}
        handleInputChange={handleInputChange}
        optionsarray={usersFullNameArray}
        required
      />
      <InputFieldSet
        reference={references.prescriptionVaccine}
        name="prescriptionVaccine"
        labelText="Gyógyszer, vakcina neve"
        type="text"
        errors={errors}
        fieldValues={fieldValues}
        handleInputBlur={handleInputBlur}
        handleInputChange={handleInputChange}
        required
      />
      <InputFieldSet
        reference={references.prescriptionDosage}
        name="prescriptionDosage"
        labelText="Adagolás"
        type="text"
        errors={errors}
        fieldValues={fieldValues}
        handleInputBlur={handleInputBlur}
        handleInputChange={handleInputChange}
        required
      />
      <button type="submit" className="btn submit-btn">
        Recept rögzítése
      </button>
      {formAlertText && (
        <div className={`text-center alert mt-3 alert-${formAlertType}`} role="alert">
          {formAlertText}
        </div>
      )}
    </form>
  );
}
