import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Move regex patterns to top level for better performance
const COMMENT_REGEX = /^\/\*\s*\w+\s*\*\/\s*\n?/;
const LEADING_SPACES_REGEX = /^\s+/;
const TRAILING_SPACES_REGEX = /\s+$/;
const INDENTATION_REGEX = /^(\s*)/;

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
    .replace(COMMENT_REGEX, '')
    .replace(LEADING_SPACES_REGEX, '')
    .replace(TRAILING_SPACES_REGEX, '');

  const lines = codeToHighlight.split('\n');
  const nonEmptyLines = lines.filter((line) => line.trim().length > 0);

  if (nonEmptyLines.length > 0) {
    const minIndent = Math.min(
      ...nonEmptyLines.map((line) => {
        const match = line.match(INDENTATION_REGEX);
        return match ? match[1].length : 0;
      })
    );

    codeToHighlight = lines
      .map((line) => line.slice(minIndent))
      .join('\n')
      .trim();
  }

  const parseHighlightLines = (highlightStr?: string): number[] => {
    if (!highlightStr) {
      return [];
    }

    const highlightedLineNumbers: number[] = [];
    const parts = highlightStr.split(',');

    // Use for...of instead of forEach for better performance
    for (const part of parts) {
      if (part.includes('-')) {
        const [start, end] = part
          .split('-')
          .map((n) => Number.parseInt(n.trim(), 10)); // Add radix parameter
        for (let i = start; i <= end; i++) {
          highlightedLineNumbers.push(i);
        }
      } else {
        highlightedLineNumbers.push(Number.parseInt(part.trim(), 10)); // Add radix parameter
      }
    }

    return highlightedLineNumbers;
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
    <div className='mb-4 overflow-hidden rounded-lg border border-zinc-700 bg-zinc-900'>
      {comment && (
        <div className='border-zinc-700 border-b bg-zinc-800 px-4 py-2 text-gray-400 text-sm'>
          {`/* ${comment} */`}
        </div>
      )}
      <SyntaxHighlighter
        codeTagProps={{
          style: {
            fontFamily: `ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace`,
          },
        }}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.875rem',
          lineHeight: '1.5',
        }}
        language={language}
        lineProps={getLineProps}
        showLineNumbers={showLineNumbers}
        style={coldarkDark}
        wrapLines={highlightedLines.length > 0}
      >
        {codeToHighlight}
      </SyntaxHighlighter>
    </div>
  );
};
