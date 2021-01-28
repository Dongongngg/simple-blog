import React from 'react';
import { Link, useHistory } from 'react-router-dom';
//types
import { Post } from '../interfaces/blog';
//mui
import { Container, makeStyles, Typography, Card, CardActionArea, CardActions, CardContent, CardMedia, Button } from '@material-ui/core/';

const useStyles = makeStyles(theme => ({
  wrapper: {},
  contentWrapper: {
    padding: theme.spacing(1),
  },
  content: {
    whiteSpace: 'pre',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    maxHeight: '33vh',
  },
  titleWrapper: {},
  title: {},
}));

const ArticleCard: React.FC<Post> = (post: Post) => {
  const classes = useStyles();
  const history = useHistory();
  return (
    <Card className={classes.wrapper}>
      <CardActionArea>
        {/* <CardMedia component='img' alt='Contemplative Reptile' height='140' title='Contemplative Reptile' /> */}
        <CardContent className={classes.contentWrapper}>
          <Link to={'/article/' + post.id}>
            <Typography gutterBottom variant='h5' component='h2'>
              {post.title}
            </Typography>
          </Link>

          <Typography gutterBottom>{post.date}</Typography>
          <Typography variant='body2' color='textSecondary' component='p' className={classes.content}>
            {post.content.replace(/<\/?[^>]+>/gi, '')}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size='small'
          color='primary'
          onClick={() => {
            history.push('/article/' + post.id);
          }}
        >
          Learn More
        </Button>
        <Button size='small' color='primary'>
          Share
        </Button>
      </CardActions>
    </Card>
  );
};

export default ArticleCard;
