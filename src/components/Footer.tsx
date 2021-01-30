import React from 'react';
//mui
import { makeStyles, Typography, Container, Button, Grid, Hidden } from '@material-ui/core/';
//icons
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles(theme => ({
  footerWrapper: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.background.default,
  },
  navWrapper: {
    padding: '5vh 0',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.background.default}`,
    '@media(max-width: 960px)': {
      padding: '2vh 0',
    },
  },
  navWrapperSmall: {
    padding: '2vh 0',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.background.default}`,
  },
  nav: { display: 'inline-block' },
  socialWrapper: {
    padding: '1vh 0',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.palette.background.default}`,
  },
  social: {
    margin: theme.spacing(1),
    '@media(max-width:960px)': {
      fontSize: '0.7rem',
    },
  },
  copyRightWrapper: {
    padding: '1vh 0',
    display: 'flex',
    justifyContent: 'space-between',
  },
  copyRight: {
    '@media(max-width: 960px)': {
      textAlign: 'center',
    },
  },
  madeBy: {
    textAlign: 'right',
    '@media(max-width: 960px)': {
      textAlign: 'center',
    },
  },
}));

const Footer: React.FC = () => {
  const classes = useStyles();
  return (
    <footer className={classes.footerWrapper}>
      <Hidden only={['md', 'lg', 'xl']}>
        <Container disableGutters maxWidth='lg' className={classes.navWrapperSmall}>
          <Typography variant='h4' className={classes.nav}>
            SimpleBlog
          </Typography>
        </Container>
      </Hidden>
      {/* navigation */}
      <Container disableGutters maxWidth='lg' className={classes.navWrapper}>
        <Typography variant='body2' className={classes.nav}>
          About Us
        </Typography>
        <Typography variant='body2' className={classes.nav}>
          Advertise
        </Typography>
        <Hidden only={['xs', 'sm']}>
          <Typography variant='h4' className={classes.nav}>
            SimpleBlog
          </Typography>
        </Hidden>

        <Typography variant='body2' className={classes.nav}>
          Contact
        </Typography>
        <Typography variant='body2' className={classes.nav}>
          Archives
        </Typography>
      </Container>
      {/* social media button */}
      <Container disableGutters maxWidth='md' className={classes.socialWrapper}>
        <Button variant='contained' size='small' className={classes.social} startIcon={<FacebookIcon />}>
          Facebook
        </Button>
        <Button variant='contained' size='small' className={classes.social} startIcon={<TwitterIcon />}>
          Twitter
        </Button>
        <Button variant='contained' size='small' className={classes.social} startIcon={<InstagramIcon />}>
          Instagram
        </Button>
      </Container>
      {/* copy right */}
      <Container disableGutters maxWidth='lg' className={classes.copyRightWrapper}>
        <Grid container>
          <Grid item xs={12} md={6} className={classes.copyRight}>
            <Typography variant='caption'>© 2021, SimpleBlog. All rights reserved</Typography>
          </Grid>
          <Grid item xs={12} md={6} className={classes.madeBy}>
            <Typography
              variant='caption'
              onClick={() => {
                window.open('https://www.jingfudong.com');
              }}
              style={{ cursor: 'pointer' }}
            >
              Site by Jingfu
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};
export default Footer;
