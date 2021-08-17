import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

beforeEach(() => {
  render(<App />);
})

test('`Registration` text should be in the document', async () => {
  const registrationText = await screen.getByText('register');
  expect(registrationText).toBeInTheDocument();
});
