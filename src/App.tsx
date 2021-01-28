//main component for blog
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//components
import indexPage from './pages/IndexPage';
import articlePage from './pages/ArticlePage';
//api
import { getPosts } from './api/post';
//types
import { Post } from './interfaces/blog';
//context
import { PostContext } from './blogContext';
//mui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const dummy: Post[] = [
  {
    id: '1',
    authorId: '2',
    date: '2021-01-25T13:47:00',
    title: 'Forex Talking Points Starting The New Month',
    content:
      '<p>The last month of the year has arrived, and what a big year it has been in the markets! Traders have seen extreme volatility across stock markets, crypto currencies, the FX Markets and commodities, seeing oil trade in the negatives and gold rocket to all time highs.</p>\n<h3>So What Can Traders Expect In The Markets As The Year Draws To A Close?</h3>\n<h2>Gold</h2>\n<p>The first area of interest for us is gold, currently trading in the 1700’s. Approaching the Weekly 50 moving average this may hold as a support. During both January and December gold has bullish seasonality, and we are watching prices closely to see if this will play out.</p>\n<p>Goldman Sachs have forecasted gold above $2300/ounce in 2021, and they are not the only large bank to have forecasted the precious metal over $2000/ounce; the Bank of America has forecasted prices to reach $3000/ounce over the next 18 months.</p>\n<h2>Watching the AUD Closely</h2>\n<p>Forex traders should be keeping a close eye on the AUD during december, with the RBA announcement of interest rates today. The AUD has been in a strong bull market since mid-march this year, and expectations are for this to continue. Westpac hold a AUDUSD end of year target at 0.7500, with forecasts at 0.8000 in 2021. The National Australian Bank (NAB) hold their 2020 end of year target at 0.7400, marginally above current price at 0.735.</p>\n<h2>GBP Advances</h2>\n<p>The possibility of a no-deal brexit is weighing on the GBP currently, with economic data having less of an impact on GBP exchange rates currently. Analysts seem to operating dual forecasts, hypothesising for a no-deal brexit and a trade-agreement brexit. OFX analysts have forecasted a drop on the GBPUSD rate to 1.2500 based upon a no-deal Brexit, whereas the NAB has forecasted an end of 2020 rate at 1.36, and look for it going into the 1.400’s over the next 24 months. Updates with Brexit will be an integral factor upon pound exchange rates in the coming months.</p>\n<h2>CAD &#8211; What To Expect For the Commodity Based Currency</h2>\n<p>The CAD has enjoyed recent gains on the back of recovering oil prices, and an increased risk appetite. Analysts for Scotiabank have claimed that the Canadian economy is in a better form than the BoC (Bank of Canada) recognise, and there are also speculations that under a new Biden Presidency new trade agreements between the US and Canada will be formed, which could strengthen the CAD. USDCAD has recently tested new lows for 2020, and should prices consolidate in these new lows CAD strength may prevail. The National Bank of Canada have forecasted short term CAD weakness, with an end of year USDCAD target at 1.3200, however anticipate a longer term bullish market on the CAD, with Q1 forecasts at 1.2800 and a 12 month target of 1.2500.</p>\n<p>Forecasts are prone to adjustments, to incorporate news and changing financial policies of countries, however offer good perspective for corporates looking to minimise exposure to change in exchange rates.</p>\n',
  },
  {
    id: '2',
    authorId: '4',
    date: '2021-01-25T13:47:00',
    title: 'Technical Forex Outlook &#8211; 25.01.2021',
    content:
      '<p><img loading="lazy" class="alignnone size-large wp-image-100" src="https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-1024x538.png" alt="forex" width="1024" height="538" srcset="https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-1024x538.png 1024w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-300x158.png 300w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-768x404.png 768w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-1536x807.png 1536w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-2048x1076.png 2048w" sizes="(max-width: 1024px) 100vw, 1024px" /></p><p><img loading="lazy" class="alignnone size-large wp-image-100" src="https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-1024x538.png" alt="forex" width="1024" height="538" srcset="https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-1024x538.png 1024w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-300x158.png 300w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-768x404.png 768w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-1536x807.png 1536w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-2048x1076.png 2048w" sizes="(max-width: 1024px) 100vw, 1024px" /></p>',
  },
  {
    id: '3',
    authorId: '2',
    date: '2021-01-25T13:47:00',
    title: 'Forex Talking Points Starting The New Month',
    content:
      '<p>The last month of the year has arrived, and what a big year it has been in the markets! Traders have seen extreme volatility across stock markets, crypto currencies, the FX Markets and commodities, seeing oil trade in the negatives and gold rocket to all time highs.</p>\n<h3>So What Can Traders Expect In The Markets As The Year Draws To A Close?</h3>\n<h2>Gold</h2>\n<p>The first area of interest for us is gold, currently trading in the 1700’s. Approaching the Weekly 50 moving average this may hold as a support. During both January and December gold has bullish seasonality, and we are watching prices closely to see if this will play out.</p>\n<p>Goldman Sachs have forecasted gold above $2300/ounce in 2021, and they are not the only large bank to have forecasted the precious metal over $2000/ounce; the Bank of America has forecasted prices to reach $3000/ounce over the next 18 months.</p>\n<h2>Watching the AUD Closely</h2>\n<p>Forex traders should be keeping a close eye on the AUD during december, with the RBA announcement of interest rates today. The AUD has been in a strong bull market since mid-march this year, and expectations are for this to continue. Westpac hold a AUDUSD end of year target at 0.7500, with forecasts at 0.8000 in 2021. The National Australian Bank (NAB) hold their 2020 end of year target at 0.7400, marginally above current price at 0.735.</p>\n<h2>GBP Advances</h2>\n<p>The possibility of a no-deal brexit is weighing on the GBP currently, with economic data having less of an impact on GBP exchange rates currently. Analysts seem to operating dual forecasts, hypothesising for a no-deal brexit and a trade-agreement brexit. OFX analysts have forecasted a drop on the GBPUSD rate to 1.2500 based upon a no-deal Brexit, whereas the NAB has forecasted an end of 2020 rate at 1.36, and look for it going into the 1.400’s over the next 24 months. Updates with Brexit will be an integral factor upon pound exchange rates in the coming months.</p>\n<h2>CAD &#8211; What To Expect For the Commodity Based Currency</h2>\n<p>The CAD has enjoyed recent gains on the back of recovering oil prices, and an increased risk appetite. Analysts for Scotiabank have claimed that the Canadian economy is in a better form than the BoC (Bank of Canada) recognise, and there are also speculations that under a new Biden Presidency new trade agreements between the US and Canada will be formed, which could strengthen the CAD. USDCAD has recently tested new lows for 2020, and should prices consolidate in these new lows CAD strength may prevail. The National Bank of Canada have forecasted short term CAD weakness, with an end of year USDCAD target at 1.3200, however anticipate a longer term bullish market on the CAD, with Q1 forecasts at 1.2800 and a 12 month target of 1.2500.</p>\n<p>Forecasts are prone to adjustments, to incorporate news and changing financial policies of countries, however offer good perspective for corporates looking to minimise exposure to change in exchange rates.</p>\n',
  },
  {
    id: '4',
    authorId: '2',
    date: '2021-01-25T13:47:00',
    title: 'Forex Talking Points Starting The New Month',
    content:
      '<p>The last month of the year has arrived, and what a big year it has been in the markets! Traders have seen extreme volatility across stock markets, crypto currencies, the FX Markets and commodities, seeing oil trade in the negatives and gold rocket to all time highs.</p>\n<h3>So What Can Traders Expect In The Markets As The Year Draws To A Close?</h3>\n<h2>Gold</h2>\n<p>The first area of interest for us is gold, currently trading in the 1700’s. Approaching the Weekly 50 moving average this may hold as a support. During both January and December gold has bullish seasonality, and we are watching prices closely to see if this will play out.</p>\n<p>Goldman Sachs have forecasted gold above $2300/ounce in 2021, and they are not the only large bank to have forecasted the precious metal over $2000/ounce; the Bank of America has forecasted prices to reach $3000/ounce over the next 18 months.</p>\n<h2>Watching the AUD Closely</h2>\n<p>Forex traders should be keeping a close eye on the AUD during december, with the RBA announcement of interest rates today. The AUD has been in a strong bull market since mid-march this year, and expectations are for this to continue. Westpac hold a AUDUSD end of year target at 0.7500, with forecasts at 0.8000 in 2021. The National Australian Bank (NAB) hold their 2020 end of year target at 0.7400, marginally above current price at 0.735.</p>\n<h2>GBP Advances</h2>\n<p>The possibility of a no-deal brexit is weighing on the GBP currently, with economic data having less of an impact on GBP exchange rates currently. Analysts seem to operating dual forecasts, hypothesising for a no-deal brexit and a trade-agreement brexit. OFX analysts have forecasted a drop on the GBPUSD rate to 1.2500 based upon a no-deal Brexit, whereas the NAB has forecasted an end of 2020 rate at 1.36, and look for it going into the 1.400’s over the next 24 months. Updates with Brexit will be an integral factor upon pound exchange rates in the coming months.</p>\n<h2>CAD &#8211; What To Expect For the Commodity Based Currency</h2>\n<p>The CAD has enjoyed recent gains on the back of recovering oil prices, and an increased risk appetite. Analysts for Scotiabank have claimed that the Canadian economy is in a better form than the BoC (Bank of Canada) recognise, and there are also speculations that under a new Biden Presidency new trade agreements between the US and Canada will be formed, which could strengthen the CAD. USDCAD has recently tested new lows for 2020, and should prices consolidate in these new lows CAD strength may prevail. The National Bank of Canada have forecasted short term CAD weakness, with an end of year USDCAD target at 1.3200, however anticipate a longer term bullish market on the CAD, with Q1 forecasts at 1.2800 and a 12 month target of 1.2500.</p>\n<p>Forecasts are prone to adjustments, to incorporate news and changing financial policies of countries, however offer good perspective for corporates looking to minimise exposure to change in exchange rates.</p>\n',
  },
];
const App: React.FC = () => {
  const classes = useStyles();

  const [posts, setPosts] = useState<Post[] | void>([]);

  useEffect(() => {
    const getAll = async (): Promise<Post[] | void> => {
      const res = await getPosts();
      return res;
    };
    getAll().then(data => {
      console.log(data);
      setPosts(data);
    });
    // setPosts(dummy);
  }, []);

  return (
    <Router>
      <PostContext.Provider value={posts}>
        <AppBar position='static'>
          <Container maxWidth='lg'>
            <Toolbar>
              <Typography className={classes.title} variant='h6' noWrap>
                Simple Blog
              </Typography>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder='Search…'
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </div>
            </Toolbar>
          </Container>
        </AppBar>
        <Route exact path='/' component={indexPage} />
        <Route path='/article/:articleId' component={articlePage} />
      </PostContext.Provider>
    </Router>
  );
};

export default App;
