import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
//context
import { PostContext } from '../blogContext';
//type
import { Post } from '../interfaces/blog';
//mui
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

type param = {
  articleId: string;
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    textAlign: 'center',
  },
});

const ArticlePage: React.FC = () => {
  const { articleId }: param = useParams();
  const posts = useContext(PostContext);

  const [crtPost, setCrtPost] = useState<Post>();
  const [notFound, setNotFound] = useState(false);

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
      <Typography variant='h3'>this is a article {articleId}</Typography>

      {!crtPost ? (
        <h1>Loading...</h1>
      ) : (
        <article>
          <Typography dangerouslySetInnerHTML={{ __html: crtPost.title }}></Typography>
          <Typography dangerouslySetInnerHTML={{ __html: crtPost.content }}></Typography>
        </article>
      )}
    </div>
  );
};

export default ArticlePage;
