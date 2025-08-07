export type WidthPreset = 'narrow' | 'comfortable' | 'wide' | 'full';

export interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
  initialWidth?: WidthPreset;
  allowWidthToggle?: boolean;
}

export interface ContentPageProps {
  title: string;
  description: string;
  topicHome?: string;
  children: React.ReactNode;
  initialWidth?: WidthPreset;
  allowWidthToggle?: boolean;
}
