export const parseHighlightLines = (highlightStr?: string): number[] => {
  if (!highlightStr) {
    return [];
  }

  const result: number[] = [];
  const parts = highlightStr.split(',');

  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part
        .split('-')
        .map((n) => Number.parseInt(n.trim(), 10));
      for (let i = start; i <= end; i++) {
        result.push(i);
      }
    } else {
      result.push(Number.parseInt(part.trim(), 10));
    }
  }

  return result;
};
