import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
//context
import { PostContext } from '../blogContext';
//type
import { Post } from '../interfaces/blog';
//mui
import { makeStyles, Typography, Fab, Tooltip, Container, Button, Hidden } from '@material-ui/core/';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
//component
import LoadingSign from '../components/LoadingSign';
import Archive from '../components/Archive';

type param = {
  articleId: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& .MuiTypography-root > p,h2,h3': { paddingBottom: theme.spacing(3) },
    '& .MuiTypography-root > p > a': { fontStyle: 'italic' },
  },
  backBtn: {
    position: 'fixed',
    marginRight: theme.spacing(2),
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
  articleWrapper: { padding: '5vh 0' },
  title: { padding: `${theme.spacing(3)}px 0` },
  meta: { paddingBottom: theme.spacing(1), '&:last-of-type': { paddingBottom: theme.spacing(3) } },
  featuredMedia: { paddingBottom: `${theme.spacing(5)}px` },
  content: { padding: `${theme.spacing(3)}px 0`, borderTop: '1px solid #CCCCCC' },
}));

const ArticlePage: React.FC = () => {
  const { articleId }: param = useParams();
  const history = useHistory();

  //get data from context
  const posts = useContext(PostContext);

  const [crtPost, setCrtPost] = useState<Post>();
  const [notFound, setNotFound] = useState<boolean>(false);

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
        <Container
          maxWidth='md'
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
        >
          <Typography variant='h3'>Not Found...</Typography>
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
                Updated{' '}
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
      )}
    </main>
  );
};

export default ArticlePage;
