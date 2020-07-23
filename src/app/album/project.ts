export interface Project {
  _id: string;
  seq: number;
  name: string;
  status: string;
  description: string;
  thumbnailPath: string | null;
  slug: string;
  technologies: string[];
  url: string;
  homepage: string | null;
  keywords: string[];
}
