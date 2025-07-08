import { render, screen } from '@testing-library/react';
import { SectionCard } from '../section-card';

it('renders title and children', () => {
  render(
    <SectionCard title="My Title">
      <p>Hello world</p>
    </SectionCard>
  );

  expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('My Title');
  expect(screen.getByText('Hello world')).toBeInTheDocument();
});
