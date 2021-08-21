import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

beforeAll(() => {
  render(<App />);
});
afterAll(() => {
  cleanup();
})

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText('SanitAlly');
  expect(linkElement).toBeInTheDocument();
});

