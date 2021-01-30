//main component for blog
import React, { useContext, useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
//context
import { PostContext } from '../blogContext';
//type
import { Post } from '../interfaces/blog';
//css for fetched html string
import '../styles/html-string.css';
//mui
import { Grid, Container, makeStyles, Typography, Hidden, List, ListItem, ListItemText } from '@material-ui/core/';
//components
import ArticleCard from '../components/ArticleCard';
import LoadingSign from '../components/LoadingSign';
import BlogSVG from '../components/BlogSVG';
import ArticleMediaSVG from '../components/ArticleMediaSVG';

const useStyles = makeStyles(theme => ({
  hero: {
    display: 'flex',
    justifyContent: 'center',
  },
  subtitle: {
    height: '16vh',
    maxWidth: '75vw',
    marginBottom: '8vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottom: ' 1px solid #CCCCCC',
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
  cardWrapper: {
    '&:hover': {
      transition: 'all .2s ease-in-out',
      transform: 'translateY(-3%)',
    },
  },
  article: { maxWidth: '90vw', marginBottom: '4vh' },
  excerpt: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 3,
    overflow: 'hidden',
  },
  oldArticleWrapper: {
    maxWidth: '100%',
    padding: '0 10vw',
    margin: '0',
    '@media (max-width: 960px)': {
      padding: '0 4vw',
    },
  },
  archiveWrapper: { borderLeft: '1px solid #CCCCCC' },
  featuredImgWrapper: { justifyContent: 'center', alignItems: 'center', display: 'flex', padding: `0 ${theme.spacing(1)}px` },
}));

const IndexPage: React.FC = () => {
  const classes = useStyles();

  const history = useHistory();
  const handleRedirect = (ID: string) => {
    history.push('/article/' + ID);
  };
  //get all posts from context
  const posts = useContext(PostContext);

  const [topPosts, setTopPosts] = useState<Post[]>([]);

  //get 4 latest posts
  useEffect(() => {
    if (posts) {
      setTopPosts(posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 4));
      console.log(topPosts);
    }
  }, [posts]);

  return (
    <div className='blog-wrapper'>
      <main>
        {!posts ? null : posts.length === 0 ? (
          <LoadingSign />
        ) : (
          <>
            <section className={classes.hero}>
              <BlogSVG />
            </section>
            {/* latest article section */}
            <section className={classes.section}>
              <Container className={classes.subtitle}>
                <Typography variant='h2' color='primary'>
                  Latest Articles
                </Typography>
              </Container>

              <Grid container className={classes.topArticleWrapper} spacing={2}>
                {topPosts.map(post => (
                  <Grid item xs={12} md={6} lg={3} key={post.id} className={classes.cardWrapper}>
                    <article>
                      <ArticleCard {...post} />
                    </article>
                  </Grid>
                ))}
              </Grid>
            </section>
            {/* more article section */}
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
                        <Grid container>
                          <Hidden only={['md', 'lg', 'xl']}>
                            <Link to={'/article/' + post.id}>
                              <Typography gutterBottom variant='h6' component='h2' display='inline'>
                                {post.title.replace('&#8211;', ' - ')}
                              </Typography>
                            </Link>
                          </Hidden>
                          <Grid item xs={8}>
                            <Hidden only={['xs']}>
                              <Link to={'/article/' + post.id}>
                                <Typography gutterBottom variant='h6' component='h2' display='inline'>
                                  {post.title.replace('&#8211;', ' - ')}
                                </Typography>
                              </Link>
                            </Hidden>

                            <Typography gutterBottom variant='subtitle1'>
                              {new Date(post.date).toLocaleString('en-AU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </Typography>
                            <Typography gutterBottom variant='body1' color='textSecondary' component='p' className={classes.excerpt}>
                              {post.excerpt.replace(/<\/?[^>]+>/gi, '')}
                            </Typography>
                          </Grid>
                          <Grid item xs={4} className={classes.featuredImgWrapper}>
                            {post.featuredMedia.full === 'none' ? (
                              <ArticleMediaSVG />
                            ) : (
                              <picture>
                                <source media='(max-width: 768px)' srcSet={post.featuredMedia.thumbnail} />
                                <source media='(max-width: 1280px)' srcSet={post.featuredMedia.medium} />
                                <img alt='Top article' src={post.featuredMedia.medium}></img>
                              </picture>
                            )}
                          </Grid>
                        </Grid>
                      </article>
                    </Grid>
                  ))}
                </Grid>
                {/* archive sidebar*/}
                <Hidden only={['xs', 'sm']}>
                  <Grid item md={4} className={classes.archiveWrapper} style={{ padding: '0 2vw' }}>
                    <Typography gutterBottom variant='h6' component='h2'>
                      Archive
                    </Typography>
                    {posts.map(post => (
                      <List aria-label='article archive' key={post.id}>
                        <ListItem button onClick={() => handleRedirect(post.id)}>
                          <ListItemText primary={post.title.replace('&#8211;', ' - ')} />
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
    </div>
  );
};

export default IndexPage;
