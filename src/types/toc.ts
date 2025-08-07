export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface TocItem {
  id: string;
  text: string;
  children: TocHeading[];
}
