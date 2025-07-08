import { parseHighlightLines } from '@/helpers/parse-highlight-lines';

describe('parseHighlightLines', () => {
  test('returns empty array for undefined', () => {
    expect(parseHighlightLines()).toEqual([]);
  });

  test('parses single numbers', () => {
    expect(parseHighlightLines('1,3,5')).toEqual([1, 3, 5]);
  });

  test('parses ranges', () => {
    expect(parseHighlightLines('1-3,5')).toEqual([1, 2, 3, 5]);
  });
});
