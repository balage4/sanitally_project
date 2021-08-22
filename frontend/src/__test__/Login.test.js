import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

beforeEach(() => {
  render(<App />);
});

describe('Pursuit to Login page', () => {
  test('has a `Login` header tag', () => {
    fireEvent.click(screen.getByText('login'));
    const headerElement = screen.getByRole('heading', { name: 'Login' });
    expect(headerElement.textContent).toBe('Login');
  });

  test('has an email label', () => {
    const emailLabel = screen.getByLabelText('Email');
    expect(emailLabel).toBeInTheDocument();
  });

  test('has a password label', () => {
    const passwordLabel = screen.getByLabelText('Password');
    expect(passwordLabel).toBeInTheDocument();
  });

  test('should have a submit button to login', () => {
    const loginButton = screen.getByRole('button', { name: /Login/i });
    expect(loginButton).toBeInTheDocument();
  });

  test('has an error message if the email address is incorrect', () => {
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    fireEvent.change(emailInput, {
      target: {
        value: 'abcd',
      },
    });
    fireEvent.focusOut(emailInput);
    const invalidEmailFormatMessage = screen.getByText('Not valid email');
    expect(invalidEmailFormatMessage).toBeInTheDocument();
  });

  test('has an error message if the email address is missing', () => {
    const emailInput = screen.getByRole('textbox', { name: 'Email' });
    fireEvent.focusIn(emailInput);
    fireEvent.focusOut(emailInput);
    const missingEmailMessage = screen.getByText('Value is missing');
    expect(missingEmailMessage).toBeInTheDocument();
  });

  test('has an error message if the password address is missing', () => {
    const passwordInput = screen.getByLabelText('Password');
    fireEvent.focusIn(passwordInput);
    fireEvent.focusOut(passwordInput);
    const missingPasswordMessage = screen.getByText('Value is missing');
    expect(missingPasswordMessage).toBeInTheDocument();
  });
});
