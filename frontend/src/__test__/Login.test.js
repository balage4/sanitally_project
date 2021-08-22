import React from 'react';
import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

beforeEach(() => {
  render(<App />);
});

afterEach(() => {
  cleanup();
});


describe('Pursuit to Login page', () => {
  test('has a `Login` header tag', () => {
    fireEvent.click(screen.getByText('Login'));
    const headerElement = screen.getByRole('heading', { name: 'Login' });
    expect(headerElement.textContent).toBe('Login');
  });

  test('has an email label', () => {
    const emailLabel = screen.getByLabelText('E-mail cím');
    expect(emailLabel).toBeInTheDocument();
  });

  test('has a password label', () => {
    const passwordLabel = screen.getByLabelText('Jelszó');
    expect(passwordLabel).toBeInTheDocument();
  });

  test('should have a submit button to login', () => {
    const loginButton = screen.getByRole('button', { name: /Bejelentkezés/i });
    expect(loginButton).toBeInTheDocument();
  });

  test('has an error message if the email address is incorrect', () => {
    const emailInput = screen.getByRole('textbox', { name: 'E-mail cím' });
    fireEvent.change(emailInput, {
      target: {
        value: 'abcd',
      },
    });
    fireEvent.focusOut(emailInput);
    const invalidEmailFormatMessage = screen.getByText('Helytelen e-mail cím');
    expect(invalidEmailFormatMessage).toBeInTheDocument();
  });

  test('has an error message if the email address is missing', () => {
    const emailInput = screen.getByRole('textbox', { name: 'E-mail cím' });
    fireEvent.focusIn(emailInput);
    fireEvent.focusOut(emailInput);
    const missingEmailMessage = screen.getByText('Hiányzó adat!');
    expect(missingEmailMessage).toBeInTheDocument();
  });

  test('has an error message if the password address is missing', () => {
    const passwordInput = screen.getByLabelText('Jelszó');
    fireEvent.focusIn(passwordInput);
    fireEvent.focusOut(passwordInput);
    const missingPasswordMessage = screen.getByText('Hiányzó adat!');
    expect(missingPasswordMessage).toBeInTheDocument();
  });
});
