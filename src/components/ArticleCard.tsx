import React from 'react';
import { Link, useHistory } from 'react-router-dom';
//types
import { PostContent } from '../interfaces/blog';
//mui
import { Paper, makeStyles, Typography, Card, CardContent, Button } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: '12px',
  },
  contentWrapper: {
    padding: theme.spacing(1),
  },
  content: {
    whiteSpace: 'pre',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxHeight: '33vh',
  },
}));

const ArticleCard: React.FC<PostContent> = (post: PostContent) => {
  const classes = useStyles();
  const history = useHistory();

  const handleRedirect = (ID: string) => {
    history.push('/article/' + ID);
  };

  return (
    <Card elevation={3}>
      <Paper className={classes.wrapper}>
        <CardContent className={classes.contentWrapper}>
          <Link to={'/article/' + post.id}>
            <Typography gutterBottom variant='h5' component='h2'>
              {post.title.replace('&#8211;', ' - ')}
            </Typography>
          </Link>

          <Typography gutterBottom variant='subtitle1'>
            {new Date(post.date).toLocaleString('en-AU', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Typography>
          <Typography gutterBottom variant='body1' component='p' className={classes.content} color='textSecondary'>
            {post.content.replace(/<\/?[^>]+>/gi, '')}
          </Typography>
        </CardContent>
        <Button size='small' color='primary' onClick={() => handleRedirect(post.id)}>
          Learn More
        </Button>
        <Button size='small' color='primary'>
          Share
        </Button>
      </Paper>
    </Card>
  );
};

export default ArticleCard;
