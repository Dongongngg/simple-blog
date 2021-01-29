//main component for blog
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
//context
import { PostContext } from '../blogContext';
//types
import { Post } from '../interfaces/blog';
//css for fetched html string
import '../styles/blog.css';
//mui
import { Grid, Container, makeStyles, Typography, Hidden, List, ListItem, ListItemText } from '@material-ui/core/';
//components
import ArticleCard from '../components/ArticleCard';
import LoadingSign from '../components/LoadingSign';

const useStyles = makeStyles({
  subtitle: {
    height: '16vh',
    maxWidth: '75vw',
    marginBottom: '8vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: ' 1px solid #818181',
    '@media (max-width: 960px)': {
      marginBottom: '4vh',
      maxWidth: '90vw',
    },
  },
  section: {
    marginBottom: '8vh',
    '@media (max-width: 960px)': {
      marginBottom: '4vh',
    },
  },
  topArticleWrapper: {
    maxWidth: '90%',
    margin: '0 auto',
    justifyContent: 'center',
  },
  article: { maxWidth: '90vw', marginBottom: '4vh' },
  hideArticle: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 3,
    overflow: 'hidden',
  },
  oldArticleWrapper: { maxWidth: '100%', padding: '0 10vw', margin: '0' },
  archiveWrapper: { borderLeft: '1px solid #818181' },
});

const IndexPage: React.FC = () => {
  //get all posts from context
  const posts = useContext(PostContext);

  const classes = useStyles();

  const history = useHistory();
  const handleRedirect = (ID: string) => {
    history.push('/article/' + ID);
  };

  return (
    <div className='blog-wrapper'>
      <main>
        {console.log(posts)}
        {!posts ? null : posts.length === 0 ? (
          <LoadingSign />
        ) : (
          <>
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
                      <article>
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
                <Grid item xs={12} md={8} style={{ padding: '0 2vw' }}>
                  {posts.map(post => (
                    <Grid item xs={12} key={post.id}>
                      <article className={classes.article}>
                        <Link to={'/article/' + post.id}>
                          <Typography gutterBottom variant='h6' component='h2'>
                            {post.title}
                          </Typography>
                        </Link>

                        <Typography gutterBottom variant='subtitle1'>
                          {post.date.substring(0, 10)}
                        </Typography>
                        <Typography gutterBottom variant='body1' color='textSecondary' component='p' className={classes.hideArticle}>
                          {post.content.replace(/<\/?[^>]+>/gi, '')}
                        </Typography>
                      </article>
                    </Grid>
                  ))}
                </Grid>
                <Hidden only='xs'>
                  <Grid item md={4} className={classes.archiveWrapper} style={{ padding: '0 2vw' }}>
                    <Typography gutterBottom variant='h6' component='h2'>
                      Archive
                    </Typography>
                    {posts.map(post => (
                      <List aria-label='article archive' key={post.id}>
                        <ListItem button onClick={() => handleRedirect(post.id)}>
                          <ListItemText primary={post.title} />
                        </ListItem>
                      </List>
                    ))}
                  </Grid>
                </Hidden>
              </Grid>
            </section>
          </>
        )}
      </main>
      <footer>footer</footer>
    </div>
  );
};

export default IndexPage;
