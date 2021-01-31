import React from 'react';
import { Link, useHistory } from 'react-router-dom';
//types
import { Post } from '../interfaces/blog';
//mui
import { Paper, makeStyles, Typography, Card, CardContent, Button } from '@material-ui/core/';
//components
import ArticleMediaSVG from '../components/ArticleMediaSVG';

const useStyles = makeStyles(theme => ({
  wrapper: {
    padding: '12px',
  },
  contentWrapper: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px `,
  },
  content: {
    display: '-webkit-box',
    boxOrient: 'vertical',
    lineClamp: 2,
    overflow: 'hidden',
    maxHeight: '33vh',
  },
}));

const ArticleCard: React.FC<Post> = (post: Post) => {
  const classes = useStyles();
  const history = useHistory();

  const handleRedirect = (ID: string) => {
    history.push('/article/' + ID);
  };

  return (
    <Card elevation={3}>
      <Paper className={classes.wrapper}>
        {post.featuredMedia.full === 'none' ? (
          <ArticleMediaSVG />
        ) : (
          <picture>
            <source media='(max-width: 480px)' srcSet={post.featuredMedia.medium_large} />
            <source media='(max-width: 768px)' srcSet={post.featuredMedia.medium} />
            <source media='(max-width: 1024px)' srcSet={post.featuredMedia.medium_large} />
            <source media='(max-width: 1280px)' srcSet={post.featuredMedia.medium} />
            <img alt='Top article' src={post.featuredMedia.full}></img>
          </picture>
        )}

        <CardContent className={classes.contentWrapper}>
          <Link to={'/article/' + post.id}>
            <Typography gutterBottom variant='h5' component='h2'>
              {post.title.replace('&#8211;', ' - ')}
            </Typography>
          </Link>

          <Typography gutterBottom variant='subtitle1'>
            {new Date(post.date).toLocaleString('en-AU', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </Typography>
          <Typography gutterBottom variant='body1' component='p' className={classes.content} color='textSecondary'>
            {post.excerpt.replace(/<\/?[^>]+>/gi, '')}
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
