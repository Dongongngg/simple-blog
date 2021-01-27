import React from 'react';
import { useParams } from 'react-router-dom';
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

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h6'>this is a article {articleId}</Typography>
    </div>
  );
};

export default ArticlePage;
