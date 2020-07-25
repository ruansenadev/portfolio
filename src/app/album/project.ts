export interface Project {
  _id: string;
  seq: number;
  name: string;
  status: string;
  description: string;
  overview: string | null;
  thumbnailPath: string | null;
  technologies: string[];
  url: string;
  homepage: string | null;
  keywords: string[];
}
