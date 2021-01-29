//main component for blog
import React, { useContext } from 'react';
//context
import { PostContext } from '../blogContext';
//types
import { Post } from '../interfaces/blog';
//css for fetched html string
import '../styles/blog.css';
//mui
import { Grid, Container, makeStyles, Typography, Hidden } from '@material-ui/core/';
//components
import ArticleCard from '../components/ArticleCard';

const useStyles = makeStyles(theme => ({
  subtitle: {
    height: '16vh',
    marginBottom: '8vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: ' 1px solid #818181',
  },
  section: { marginBottom: '8vh' },
  topArticleWrapper: {
    maxWidth: '90%',
    margin: '0 auto',
    justifyContent: 'center',
  },
  article: { maxWidth: '90vw', margin: '2rem auto' },
  oldArticleWrapper: { maxWidth: '100%', padding: '0 10vw', margin: '0' },
}));

const IndexPage: React.FC = () => {
  //get all posts from context
  const posts = useContext(PostContext);

  const classes = useStyles();

  return (
    <div className='blog-wrapper'>
      <main>
        <section className={classes.section}>
          <Container className={classes.subtitle}>
            <Typography variant='h2' color='primary'>
              Latest Articles
            </Typography>
          </Container>

          <Grid container className={classes.topArticleWrapper} spacing={2}>
            {!posts ? (
              <Typography variant='h2'>Fetching...</Typography>
            ) : (
              posts.map(post => (
                <Grid item xs={12} md={6} lg={3} key={post.id}>
                  <article className={classes.article}>
                    <ArticleCard {...post} />
                  </article>
                </Grid>
              ))
            )}
          </Grid>
        </section>
        <section className={classes.section}>
          <Container className={classes.subtitle}>
            <Typography variant='h2' color='primary'>
              More Articles
            </Typography>
          </Container>
          <Grid container className={classes.oldArticleWrapper} spacing={2}>
            <Grid item xs={12} md={7}>
              {!posts ? (
                <Typography variant='h2'>Fetching...</Typography>
              ) : (
                posts.map(post => (
                  <Grid item xs={12} key={post.id}>
                    <article className={classes.article}>
                      <Typography gutterBottom variant='h6' component='h2'>
                        {post.title}
                      </Typography>
                      <Typography gutterBottom variant='subtitle1'>
                        {post.date.substring(0, 10)}
                      </Typography>
                      <Typography gutterBottom variant='body1' color='textSecondary' component='p' noWrap>
                        {post.content.replace(/<\/?[^>]+>/gi, '')}
                      </Typography>
                    </article>
                  </Grid>
                ))
              )}
            </Grid>
            <Hidden only='xs'>
              <Grid item md={5}>
                something
              </Grid>
            </Hidden>
          </Grid>
        </section>
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default IndexPage;
