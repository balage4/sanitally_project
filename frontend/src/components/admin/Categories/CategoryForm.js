/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import fetchWithAuth, { backend } from '../../../utilities';
import InputFieldSet from '../../InputFieldSet';

export default function CategoryForm({ token, category }) {

  const [fieldValues, setFieldValues] = useState({
    categoryName: category.categoryName,
    categoryNotes: category.categoryNotes
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  const [errors, setErrors] = useState({
    categoryName: '',
    categoryNotes: ''
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    categoryName: useRef(),
    categoryNotes: useRef(),
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
        id: category._id,
        updateData: {
          categoryName: fieldValues.categoryName,
          categoryNotes: fieldValues.categoryNotes,
        }
      }

      try {
        const response = await fetchWithAuth(`${backend.endpoint}/admin/categories`,
          token,
          'PUT',
          JSON.stringify(fetchBody));
        setSuccessMessage(response.message);
      } catch (err) {
        setFetchError(err.message);
      }
    }
  }

  function handleInputBlur(e) {
    const fieldName = e.target.name;
    validateField(fieldName);
  }

  return (
    <main className="d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        noValidate
        className={`needs-validation ${formWasValidated ? 'was-validated' : ''
          }`}
      >
        <InputFieldSet
          reference={references.categoryName}
          name="categoryName"
          labelText="Kategória neve"
          type="text"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.categoryNotes}
          name="categoryNotes"
          labelText="Kategória rövid leírása"
          type="textarea"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Módosítás</button>
      </form>
      {successMessage && <div className="alert alert-info">{successMessage}</div>}
      {fetchError && <div className="alert alert-danger">{fetchError}</div>}
    </main>
  );
}
