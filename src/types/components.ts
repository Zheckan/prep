import type { ReactNode } from 'react';

export interface HeaderProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export interface SubheaderProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export interface CalloutProps {
  children: ReactNode;
  className?: string;
}

export interface CodeSpanProps {
  children: ReactNode;
  className?: string;
  size?: 'normal' | 'small';
}

export interface TextProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'muted';
}

export interface SectionCardProps {
  title: string;
  children: ReactNode;
}

export interface NotesAreaProps {
  placeholder?: string;
  minHeight?: string;
}

export interface CodeBlockProps {
  comment?: string;
  children?: ReactNode;
  code?: string;
  language?: string;
  showLineNumbers?: boolean;
  highlightLines?: string; // e.g., "1,3,5-7" for highlighting specific lines
  highlightLinesEnd?: string; // e.g., "1,3,5-7" for highlighting specific lines
}

export interface PageHeaderProps {
  title: string;
  description: string;
  topicHome?: string;
}
