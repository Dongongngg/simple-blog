//main component for blog
import React, { useContext } from 'react';
//context
import { PostContext } from '../blogContext';
//types
import { Post } from '../interfaces/blog';
//css for fetched html string
import '../styles/blog.css';
//mui
import { Grid, Container, makeStyles, Typography } from '@material-ui/core/';
//components
import ArticleCard from '../components/ArticleCard';

const useStyles = makeStyles(theme => ({
  blogHero: { height: '33vh', display: 'flex', justifyContent: 'center', alignItems: 'center' },

  topArticleWrapper: {
    maxWidth: '100%',
    margin: '0',
    justifyContent: 'center',
  },
  cardWrapper: {},
}));

const IndexPage: React.FC = () => {
  //get all posts from context
  const posts = useContext(PostContext);

  const classes = useStyles();

  return (
    <div className='blog-wrapper'>
      <main>
        <section>
          <Container className={classes.blogHero}>
            <Typography variant='h2'>This is a banner</Typography>
          </Container>
        </section>
        <section>
          <Grid container className={classes.topArticleWrapper} spacing={4}>
            {!posts ? (
              <Typography variant='h2'>Fetching...</Typography>
            ) : (
              posts.map(post => (
                <Grid item xs={12} md={6} lg={3} key={post.id} className={classes.cardWrapper}>
                  <article style={{ maxWidth: '90vw', margin: '0 auto' }}>
                    <ArticleCard {...post} />
                  </article>
                </Grid>
              ))
            )}
          </Grid>
        </section>
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default IndexPage;
