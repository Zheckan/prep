export const parseHighlightLines = (highlightStr?: string): number[] => {
  if (!highlightStr) {
    return [];
  }
  const highlightedLineNumbers: number[] = [];
  const parts = highlightStr.split(',');
  for (const part of parts) {
    if (part.includes('-')) {
      const [start, end] = part
        .split('-')
        .map((n) => Number.parseInt(n.trim(), 10));
      for (let i = start; i <= end; i++) {
        highlightedLineNumbers.push(i);
      }
    } else {
      highlightedLineNumbers.push(Number.parseInt(part.trim(), 10));
    }
  }
  return highlightedLineNumbers;
};
