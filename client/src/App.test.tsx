import { render, screen } from '@testing-library/react';
import App from './App';

test('has a canvas', () => {
  render(<App />);
  const renderStage = screen.getByTitle('render stage');
  expect(renderStage).toBeInTheDocument();
});
