import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MemoryRouter } from 'react-router-dom';
import AdminMain from '../components/admin/Admin.js/AdminMain';


const mockUser = {
  role: 'admin'
}

beforeEach(() => {
  render(<MemoryRouter>
    <AdminMain user={mockUser} />;
  </MemoryRouter>)
});

afterEach(() => {
  cleanup();
});

describe('Testing admin menu', () => {
  test('has a text with `Admin menü`', () => {
    const header = screen.getByText('Admin menü');
    expect(header).toBeInTheDocument();
  });
  test('has text with the following:használók `felhasználók...`', () => {
    const text = screen.getByText('Felhasználók listázása');
    expect(text).toBeInTheDocument();
  });
  test('has text with the following:használók `Szolgáltatások...`', () => {
    const text = screen.getByText('Szolgáltatások listázása');
    expect(text).toBeInTheDocument();
  });
  test('has text with the following:használók `főoldali...`', () => {
    const text = screen.getByText('Főoldali lista szerkesztése');
    expect(text).toBeInTheDocument();
  });
});
