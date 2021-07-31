/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import fetchWithAuth from "../../../utilities";
import InputFieldSet from "../../InputFieldSet";

export default function EditUserForm({ user }) {
  const { id } = useParams();

  const [fieldValues, setFieldValues] = useState({
    firstName: '',
    lastName: '',
    role: '',
    provider: ''
  });

  const [formAlertText, setFormAlertText] = useState('');


  async function getUserData() {
    try {
      const res = fetchWithAuth(`http://localhost:5000/api/admin/users/${id}`);
      if (res.status < 200 || res.status >= 300) throw new Error(res?.error);
      setFieldValues({
        firstName: res.userData.firstName,
        lastName: res.userData.lastName,
        role: res.userData.role,
        provider: res.userData.provider
      });
    } catch (err) { setFormAlertText(err.message); }
  }

  useEffect(() => {
    getUserData();
  }, []);


  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    role: '',
    provider: ''
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    firstName: useRef(),
    lastName: useRef(),
    role: useRef(),
    provider: useRef()
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

  const backend = {
    protocol: 'http',
    host: 'localhost',
    port: 5000,
  };

  const backendUrl = `${backend.protocol}://${backend.host}:${backend.port}`;

  const endpoint = {
    editUser: `${backendUrl}/api/admin/users/${id}`
  };

  function handleSubmit(e) {
    e.preventDefault();
    setFormAlertText('');
    setFormWasValidated(false);

    if (isFormValid()) {
      try {
        fetchWithAuth(endpoint.editUser, user.token, 'PUT', fieldValues);
      } catch (err) {
        setFormAlertText(err.message);
      }
    }
    setFormWasValidated(true);
    setFormAlertText('');
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
          reference={references.firstName}
          name="firstName"
          labelText="First Name"
          type="text"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.lastName}
          name="lastName"
          labelText="Last Name"
          type="textarea"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.role}
          name="role"
          labelText="Role"
          type="textarea"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.provider}
          name="provider"
          labelText="Provider"
          type="textarea"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <button type="submit" className="btn login-btn">
          Módosítás
        </button>
        {formAlertText && (
          <div className="alert mt-3 alert-danger" role="alert">
            {formAlertText}
          </div>
        )}
      </form>
    </main>
  );
}