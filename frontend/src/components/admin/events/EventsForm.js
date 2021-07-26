import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import InputFieldSet from '../../InputFieldSet';

// eslint-disable-next-line
export default function EventsForm({ type, event, id }) {
  const [fieldValues, setFieldValues] = useState(
    type === 'edit'
      ? event
      : {
          title: '',
          startTime: '',
          endTime: '',
          appointmentDurationTime: '',
          facilitators: '',
          participants: '',
        }
  );

  const [errors, setErrors] = useState({
    title: '',
    startTime: '',
    endTime: '',
    appointmentDurationTime: '',
    facilitators: '',
    participants: '',
  });

  const [isCreateEventSuccess, setIsCreateEventSuccess] = useState(false);

  const [formWasValidated, setFormWasValidated] = useState(false);

  const references = {
    title: useRef(),
    startTime: useRef(),
    endTime: useRef(),
    appointmentDurationTime: useRef(),
    facilitators: useRef(),
    participants: useRef(),
  };

  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');

  function isNotEmpty(value) {
    return value !== '';
  }

  function checkEmail(value) {
    const emails = value.split(',');
    let valid = true;
    const regex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    for (let i = 0; i < emails.length; i += 1) {
      if (emails[i] === '') {
        valid = true;
      } else if (
        emails[i] === '' ||
        !regex.test(emails[i].replace(/\s/g, ''))
      ) {
        valid = false;
      }
    }
    return valid;
  }

  const validators = {
    title: {
      required: isNotEmpty,
    },
    startTime: {
      required: isNotEmpty,
    },
    endTime: {
      required: isNotEmpty,
    },
    appointmentDurationTime: {
      required: isNotEmpty,
    },
    facilitators: {
      required: isNotEmpty,
      checkEmail,
    },
    participants: {
      checkEmail,
    },
  };

  const errorTypes = {
    required: 'Value is missing',
    checkEmail: 'Invalid email format',
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
    protocol: process.env.REACT_APP_BACKEND_PROTOCOL,
    host: process.env.REACT_APP_BACKEND_HOST,
    port: process.env.REACT_APP_BACKEND_PORT,
    route: process.env.REACT_APP_BACKEND_ROUTE,
  };

  const backendUrl = `${backend.protocol}://${backend.host}:${backend.port}/${backend.route}`;

  const endpoint = {
    login: `${backendUrl}/events/new`,
    edit: `${backendUrl}/events/${id}`,
  };

  async function handleSubmit(e) {
    e.preventDefault();

    setFormAlertText('');
    setFormAlertType('');
    setFormWasValidated(false);

    const isValid = isFormValid();

    if (isValid) {
      if (type === 'new') {
        fetch(endpoint.login, {
          method: 'POST',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: fieldValues.title,
            startTime: fieldValues.startTime,
            endTime: fieldValues.endTime,
            appointmentDurationTime: fieldValues.appointmentDurationTime,
            facilitators: fieldValues.facilitators
              .replace(/\s/g, '')
              .split(','),
            participants: fieldValues.participants
              .replace(/\s/g, '')
              .split(','),
          }),
        })
          .then(res => res.json())
          .then(res => {
            if (res.status < 200 || res.status >= 300) {
              throw new Error('Failed to create new event');
            } else {
              setFormAlertText('New event created successfully');
              setFormAlertType('success');
              setIsCreateEventSuccess(true);
              setFieldValues({
                title: '',
                startTime: '',
                endTime: '',
                appointmentDurationTime: '',
                facilitators: '',
                participants: '',
              });
            }
          })
          .catch(error => {
            setFormWasValidated(false);
            setFormAlertText(error.message);
            setFormAlertType('danger');
            setFieldValues({
              title: '',
              startTime: '',
              endTime: '',
              appointmentDurationTime: '',
              facilitators: '',
              participants: '',
            });
          });
      }
      if (type === 'edit') {
        fetch(endpoint.edit, {
          method: 'PUT',
          mode: 'cors',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: fieldValues.title,
            startTime: fieldValues.startTime,
            endTime: fieldValues.endTime,
            appointmentDurationTime: fieldValues.appointmentDurationTime,
            facilitators: fieldValues.facilitators
              .replace(/\s/g, '')
              .split(','),
            participants: fieldValues.participants
              .replace(/\s/g, '')
              .split(','),
          }),
        })
          .then(res => res.json())
          .then(res => {
            if (res.status < 200 || res.status >= 300) {
              throw new Error('Failed to update event');
            } else {
              setFormAlertText('Event updated successfully');
              setFormAlertType('success');
            }
          })
          .catch(error => {
            setFormWasValidated(false);
            setFormAlertText(error.message);
            setFormAlertType('danger');
            setFieldValues({
              title: '',
              startTime: '',
              endTime: '',
              appointmentDurationTime: '',
              facilitators: '',
              participants: '',
            });
          });
      }
    }
    setFormWasValidated(true);
    setFormAlertText('');
    setFormAlertType('');
  }

  function handleInputBlur(e) {
    const fieldName = e.target.name;
    validateField(fieldName);
  }

  if (isCreateEventSuccess) {
    return <Redirect to="/admin" />;
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        noValidate
        className={`needs-validation ${
          formWasValidated ? 'was-validated' : ''
        } events-form`}
      >
        <InputFieldSet
          reference={references.title}
          name="title"
          labelText="Event name"
          type="text"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.startTime}
          name="startTime"
          labelText="Start date"
          type="date"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.endTime}
          name="endTime"
          labelText="End date"
          type="date"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.appointmentDurationTime}
          name="appointmentDurationTime"
          labelText="Appointment duration time"
          type="number"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.facilitators}
          name="facilitators"
          labelText="Facilitators"
          type="text"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
          required
        />
        <InputFieldSet
          reference={references.participants}
          name="participants"
          labelText="Participants"
          type="text"
          errors={errors}
          fieldValues={fieldValues}
          handleInputBlur={handleInputBlur}
          handleInputChange={handleInputChange}
        />
        <button type="submit" className="btn events-btn">
          Send invitations
        </button>
        {formAlertText && (
          <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
            {formAlertText}
          </div>
        )}
      </form>
    </>
  );
}
