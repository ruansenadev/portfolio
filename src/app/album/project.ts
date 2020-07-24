export interface Project {
  _id: string;
  seq: number;
  name: string;
  status: string;
  description: string;
  markdown: string;
  thumbnailPath: string | null;
  technologies: string[];
  url: string;
  homepage: string | null;
  keywords: string[];
}
