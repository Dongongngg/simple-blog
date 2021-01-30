import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
//context
import { PostContext } from '../blogContext';
//type
import { PostContent } from '../interfaces/blog';
//mui
import { makeStyles, Typography, Fab, Tooltip, Container } from '@material-ui/core/';
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

  const [crtPost, setCrtPost] = useState<PostContent>();
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
        <Typography variant='h3'>Not Found</Typography>
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
            <Typography variant='subtitle1' className={classes.meta}>
              {crtPost.date.substring(0, 10)} By {crtPost.author ? crtPost.author.name : 'Known'}
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
