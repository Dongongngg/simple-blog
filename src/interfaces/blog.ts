export interface Post {
  id: string;
  title: string;
  authorId: string;
  content: string;
  date: string;
}
export interface rawPost {
  id: string;
  author: string;
  date: string;
  title: { rendered: string };
  content: { rendered: string };
}
export interface Author {
  id: string;
  name: string;
}

export interface Fox {
  image: string;
  link: string;
}
