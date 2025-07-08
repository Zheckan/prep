import { parseHighlightLines } from '../parseHighlightLines';

describe('parseHighlightLines', () => {
  it('returns empty array for undefined', () => {
    expect(parseHighlightLines()).toEqual([]);
  });

  it('parses single line number', () => {
    expect(parseHighlightLines('3')).toEqual([3]);
  });

  it('parses comma separated numbers', () => {
    expect(parseHighlightLines('1,2,5')).toEqual([1,2,5]);
  });

  it('parses range of numbers', () => {
    expect(parseHighlightLines('1-3')).toEqual([1,2,3]);
  });

  it('parses mixed numbers and ranges', () => {
    expect(parseHighlightLines('1-2,4,6-7')).toEqual([1,2,4,6,7]);
  });
});
