import axios from 'axios';
import { Post, rawPost } from '../interfaces/blog';

//https://hammer.forexco.com.au/wp-json/wp/v2/posts?_embed

//  get all posts
export const getPosts = async (): Promise<Post[] | void> => {
  try {
    const res = await axios.get('https://hammer.forexco.com.au/wp-json/wp/v2/posts?_embed');
    //destructure data
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

//get one post by post id
export const getPostById = async (ID: number): Promise<Post | void> => {
  try {
    const res: rawPost = await axios.get(`https://hammer.forexco.com.au/wp-json/wp/v2/posts/${ID}`);
    //destructure data
    return {
      id: res.id,
      title: res.title.rendered.replace(/<\/?[^>]+>/gi, ''),
      authorId: res.author,
      content: res.content.rendered.replace(/<\/?[^>]+>/gi, ''),
      date: res.date,
    };
  } catch (err) {
    console.error(err);
  }
};
