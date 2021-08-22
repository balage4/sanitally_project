import React, { useState, useRef } from 'react';
import { Redirect } from "react-router-dom";
import validator from 'validator';
import InputFieldSet from "../InputFieldSet";
import '../../scss/registration.scss';
import { backend } from '../../utilities';
import registerIcon from '../../assets/registerIcon.png';

export default function RegistrationForm() {
  const [fieldValues, setFieldValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);

  const [formWasValidated, setFormWasValidated] = useState(false);

  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');

  const references = {
    firstName: useRef(),
    lastName: useRef(),
    email: useRef(),
    password: useRef()
  };

  const errorTypes = {
    required: "Hiányzó adat!",
    email: "Helytelen e-mail cím",
    passwordType: "A jelszó minimum 8 karakter hosszú, tartalmaz számot, nagybetűt és speciális karaktert!"
  };

  function isNotEmpty(value) {
    return value !== '';
  }

  const isEmailValid = (value) => validator.isEmail(value)

  function isStrongPassword(value) {
    return validator.isStrongPassword(value, {
      minLength: 8, minLowercase: 1,
      minUppercase: 1, minNumbers: 1, minSymbols: 1
    })
  }

  const validators = {
    firstName: {
      required: isNotEmpty
    },
    lastName: {
      required: isNotEmpty
    },
    email: {
      required: isNotEmpty,
      email: isEmailValid
    },
    password: {
      required: isNotEmpty,
      passwordType: isStrongPassword,
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

  function handleSubmit(e) {
    e.preventDefault();

    setFormAlertText('');
    setFormAlertType('');
    setFormWasValidated(true);

    const isValid = isFormValid();

    if (isValid) {
      fetch(`${backend.endpoint}/register`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(fieldValues)
      }).then((response) => {
        if (response.status < 200 || response.status >= 300) {
          const err = new Error();
          err.response = response;
          throw err;
        }
        if (response.status === 201) {
          setFormWasValidated(true);
          setFormAlertText('Sikeres regisztráció! Átirányítás a bejelentkezéshez...');
          setFormAlertType('primary');
          setTimeout(() => {
            setIsRegisterSuccess(true);
          }, 2000);
        }
      }).catch((error) => {
        if (error.response) {
          error.response.json().then(data => {
            setFormWasValidated(false);
            setFormAlertText(data.error);
            setFormAlertType('danger');
            setIsRegisterSuccess(false);
          })
        } else {
          setFormWasValidated(false);
          setFormAlertText("Ismeretlen hiba történt");
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
    <form onSubmit={handleSubmit} noValidate
      className={`needs-validation ${formWasValidated ? 'was-validated' : ''}`}>
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
        reference={references.email}
        name="email"
        labelText="E-mail cím"
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
        labelText="Jelszó"
        type="password"
        errors={errors}
        fieldValues={fieldValues}
        handleInputBlur={handleInputBlur}
        handleInputChange={handleInputChange}
        required
      />

      <button type="submit" className="btn submit-btn">Regisztráció</button>

      {formAlertText &&
        <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
          {formAlertText}
        </div>
      }
      <div className="login-key d-flex justify-content-center m-4">
        <img src={registerIcon} alt="login-key" width="80" />
      </div>
    </form>
  )
}