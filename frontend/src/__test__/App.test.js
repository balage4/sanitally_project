import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

beforeEach(() => {
  render(<App />);
});

describe('Home page renders correctly', () => {
  test('`Appointment` text should be in the document', () => {
    const appointmentText = screen.getByText('Appointment System');
    expect(appointmentText).toBeInTheDocument();
  });

  test('`Login` text should be in the document', () => {
    const loginText = screen.getByText('login');
    expect(loginText).toBeInTheDocument();
  });

  test('`Registration` text should be in the document', () => {
    const registrationText = screen.getByText('register');
    expect(registrationText).toBeInTheDocument();
  });

  test('`GFA` text should be in the document', () => {
    const gfaText = screen.getByText('Green Fox Academy');
    expect(gfaText).toBeInTheDocument();
  });
})

describe('Pursuit to Registration page', () => {
  test('should have a title on the page', () => {
    fireEvent.click(screen.getByText('register'));
    expect(screen.getByText('Registration Page')).toBeInTheDocument();
  });
  test('should have an input label of `Email`', () => {
    const emailLabel = screen.getByLabelText('Email')
    expect(emailLabel).toBeInTheDocument();
  });
  test('should have an input label of `Password`', () => {
    const passwordLabel = screen.getByLabelText('Password')
    expect(passwordLabel).toBeInTheDocument();
  });
  test('should have a submit button to registrate', () => {
    const regButton = screen.getByText('Registrate');
    expect(regButton).toBeInTheDocument();
  });
});


