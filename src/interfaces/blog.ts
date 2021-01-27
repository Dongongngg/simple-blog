export interface Post {
  id: number;
  title: string;
  authorId: number;
  content: string;
  date: string;
}
export interface rawPost {
  id: number;
  author: number;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
}
export interface Author {
  id: number;
  name: string;
}

export interface Fox {
  image: string;
  link: string;
}
