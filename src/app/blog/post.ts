export interface Post {
  _id?: string;
  title: string;
  slug: string;
  date: Date;
  thumbnailPath?: string;
  icon: string;
  markdown: string;
  description?: string;
  modified?: Date;
  labels: string[];
  reading: { minutes: number, text: string };
  date_formated: { relative: string, locale: string };
}
