import Joi from 'joi';
/* eslint no-param-reassign: "error" */

function validateLoginData(data) {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'Email is required';
              break;
            case 'any.required':
              err.message = 'Email is required';
              break;
            case 'string.email':
              err.message = 'Invalid email';
              break;
            default:
              break;
          }
        })
        return errors;
      }),
    password: Joi.string()
      .required()
      .pattern(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'Password is required';
              break;
            case 'any.required':
              err.message = 'Password is required';
              break;
            case 'string.pattern.base':
              err.message = 'Password should be at least 8 characters long, should contain a number, a capital letter, and a symbol';
              break;
            default:
              break;
          }
        })
        return errors;
      })
    });
  return schema.validate(data, { abortEarly: false }); 
}

function validateUserData(data) {
  const schema = Joi.object({
    firstName: Joi.string()
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'First name is required';
              break;
            case 'any.required':
              err.message = 'First name is required';
              break;
            default:
              break;
          }
        })
        return errors;
      }),
    lastName: Joi.string()
      .required()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'Last name is required';
              break;
            case 'any.required':
              err.message = 'Last name is required';
              break;
            default:
              break;
          }
        })
        return errors;
      }),
    email: Joi.string()
      .required()
      .email()
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'Email is required';
              break;
            case 'any.required':
              err.message = 'Email is required';
              break;
            case 'string.email':
              err.message = 'Invalid email';
              break;
            default:
              break;
          }
        })
        return errors;
      }),
    password: Joi.string()
      .required()
      .pattern(/^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?=(.*[\W]){1,})(?!.*\s).{8,}$/)
      .error(errors => {
        errors.forEach(err => {
          switch (err.code) {
            case 'string.empty':
              err.message = 'Password is required';
              break;
            case 'any.required':
              err.message = 'Password is required';
              break;
            case 'string.pattern.base':
              err.message = 'Password should be at least 8 characters long, should contain a number, a capital letter, and a symbol';
              break;
            default:
              break;
          }
        })
        return errors;
      })
    });
  return schema.validate(data, { abortEarly: false }); 
}

export { validateLoginData, validateUserData }