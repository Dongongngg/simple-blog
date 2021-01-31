import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
//mui
import { makeStyles, Typography, List, ListItem, ListItemText, Grid } from '@material-ui/core';
//context
import { PostContext } from '../blogContext';

const useStyles = makeStyles({
  archiveWrapper: { borderLeft: '1px solid #CCCCCC' },
});

const Archive: React.FC = () => {
  //get all posts from context
  const posts = useContext(PostContext);
  const classes = useStyles();
  const history = useHistory();
  const handleRedirect = (ID: string) => {
    history.push('/article/' + ID);
  };
  return (
    <Grid item md={4} className={classes.archiveWrapper} style={{ padding: '0 2vw' }}>
      <Typography gutterBottom variant='h6' component='h2'>
        Archive
      </Typography>
      {posts
        ? posts.map(post => (
            <List aria-label='article archive' key={post.id}>
              <ListItem button onClick={() => handleRedirect(post.id)}>
                <ListItemText primary={post.title.replace('&#8211;', ' - ')} />
              </ListItem>
            </List>
          ))
        : ''}
    </Grid>
  );
};

export default Archive;
