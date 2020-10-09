export interface Project {
  _id?: string;
  seq: number;
  name: string;
  status: string;
  description: string;
  overview: string;
  thumbnailPath?: string;
  technologies: string[];
  url: string;
  homepage?: string;
  keywords: string[];
}
