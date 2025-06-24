import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
  comment?: string;
  children?: React.ReactNode;
  code?: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: string; // e.g., "1,3,5-7" for highlighting specific lines
  highlightLinesEnd?: string; // e.g., "1,3,5-7" for highlighting specific lines
}

export const CodeBlock = ({
  comment,
  children,
  code,
  language = 'markup',
  showLineNumbers = false,
  highlightLines,
  highlightLinesEnd,
}: CodeBlockProps) => {
  let codeToHighlight = code || (typeof children === 'string' ? children : '');

  codeToHighlight = codeToHighlight
    .replace(/^\/\*\s*\w+\s*\*\/\s*\n?/, '')
    .replace(/^\s+/, '')
    .replace(/\s+$/, '');

  const lines = codeToHighlight.split('\n');
  const nonEmptyLines = lines.filter(line => line.trim().length > 0);

  if (nonEmptyLines.length > 0) {
    const minIndent = Math.min(
      ...nonEmptyLines.map(line => {
        const match = line.match(/^(\s*)/);
        return match ? match[1].length : 0;
      })
    );

    codeToHighlight = lines
      .map(line => line.slice(minIndent))
      .join('\n')
      .trim();
  }

  const parseHighlightLines = (highlightStr?: string): number[] => {
    if (!highlightStr) return [];

    const lines: number[] = [];
    const parts = highlightStr.split(',');

    parts.forEach(part => {
      if (part.includes('-')) {
        const [start, end] = part.split('-').map(n => parseInt(n.trim()));
        for (let i = start; i <= end; i++) {
          lines.push(i);
        }
      } else {
        lines.push(parseInt(part.trim()));
      }
    });

    return lines;
  };

  const highlightedLines = parseHighlightLines(highlightLines);
  const highlightedLinesEnd = parseHighlightLines(highlightLinesEnd);

  // Line props function for highlighting
  const getLineProps = (lineNumber: number) => {
    const isHighlighted = highlightedLines.includes(lineNumber);
    const isHighlightedEnd = highlightedLinesEnd.includes(lineNumber);

    let backgroundColor = 'transparent';
    let borderLeft = 'none';

    if (isHighlightedEnd) {
      backgroundColor = 'rgba(34, 197, 94, 0.15)'; // Green for end lines
      borderLeft = '3px solid rgb(34, 197, 94)';
    } else if (isHighlighted) {
      backgroundColor = 'rgba(59, 130, 246, 0.15)'; // Blue for regular highlighted lines
      borderLeft = '3px solid rgb(59, 130, 246)';
    }

    return {
      style: {
        display: 'block',
        backgroundColor,
        borderLeft,
        paddingLeft: isHighlighted || isHighlightedEnd ? '0.75rem' : '0',
        marginLeft: isHighlighted || isHighlightedEnd ? '-0.75rem' : '0',
      },
    };
  };

  return (
    <div className='bg-zinc-900 border border-zinc-700 rounded-lg overflow-hidden mb-4'>
      {comment && (
        <div className='bg-zinc-800 px-4 py-2 text-sm text-gray-400 border-b border-zinc-700'>
          {`/* ${comment} */`}
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        showLineNumbers={showLineNumbers}
        wrapLines={highlightedLines.length > 0}
        lineProps={getLineProps}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        codeTagProps={{
          style: {
            fontFamily:
              'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
          },
        }}
      >
        {codeToHighlight}
      </SyntaxHighlighter>
    </div>
  );
};
