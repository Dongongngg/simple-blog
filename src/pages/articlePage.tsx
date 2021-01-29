import React, { useState, useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
//context
import { PostContext } from '../blogContext';
//type
import { Post } from '../interfaces/blog';
//mui
import { makeStyles, Typography, Fab, Tooltip } from '@material-ui/core/';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
//component
import LoadingSign from '../components/LoadingSign';
type param = {
  articleId: string;
};

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    textAlign: 'center',
  },
  backBtn: {
    position: 'fixed',
    marginRight: theme.spacing(2),
    right: theme.spacing(2),
    bottom: theme.spacing(2),
  },
}));

const ArticlePage: React.FC = () => {
  const { articleId }: param = useParams();
  const history = useHistory();

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
      <div className={classes.root}>
        <Typography>Not Found</Typography>
      </div>
    );
  }
  return (
    <div className={classes.root}>
      {!crtPost ? (
        <LoadingSign />
      ) : (
        <>
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

          <Typography variant='h3'>this is a article {articleId}</Typography>
          <article>
            <Typography dangerouslySetInnerHTML={{ __html: crtPost.title }}></Typography>
            <Typography dangerouslySetInnerHTML={{ __html: crtPost.content }}></Typography>
          </article>
        </>
      )}
    </div>
  );
};

export default ArticlePage;
