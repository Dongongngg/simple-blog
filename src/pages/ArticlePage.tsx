import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
//context
import { PostContext } from '../blogContext';
//type
import { Post } from '../interfaces/blog';
//mui
import { makeStyles, Typography, Fab, Tooltip, Container, Button } from '@material-ui/core/';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
//icons
import ErrorIcon from '@material-ui/icons/Error';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
//component
import LoadingSign from '../components/LoadingSign';

type param = {
  articleId: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    //for fetched html string
    '& .MuiTypography-root > p,h2,h3[no-class]': { paddingBottom: theme.spacing(3), lineHeight: '2' },
    '& .MuiTypography-root > p > a': { fontStyle: 'italic' },
  },
  backBtn: {
    position: 'fixed',
    marginRight: theme.spacing(2),
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
  backTextWrapper: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingTop: theme.spacing(4),
    cursor: 'pointer',
  },
  articleWrapper: { paddingBottom: theme.spacing(3) },
  title: { padding: `${theme.spacing(3)}px 0` },
  meta: { paddingBottom: theme.spacing(1), '&:last-of-type': { paddingBottom: theme.spacing(3) } },
  featuredMedia: { paddingBottom: `${theme.spacing(5)}px` },
  content: { padding: `${theme.spacing(3)}px 0`, borderTop: '1px solid #CCCCCC' },
  errorWrapper: { display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' },
  errorMsg: { display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginBottom: theme.spacing(3) },
  errorIcon: { fontSize: '3rem', marginRight: theme.spacing(3) },
}));

const ArticlePage: React.FC = () => {
  const { articleId }: param = useParams();
  const history = useHistory();

  //get data from context
  const posts = useContext(PostContext);

  const [crtPost, setCrtPost] = useState<Post>();
  const [notFound, setNotFound] = useState<boolean>(false);

  //find current page from context by params of url
  useEffect(() => {
    if (posts && posts.length > 0) {
      const post = posts.find(e => e.id == articleId);
      if (!post) {
        setNotFound(true);
      } else {
        setCrtPost(post);
      }
    }
  }, [posts]);

  //mui style
  const classes = useStyles();

  if (notFound) {
    return (
      <main className={classes.root}>
        <Container maxWidth='md' className={classes.errorWrapper}>
          <div className={classes.errorMsg}>
            <ErrorIcon color='primary' className={classes.errorIcon} />
            <Typography variant='h3'>Article not found</Typography>
          </div>

          <Button variant='outlined' size='small' onClick={() => history.push('/')}>
            Back to blog
          </Button>
        </Container>
      </main>
    );
  }
  return (
    <main className={classes.root}>
      {!crtPost ? (
        <LoadingSign />
      ) : (
        <>
          <Container maxWidth='lg' className={classes.backTextWrapper}>
            <ArrowBackIosIcon style={{ fontSize: '1rem' }} />
            <Typography
              variant='button'
              component='a'
              onClick={() => {
                history.push('/');
              }}
            >
              Back to latest
            </Typography>
          </Container>
          <Container maxWidth='md'>
            <Tooltip title={<h2>Latest Articles</h2>} placement='left'>
              <Fab
                className={classes.backBtn}
                color='primary'
                onClick={() => {
                  history.push('/');
                }}
              >
                <NavigateBeforeIcon fontSize='large' />
                <Typography variant='button'></Typography>
              </Fab>
            </Tooltip>

            <article className={classes.articleWrapper}>
              <Typography dangerouslySetInnerHTML={{ __html: crtPost.title }} variant='h3' className={classes.title}></Typography>
              <Typography variant='subtitle1' className={classes.meta}>
                <Typography component='span' color='textSecondary'>
                  Written by{' '}
                  {crtPost.authors.map(author => (
                    <Typography key={author.id} href={author.link} component='a' color='textPrimary'>
                      {author.name}{' '}
                    </Typography>
                  ))}
                </Typography>
              </Typography>

              <Typography variant='subtitle1' className={classes.meta}>
                <Typography component='span' color='textSecondary'>
                  Last updated{' '}
                </Typography>
                {new Date(crtPost.date).toLocaleString('en-AU', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })}
              </Typography>
              <div className={classes.featuredMedia}>
                <picture>
                  <source media='(max-width: 480px)' srcSet={crtPost.featuredMedia.medium_large} />
                  <source media='(max-width: 768px)' srcSet={crtPost.featuredMedia.medium} />
                  <source media='(max-width: 1024px)' srcSet={crtPost.featuredMedia.medium_large} />
                  <source media='(max-width: 1280px)' srcSet={crtPost.featuredMedia.full} />
                  <img alt='Top article' src={crtPost.featuredMedia.full}></img>
                </picture>
              </div>

              <Typography
                dangerouslySetInnerHTML={{ __html: crtPost.content }}
                variant='body1'
                component='div'
                className={classes.content}
              ></Typography>
            </article>
          </Container>
        </>
      )}
    </main>
  );
};

export default ArticlePage;
