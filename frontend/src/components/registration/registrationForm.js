import React, {useState, useRef } from 'react';
import { useHistory, Redirect } from "react-router-dom";

import validator from 'validator';
  
import InputFieldSet from "../InputFieldSet";

import '../../scss/Registrate.scss'

export default function Registrate() {
    const [fieldValues, setFieldValues] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });

    const [errors, setErrors] = useState({
      firstName: "",
      lastName: "",
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
      required: "Value is missing",
      email: "Not valid email",
      passwordType: "Password should contain: 8 character, lowercase/uppercase, number, special character."
    };
  
    function isNotEmpty(value) {
      return value !== '';
    }

    const isEmailValid = (value) => validator.isEmail(value)
    
    function isStrongPassword(value){
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

    const backendUrl = "http://localhost:5000/api/register"

    async function handleSubmit(e) {  
      e.preventDefault();

      setFormAlertText('');
      setFormAlertType('');
      setFormWasValidated(false);
  
      const isValid = isFormValid();
  
      if (isValid) {
        await fetch(backendUrl, {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            firstName: fieldValues.firstName,
            lastName: fieldValues.lastName,
            email: fieldValues.email,
            password: fieldValues.password
          })
        })
        .then((response) => {

          setFieldValues(response.data)

        })   
        .then((response) => {
          if (response.status < 200 || response.status >= 300 ) {
            setFormAlertText(response.error)
          } else {
            // redirect
            const history = useHistory();
            history.push("/login")
            setIsRegisterSuccess(true);
          }
        })
        .catch((error) => {
          setFormAlertText("Error fetching data: ", error.message);
        })
      }
  
      setFormWasValidated(true);
    }

    function handleInputChange(e) {
      const {value} = e.target;
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
      const {name} = e.target;
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
                reference={references.firstName}
                name="firstName"
                labelText="First Name"
                type="firstName"
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
                type="lastName"
                errors={errors}
                fieldValues={fieldValues}
                handleInputBlur={handleInputBlur}
                handleInputChange={handleInputChange}
                required
              />
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

            <button type="submit" className="btn">Registrate</button>

            </form>

            {formAlertText &&
            <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
              {formAlertText}
            </div>
            } 

        </main>
    )
}
