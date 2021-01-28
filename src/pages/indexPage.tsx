//main component for blog
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
//context
import { PostContext } from '../blogContext';
//types
import { Post } from '../interfaces/blog';
//css for fetched html string
import '../styles/blog.css';

const IndexPage: React.FC = () => {
  //get all posts from context
  const posts = useContext(PostContext);
  console.log(posts);

  return (
    <div className='blog-wrapper'>
      <header className='blog-header'>
        <h2>This is a blog</h2>
      </header>
      <main>
        <section>
          <div className='blog-hero'>hero img</div>
        </section>
        <section>
          {!posts ? (
            <h1>Fetching...</h1>
          ) : (
            posts.map(post => (
              <article className='article-wrapper' key={post.id}>
                <div className='article-title'>
                  <Link to={'/article/' + post.id}>
                    <h2 dangerouslySetInnerHTML={{ __html: post.title }}></h2>
                  </Link>
                </div>

                <div className='article-date'>
                  <p>{post.date}</p>
                </div>

                {/* <div dangerouslySetInnerHTML={{ __html: post.content }} className='article-content'></div> */}
              </article>
            ))
          )}
        </section>
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default IndexPage;