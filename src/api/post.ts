import axios from 'axios';
import { Post, rawPost } from '../interfaces/blog';

//https://hammer.forexco.com.au/wp-json/wp/v2/posts?_embed

export const getPosts = async (): Promise<Post[] | void> => {
  try {
    const res = await axios.get('https://hammer.forexco.com.au/wp-json/wp/v2/posts?_embed');
    const posts: Post[] = res.data.map((e: rawPost) => ({
      id: e.id,
      title: e.title.rendered,
      authorId: e.author,
      content: e.content.rendered,
      date: e.date,
    }));
    return posts;
  } catch (err) {
    console.error(err);
  }
};
