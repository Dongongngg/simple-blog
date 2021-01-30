import axios from 'axios';
import { Post, rawPost } from '../interfaces/blog';

//https://hammer.forexco.com.au/wp-json/wp/v2/posts?_embed

//  get all posts with author, excerpt and featured media
export const getPosts = async (): Promise<Post[] | void> => {
  try {
    const rawPosts = await axios.get('https://hammer.forexco.com.au/wp-json/wp/v2/posts?_embed');
    //destructure data
    //get each post content
    const posts: Post[] = rawPosts.data.map((e: rawPost) => ({
      id: e.id,
      date: e.date,
      authors: e._embedded.author,
      title: e.title.rendered,
      excerpt: e.excerpt.rendered,
      content: e.content.rendered,
      featuredMedia: {
        thumbnail: e._embedded['wp:featuredmedia'] ? e._embedded['wp:featuredmedia'][0].media_details.sizes.thumbnail.source_url : 'none',
        medium: e._embedded['wp:featuredmedia'] ? e._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url : 'none',
        medium_large: e._embedded['wp:featuredmedia']
          ? e._embedded['wp:featuredmedia'][0].media_details.sizes.medium_large.source_url
          : 'none',
        large: e._embedded['wp:featuredmedia'] ? e._embedded['wp:featuredmedia'][0].media_details.sizes.large.source_url : 'none',
        full: e._embedded['wp:featuredmedia'] ? e._embedded['wp:featuredmedia'][0].media_details.sizes.full.source_url : 'none',
      },
    }));

    return posts;
  } catch (err) {
    console.error(err);
  }
};
