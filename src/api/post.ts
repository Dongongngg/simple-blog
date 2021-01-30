import axios from 'axios';
import { Post, rawPost, Author, PostContent } from '../interfaces/blog';

//https://hammer.forexco.com.au/wp-json/wp/v2/posts?_embed

//  get all posts
export const getPosts = async (): Promise<PostContent[] | void> => {
  try {
    const rawContents = await axios.get('https://hammer.forexco.com.au/wp-json/wp/v2/posts?_embed');
    const rawAuthors = await axios.get('https://hammer.forexco.com.au/wp-json/wp/v2/users');
    //destructure data
    const posts: Post[] = rawContents.data.map((e: rawPost) => ({
      id: e.id,
      title: e.title.rendered,
      authorId: e.author,
      content: e.content.rendered,
      date: e.date,
    }));

    const authors: Author[] = rawAuthors.data.map((e: Author) => ({
      id: e.id,
      name: e.name,
    }));
    console.log(authors, 'authors');

    const postContent: PostContent[] = posts.map((e: Post) => ({
      id: e.id,
      title: e.title,
      content: e.content,
      date: e.date,
      author: authors.find(author => e.authorId === author.id),
    }));

    //return contents with author
    return postContent;
  } catch (err) {
    console.error(err);
  }
};
