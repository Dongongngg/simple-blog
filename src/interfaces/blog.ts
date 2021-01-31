export interface rawPost {
  id: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded: _embedded;
}

type _embedded = {
  author: Author[];
  'wp:featuredmedia': any[];
};

type Author = {
  id: string;
  name: string;
  link: string;
};
export interface Post {
  id: string;
  date: string;
  authors: Author[];
  title: string;
  excerpt: string;
  content: string;
  featuredMedia: FeaturedMedia;
}
type FeaturedMedia = {
  thumbnail: string;
  medium: string;
  medium_large: string;
  large: string;
  full: string;
};
