export interface Post {
  _id: string;
  title: string;
  date: Date;
  markdown: string;
  description: string | null;
  modified: Date | null;
}
