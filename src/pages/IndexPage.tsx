//main component for blog
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//context
import { PostContext } from '../blogContext';
//type
import { Post } from '../interfaces/blog';
//css for fetched html string
import '../styles/html-string.css';
//mui
import { Grid, Container, makeStyles, Typography, Hidden } from '@material-ui/core/';
//components
import ArticleCard from '../components/ArticleCard';
import Archive from '../components/Archive';
import LoadingSign from '../components/LoadingSign';
import BlogSVG from '../components/BlogSVG';
import ArticleMediaSVG from '../components/ArticleMediaSVG';

const useStyles = makeStyles(theme => ({
  hero: {
    display: 'flex',
    justifyContent: 'center',
  },
  bannerWrapper: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },

  subtitleWrapper: {
    height: '16vh',
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
  sectionWrapper: {
    marginBottom: '8vh',
    '@media (max-width: 960px)': {
      marginBottom: '4vh',
    },
  },

  cardWrapper: {
    '&:hover': {
      transition: 'all .2s ease-in-out',
      transform: 'translateY(-3%)',
    },
  },
  article: { marginBottom: '4vh' },
  excerpt: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 3,
    overflow: 'hidden',
  },
  moreArticleWrapper: {
    margin: '0',
  },
  featuredImgWrapper: { justifyContent: 'center', alignItems: 'center', display: 'flex', padding: `0 ${theme.spacing(1)}px` },
}));

const IndexPage: React.FC = () => {
  const classes = useStyles();
  //get all posts from context
  const posts = useContext(PostContext);

  const [topPosts, setTopPosts] = useState<Post[]>([]);

  //get 4 latest posts
  useEffect(() => {
    if (posts) {
      setTopPosts(posts.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)).slice(0, 4));
    }
  }, [posts]);

  return (
    <div className='blog-wrapper'>
      <main>
        {!posts ? null : posts.length === 0 ? (
          <LoadingSign />
        ) : (
          <>
            {/* hero img */}
            <section className={classes.sectionWrapper}>
              <Container className={classes.hero} maxWidth='md'>
                <BlogSVG />
              </Container>
            </section>
            {/* latest article section */}
            <section className={classes.sectionWrapper}>
              <Container className={classes.bannerWrapper} maxWidth={false}>
                <Typography variant='h1' style={{ padding: '2vh' }}>
                  SimpleBlog
                </Typography>
                <Typography variant='subtitle1' style={{ fontStyle: 'italic', padding: '1vh' }}>
                  Everyday forex post.
                </Typography>
              </Container>
              <Container className={classes.subtitleWrapper}>
                <Typography variant='h2' color='primary'>
                  Latest Articles
                </Typography>
              </Container>

              <Container maxWidth='xl'>
                <Grid container spacing={2}>
                  {topPosts.map(post => (
                    <Grid item xs={12} md={6} lg={3} key={post.id} className={classes.cardWrapper}>
                      <article>
                        <ArticleCard {...post} />
                      </article>
                    </Grid>
                  ))}
                </Grid>
              </Container>
            </section>
            {/* more article section */}
            <section className={classes.sectionWrapper}>
              <Container className={classes.subtitleWrapper}>
                <Typography variant='h2' color='primary'>
                  More Articles
                </Typography>
              </Container>
              <Container maxWidth='lg'>
                <Grid container className={classes.moreArticleWrapper} spacing={2}>
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
                            {/* title and excerpt */}
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
                                  month: 'short',
                                  day: 'numeric',
                                })}
                              </Typography>
                              <Typography gutterBottom variant='body1' color='textSecondary' component='p' className={classes.excerpt}>
                                {post.excerpt.replace(/<\/?[^>]+>/gi, '')}
                              </Typography>
                            </Grid>
                            {/* feature img */}
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
                    <Archive />
                  </Hidden>
                </Grid>
              </Container>
            </section>
          </>
        )}
      </main>
    </div>
  );
};

export default IndexPage;
