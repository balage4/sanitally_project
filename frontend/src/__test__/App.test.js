import React from 'react';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

beforeEach(() => {
  render(<App />);
});

afterEach(() => {
  cleanup();
});

describe('Home page renders correctly', () => {
  test('`SanitAlly` text should be in the document', () => {
    const text = screen.getByText('SanitAlly');
    expect(text).toBeInTheDocument();
  });

  test('`Login` text should be in the document', () => {
    const loginText = screen.getByText('Bejelentkezés');
    expect(loginText).toBeInTheDocument();
  });

  test('`Registration` text should be in the document', () => {
    const registrationText = screen.getByText('Regisztráció');
    expect(registrationText).toBeInTheDocument();
  });

  test('should no logged user - text in the document', () => {
    const loggedText = screen.getByText('Nincs bejelentkezett felhasználó');
    expect(loggedText).toBeInTheDocument();
  });
})

describe('Pursuit to Registration', () => {
  test('should have a title on the page', () => {
    fireEvent.click(screen.getByText('Registration'));
    expect(screen.getByText('Registrate')).toBeInTheDocument();
  });
  test('should have an input label of `Email`', () => {
    const emailLabel = screen.getByLabelText('E-mail cím')
    expect(emailLabel).toBeInTheDocument();
  });
  test('should have an input label of `Password`', () => {
    const passwordLabel = screen.getByLabelText('Jelszó')
    expect(passwordLabel).toBeInTheDocument();
  });
  test('should have a submit button to registrate', () => {
    const regButton = screen.getByText('Regisztráció');
    expect(regButton).toBeInTheDocument();
  });
  test('should have an input label of `First Name`', () => {
    const firstNameField = screen.getByLabelText('Keresztnév')
    expect(firstNameField).toBeInTheDocument();
  });
  test('should have an input label of `Last Name`', () => {
    const lastNameField = screen.getByLabelText('Vezetéknév')
    expect(lastNameField).toBeInTheDocument();
  });
});

describe('Check Registration page validations', () => {
  describe('Empty fields validations', () => {
    test('Empty First Name field should have an error message', () => {
      const firstNameField = document.querySelector('#firstName');
      fireEvent.focusIn(firstNameField);
      fireEvent.focusOut(firstNameField);
      const errorMessage = screen.getByText('Hiányzó adat!');
      expect(errorMessage).toBeInTheDocument();
    });
    test('Empty Last Name field should have an error message', () => {
      const lastNameField = document.querySelector('#lastName');
      fireEvent.focusIn(lastNameField);
      fireEvent.focusOut(lastNameField);
      const errorMessage = screen.getByText('Hiányzó adat!');
      expect(errorMessage).toBeInTheDocument();
    });
    test('Empty Email field should have an error message', () => {
      const emailField = document.querySelector('#email');
      fireEvent.focusIn(emailField);
      fireEvent.focusOut(emailField);
      const errorMessage = screen.getByText('Hiányzó adat!');
      expect(errorMessage).toBeInTheDocument();
    });
    test('Empty Password field should have an error message', () => {
      const passwordField = document.querySelector('#password');
      fireEvent.focusIn(passwordField);
      fireEvent.focusOut(passwordField);
      const errorMessage = screen.getByText('Hiányzó adat!');
      expect(errorMessage).toBeInTheDocument();
    });
  });
  describe('Check invalid input values', () => {
    test('Invalid value of email field should have an error message', () => {
      const emailField = document.querySelector('#email');
      fireEvent.change(emailField, {
        target: {
          value: 'test@test'
        }
      });
      fireEvent.focusOut(emailField);
      const errorMessage = screen.getByText('Helytelen e-mail cím');
      expect(errorMessage).toBeInTheDocument();
    });
    test('Check valid email should remove the errormessage', () => {
      const emailField = document.querySelector('#email');
      fireEvent.change(emailField, {
        target: {
          value: 'test@test.hu'
        }
      });
      fireEvent.focusOut(emailField);
      const errorMessage = screen.queryByText('Helytelen e-mail cím');
      expect(errorMessage).toBeNull();
    });

    describe('Check password validations', () => {
      let validPassword;
      let pwErrorMessage;
      let pwField;

      beforeEach(() => {
        validPassword = 'cErTGH;71Y';
        pwErrorMessage = 'A jelszó minimum 8 karakter hosszú, tartalmaz számot, nagybetűt és speciális karaktert!';
        pwField = document.querySelector('#password');
      });

      test('Check password value minimum length', () => {
        fireEvent.change(pwField, {
          target: {
            value: 'asdfghj'
          }
        });
        fireEvent.focusOut(pwField);
        expect(screen.getByText(pwErrorMessage)).toBeInTheDocument();
      });
      test('Check valid password', () => {
        fireEvent.change(pwField, {
          target: {
            value: validPassword
          }
        });
        fireEvent.focusOut(pwField);
        expect(screen.queryByText(pwErrorMessage)).toBeNull();
      });
      test('Check password value missing number', () => {
        fireEvent.change(pwField, {
          target: {
            value: 'cErTGH;Y'
          }
        });
        fireEvent.focusOut(pwField);
        expect(screen.getByText(pwErrorMessage)).toBeInTheDocument();
      });
      test('Check password value missing special character', () => {
        fireEvent.change(pwField, {
          target: {
            value: 'cErTGH77Y'
          }
        });
        fireEvent.focusOut(pwField);
        expect(screen.getByText(pwErrorMessage)).toBeInTheDocument();
      });
      test('Check password value missing uppercase character', () => {
        fireEvent.change(pwField, {
          target: {
            value: 'certgh77y;{'
          }
        });
        fireEvent.focusOut(pwField);
        expect(screen.getByText(pwErrorMessage)).toBeInTheDocument();
      });
      test('Final check of valid password', () => {
        fireEvent.change(pwField, {
          target: {
            value: validPassword
          }
        });
        fireEvent.focusOut(pwField);
        expect(screen.queryByText(pwErrorMessage)).toBeNull();
      });
    })
  });

  describe('Fetch registration', () => {

    beforeEach(() => {
      global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.resolve({ status: 200 })
        })
      );
    });

    afterEach(() => {
      global.fetch.mockClear();
    });

    test('Registration with empty form should NOT call fetch method', () => {
      const regButton = screen.getByText('Regisztráció');
      fireEvent.click(regButton);
      expect(fetch).toHaveBeenCalledTimes(0);
    });

    test('Registration data should call a fetch method', async () => {
      fireEvent.change(document.querySelector('#firstName'), {
        target: {
          value: 'testFirst'
        }
      });

      fireEvent.change(document.querySelector('#lastName'), {
        target: {
          value: 'testLast'
        }
      });
      fireEvent.change(document.querySelector('#email'), {
        target: {
          value: 'test@test.hu'
        }
      });
      fireEvent.change(document.querySelector('#password'), {
        target: {
          value: 'Jelszó77*'
        }
      });

      const regButton = screen.getByText('Regisztráció');
      fireEvent.click(regButton);
      expect(fetch).toHaveBeenCalledTimes(1);
    });
  });
});

describe('Check navigate to Login page renders correctly', () => {
  test('Back to unauthorized Home page', () => {
    const homeButton = screen.getByText('Főoldal');
    expect(homeButton).toBeInTheDocument();
    fireEvent.click(homeButton);
    const appointmentText = screen.getByText('SanitAlly');
    expect(appointmentText).toBeInTheDocument();
  });
});
