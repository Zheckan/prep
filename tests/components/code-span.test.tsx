import { render, screen } from '@testing-library/react';
import { CodeSpan } from '@/components/typography';

describe('CodeSpan', () => {
  test('renders children', () => {
    render(<CodeSpan>test</CodeSpan>);
    expect(screen.getByText('test')).toBeInTheDocument();
  });

  test('applies small size class', () => {
    render(<CodeSpan size='small'>small</CodeSpan>);
    const code = screen.getByText('small');
    expect(code).toHaveClass('text-sm');
  });
});
