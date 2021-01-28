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
  console.log(posts);

  const [crtPost, setCrtPost] = useState<void | Post>();

  useEffect(() => {
    if (posts) {
      const post = posts.find(e => e.id === articleId);
      if (post) {
        setCrtPost(post);
      }
    }
  }, [posts]);

  //mui style
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h6'>this is a article {articleId}</Typography>
      {crtPost ? (
        <article>
          <Typography dangerouslySetInnerHTML={{ __html: crtPost.title }}></Typography>
          <Typography dangerouslySetInnerHTML={{ __html: crtPost.content }}></Typography>
        </article>
      ) : (
        <h1>Can not find this article</h1>
      )}
    </div>
  );
};

export default ArticlePage;
