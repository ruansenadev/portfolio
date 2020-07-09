export interface Post {
  _id: string;
  title: string;
  date: Date;
  icon: string | null;
  markdown: string;
  description: string | null;
  modified: Date | null;
  labels: string[];
}
