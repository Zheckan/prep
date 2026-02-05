import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { parseHighlightLines } from '@/helpers/parse-highlight-lines';
import type { CodeBlockProps } from '@/types';

const COMMENT_REGEX = /^\/\*\s*\w+\s*\*\/\s*\n?/;
const LEADING_SPACES_REGEX = /^\s+/;
const TRAILING_SPACES_REGEX = /\s+$/;
const INDENTATION_REGEX = /^(\s*)/;

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

  const highlightedLines = parseHighlightLines(highlightLines);
  const highlightedLinesEnd = parseHighlightLines(highlightLinesEnd);

  const getLineProps = (lineNumber: number) => {
    const isHighlighted = highlightedLines.includes(lineNumber);
    const isHighlightedEnd = highlightedLinesEnd.includes(lineNumber);

    let backgroundColor = 'transparent';
    let borderLeft = 'none';

    if (isHighlightedEnd) {
      backgroundColor = 'rgba(52, 211, 153, 0.12)';
      borderLeft = '3px solid rgb(52, 211, 153)';
    } else if (isHighlighted) {
      backgroundColor = 'rgba(99, 102, 241, 0.15)';
      borderLeft = '3px solid rgb(99, 102, 241)';
    }

    return {
      style: {
        display: 'block',
        backgroundColor,
        borderLeft,
        paddingLeft: isHighlighted || isHighlightedEnd ? '0.75rem' : '0',
        marginLeft: isHighlighted || isHighlightedEnd ? '-0.75rem' : '0',
        width: 'fit-content',
        minWidth: '100%',
      },
    };
  };

  return (
    <div className='mb-4 overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--surface-1)]'>
      {comment && (
        <div className='border-[var(--border)] border-b bg-[var(--surface-2)] px-4 py-2 text-[var(--muted)] text-sm'>
          {`/* ${comment} */`}
        </div>
      )}
      <SyntaxHighlighter
        codeTagProps={{
          style: {
            fontFamily: `ui-monospace, SFMono-Regular, 'SF Mono', Consolas, 'Liberation Mono', Menlo, monospace`,
            display: 'grid',
            gridTemplateColumns: '1fr',
          },
        }}
        customStyle={{
          margin: 0,
          padding: '1rem',
          background: 'transparent',
          fontSize: '0.875rem',
          lineHeight: '1.5',
          overflowX: 'auto',
        }}
        language={language}
        lineProps={getLineProps}
        showLineNumbers={showLineNumbers}
        style={coldarkDark}
        wrapLines={true}
      >
        {codeToHighlight}
      </SyntaxHighlighter>
    </div>
  );
};
