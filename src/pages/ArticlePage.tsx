import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
//context
import { PostContext } from '../blogContext';
//type
import { Post } from '../interfaces/blog';
//mui
import { makeStyles, Typography, Fab, Tooltip, Container, Button } from '@material-ui/core/';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
//component
import LoadingSign from '../components/LoadingSign';
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
  title: { padding: `${theme.spacing(3)}px 0` },
  meta: { paddingBottom: theme.spacing(3) },
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

          {/* <Typography variant='h3'>this is a article {articleId}</Typography> */}
          <article>
            <Typography dangerouslySetInnerHTML={{ __html: crtPost.title }} variant='h3' className={classes.title}></Typography>
            <Typography variant='subtitle2' className={classes.meta}>
              {new Date(crtPost.date).toLocaleString('en-AU', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}{' '}
              By{' '}
              {crtPost.authors.map(author => (
                <b key={author.id}>{author.name}</b>
              ))}
            </Typography>
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
