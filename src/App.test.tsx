import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('page is about postcodes', () => {
  render(<App />);
  const linkElement = screen.getByText(/post code/i);
  expect(linkElement).toBeInTheDocument();
});
