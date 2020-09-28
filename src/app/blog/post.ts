export interface Post {
  _id: string;
  title: string;
  slug: string | null;
  date: Date;
  thumbnailPath: string | null;
  icon: string | null;
  markdown: string;
  description: string | null;
  modified: Date | null;
  labels: string[];
  reading: { minutes: number, text: string };
  date_formated: { relative: string, locale: string };
}
