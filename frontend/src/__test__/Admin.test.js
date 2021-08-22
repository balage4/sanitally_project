import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminMain from '../components/admin/Admin.js/AdminMain';

beforeEach(() => {
  render(<AdminMain />);
});

afterEach(() => {
  cleanup();
});

describe('Testing admin menu', () => {
  test('has a text with `Admin menü`', () => {
    const header = screen.getByText('Bejelentkezés');
    expect(header).toBeInTheDocument();
  })
})