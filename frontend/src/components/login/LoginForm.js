import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import InputFieldSet from '../InputFieldSet';
import { backend } from '../../utilities'

// eslint-disable-next-line react/prop-types
export default function LoginForm({ user, setUser }) {
  const [fieldValues, setFieldValues] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    email: useRef(),
    password: useRef(),
  };

  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');

  function isNotEmpty(value) {
    return value !== '';
  }

  function checkEmail(value) {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return value.match(validRegex);
  }

  const validators = {
    email: {
      required: isNotEmpty,
      checkEmail,
    },
    password: {
      required: isNotEmpty,
    },
  };

  const errorTypes = {
    required: 'Value is missing',
    checkEmail: 'Not valid email',
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

    setFormAlertText('');
    setFormAlertType('');
    setFormWasValidated(false);

    const isValid = isFormValid();

    if (isValid) {
      fetch(`${backend.endpoint}/api/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: fieldValues.email,
          password: fieldValues.password,
        }),
      })
        .then(async (res) => {
          if (res.status === 400) {
            const response = await res.json();
            throw new Error(response?.error);
          }
          return res.json()
        })
        .then(res => {
          localStorage.setItem(
            'user',
            JSON.stringify(res.user)
          );
          setFieldValues({
            email: '',
            password: '',
          });
          setFormAlertText('');
          setFormAlertType('');
          setUser(res.user);
        })
        .catch(error => {
          setFormWasValidated(false);
          setFormAlertText(error.message);
          setFormAlertType('danger');
          setFieldValues({
            email: '',
            password: '',
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

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div className="d-flex justify-content-center">
      <form
        onSubmit={handleSubmit}
        noValidate
        className={`login-form needs-validation ${formWasValidated ? 'was-validated' : ''
          }`}
      >
        <InputFieldSet
          reference={references.email}
          name="email"
          labelText="Email"
          type="email"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.password}
          name="password"
          labelText="Password"
          type="password"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <button type="submit" className="btn login-btn">
          Login
        </button>
        {formAlertText && (
          <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
            {formAlertText}
          </div>
        )}
      </form>
    </div>
  );
}
