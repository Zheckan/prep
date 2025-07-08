import { render, screen } from '@testing-library/react';
import { Callout } from '@/components/typography';

describe('Callout', () => {
  test('renders content', () => {
    render(<Callout>hello</Callout>);
    expect(screen.getByText('hello')).toBeInTheDocument();
  });

  test('applies custom class', () => {
    render(<Callout className='custom'>hello</Callout>);
    const p = screen.getByText('hello');
    expect(p).toHaveClass('custom');
  });
});
