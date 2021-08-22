import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import NewForm from '../components/admin/events/NewForm';

beforeEach(() => {

  const mockUser = {
    role: 'admin'
  }

  render(
    <MemoryRouter initialEntries={['/admin/events/new']}>
      <NewForm user={mockUser} />
    </MemoryRouter>
  );
});

test('has a `Create event` header tag', () => {
  const headerElement = screen.getByRole('heading', {
    name: 'Create event',
  });
  expect(headerElement.textContent).toBe('Create event');
});

test('has an Event name label', () => {
  const eventNameLabel = screen.getByLabelText('Event name');
  expect(eventNameLabel).toBeInTheDocument();
});

test('has an error message if the Event name is missing', () => {
  const eventNameInput = screen.getByLabelText('Event name');
  fireEvent.focusIn(eventNameInput);
  fireEvent.focusOut(eventNameInput);
  const missingEventNameMessage = screen.getByText('Value is missing');
  expect(missingEventNameMessage).toBeInTheDocument();
});

test('has an Start date label', () => {
  const startDateLabel = screen.getByLabelText('Start date');
  expect(startDateLabel).toBeInTheDocument();
});

test('has an error message if the Start date is missing', () => {
  const startDateInput = screen.getByLabelText('Start date');
  fireEvent.focusIn(startDateInput);
  fireEvent.focusOut(startDateInput);
  const missingStartDateMessage = screen.getByText('Value is missing');
  expect(missingStartDateMessage).toBeInTheDocument();
});

test('has an End date label', () => {
  const endDateLabel = screen.getByLabelText('End date');
  expect(endDateLabel).toBeInTheDocument();
});

test('has an error message if the End date is missing', () => {
  const endDateInput = screen.getByLabelText('End date');
  fireEvent.focusIn(endDateInput);
  fireEvent.focusOut(endDateInput);
  const missingEndDateMessage = screen.getByText('Value is missing');
  expect(missingEndDateMessage).toBeInTheDocument();
});

test('has an Appointment duration time label', () => {
  const appointmentDurationTimeLabel = screen.getByLabelText(
    'Appointment duration time'
  );
  expect(appointmentDurationTimeLabel).toBeInTheDocument();
});

test('has an error message if the Appointment duration time is missing', () => {
  const appointmentDurationTimeInput = screen.getByLabelText(
    'Appointment duration time'
  );
  fireEvent.focusIn(appointmentDurationTimeInput);
  fireEvent.focusOut(appointmentDurationTimeInput);
  const missingAppointmentDurationTimeMessage =
    screen.getByText('Value is missing');
  expect(missingAppointmentDurationTimeMessage).toBeInTheDocument();
});

test('has an Facilitators label', () => {
  const facilitatorsLabel = screen.getByLabelText('Facilitators');
  expect(facilitatorsLabel).toBeInTheDocument();
});

test('has an error message if the Facilitators is missing', () => {
  const facilitatorsInput = screen.getByLabelText('Facilitators');
  fireEvent.focusIn(facilitatorsInput);
  fireEvent.focusOut(facilitatorsInput);
  const missingFacilitatorsMessage = screen.getByText('Value is missing');
  expect(missingFacilitatorsMessage).toBeInTheDocument();
});

test('has an Participants label', () => {
  const participantsLabel = screen.getByLabelText('Participants');
  expect(participantsLabel).toBeInTheDocument();
});

test('should have a submit button to Send invitations', () => {
  const sendInvitationsButton = screen.getByRole('button', {
    name: /Send invitations/i,
  });
  expect(sendInvitationsButton).toBeInTheDocument();
});

test('has an error message if the Facilitators email address is incorrect', () => {
  const emailInput = screen.getByRole('textbox', { name: 'Facilitators' });
  fireEvent.change(emailInput, {
    target: {
      value: 'abcd',
    },
  });
  fireEvent.focusOut(emailInput);
  const invalidEmailFormatMessage = screen.getByText('Invalid email format');
  expect(invalidEmailFormatMessage).toBeInTheDocument();
});

test('has an error message if one of the Facilitators email addresses is incorrect', () => {
  const emailsInput = screen.getByRole('textbox', { name: 'Facilitators' });
  fireEvent.change(emailsInput, {
    target: {
      value: 'abc@gmail.com, abcd',
    },
  });
  fireEvent.focusOut(emailsInput);
  const invalidEmailFormatMessage = screen.getByText('Invalid email format');
  expect(invalidEmailFormatMessage).toBeInTheDocument();
});

test('has an error message if the Participants email address is incorrect', () => {
  const emailInput = screen.getByRole('textbox', { name: 'Participants' });
  fireEvent.change(emailInput, {
    target: {
      value: 'abcd',
    },
  });
  fireEvent.focusOut(emailInput);
  const invalidEmailFormatMessage = screen.getByText('Invalid email format');
  expect(invalidEmailFormatMessage).toBeInTheDocument();
});

test('has an error message if one of the Participants email addresses is incorrect', () => {
  const emailsInput = screen.getByRole('textbox', { name: 'Participants' });
  fireEvent.change(emailsInput, {
    target: {
      value: 'abc@gmail.com, abcd',
    },
  });
  fireEvent.focusOut(emailsInput);
  const invalidEmailFormatMessage = screen.getByText('Invalid email format');
  expect(invalidEmailFormatMessage).toBeInTheDocument();
});
