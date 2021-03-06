//main component for blog
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
//components
import ScrollToTop from './tools/ScrollToTop';
import indexPage from './pages/IndexPage';
import articlePage from './pages/ArticlePage';
import Footer from './components/Footer';
import Header from './components/Header';
//api
import { getPosts } from './api/post';
//types
import { Post } from './interfaces/blog';
//context
import { PostContext } from './blogContext';
import { CssBaseline } from '@material-ui/core/';
// const dummy: Post[] = [
//   {
//     id: '1',
//     date: '2021-01-25T13:47:00',
//     authors: [{ id: '2', name: 'James', link: 'asdasdadsad' }],
//     title: 'Forex Talking Points Starting The New Month',
//     excerpt:
//       ' <p>USD There were many events last week that saw the USD being supported, asthe 1.9 trillion Biden Stimulus package, which is being referred to as the ‘American Rescue Plan’, saw equities fall and move assets back into the dollar. This also saw gold fall as the USD appreciated. Another event that affected the USD was [&hellip;]</p>\n',
//     content:
//       '<p>The last month of the year has arrived, and what a big year it has been in the markets! Traders have seen extreme volatility across stock markets, crypto currencies, the FX Markets and commodities, seeing oil trade in the negatives and gold rocket to all time highs.</p>\n<h3>So What Can Traders Expect In The Markets As The Year Draws To A Close?</h3>\n<h2>Gold</h2>\n<p>The first area of interest for us is gold, currently trading in the 1700’s. Approaching the Weekly 50 moving average this may hold as a support. During both January and December gold has bullish seasonality, and we are watching prices closely to see if this will play out.</p>\n<p>Goldman Sachs have forecasted gold above $2300/ounce in 2021, and they are not the only large bank to have forecasted the precious metal over $2000/ounce; the Bank of America has forecasted prices to reach $3000/ounce over the next 18 months.</p>\n<h2>Watching the AUD Closely</h2>\n<p>Forex traders should be keeping a close eye on the AUD during december, with the RBA announcement of interest rates today. The AUD has been in a strong bull market since mid-march this year, and expectations are for this to continue. Westpac hold a AUDUSD end of year target at 0.7500, with forecasts at 0.8000 in 2021. The National Australian Bank (NAB) hold their 2020 end of year target at 0.7400, marginally above current price at 0.735.</p>\n<h2>GBP Advances</h2>\n<p>The possibility of a no-deal brexit is weighing on the GBP currently, with economic data having less of an impact on GBP exchange rates currently. Analysts seem to operating dual forecasts, hypothesising for a no-deal brexit and a trade-agreement brexit. OFX analysts have forecasted a drop on the GBPUSD rate to 1.2500 based upon a no-deal Brexit, whereas the NAB has forecasted an end of 2020 rate at 1.36, and look for it going into the 1.400’s over the next 24 months. Updates with Brexit will be an integral factor upon pound exchange rates in the coming months.</p>\n<h2>CAD &#8211; What To Expect For the Commodity Based Currency</h2>\n<p>The CAD has enjoyed recent gains on the back of recovering oil prices, and an increased risk appetite. Analysts for Scotiabank have claimed that the Canadian economy is in a better form than the BoC (Bank of Canada) recognise, and there are also speculations that under a new Biden Presidency new trade agreements between the US and Canada will be formed, which could strengthen the CAD. USDCAD has recently tested new lows for 2020, and should prices consolidate in these new lows CAD strength may prevail. The National Bank of Canada have forecasted short term CAD weakness, with an end of year USDCAD target at 1.3200, however anticipate a longer term bullish market on the CAD, with Q1 forecasts at 1.2800 and a 12 month target of 1.2500.</p>\n<p>Forecasts are prone to adjustments, to incorporate news and changing financial policies of countries, however offer good perspective for corporates looking to minimise exposure to change in exchange rates.</p>\n',
//     featuredMedia: {
//       thumbnail: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-150x150.jpg',
//       medium: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-300x124.jpg',
//       medium_large: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-768x318.jpg',
//       large: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-1024x424.jpg',
//       full: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit.jpg',
//     },
//   },
//   {
//     id: '2',
//     date: '2021-01-25T13:47:00',
//     authors: [{ id: '2', name: 'James', link: 'asdasdadsad' }],
//     title: 'Forex Talking Points Starting The New Month',
//     excerpt:
//       ' <p>This article is sponsored by Tonisignals. In financial markets, high and low points formed over quarterly and annual periods typically form significant levels for future movements. These levels are typically used by institutions as areas of interest for significant dealing, whether it be buying or selling. We will walk you through how to find these [&hellip;]</p>\n',
//     content:
//       '<p><img loading="lazy" class="alignnone size-large wp-image-100" src="https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-1024x538.png" alt="forex" width="1024" height="538" srcset="https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-1024x538.png 1024w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-300x158.png 300w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-768x404.png 768w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-1536x807.png 1536w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-2048x1076.png 2048w" sizes="(max-width: 1024px) 100vw, 1024px" /></p><p><img loading="lazy" class="alignnone size-large wp-image-100" src="https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-1024x538.png" alt="forex" width="1024" height="538" srcset="https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-1024x538.png 1024w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-300x158.png 300w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-768x404.png 768w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-1536x807.png 1536w, https://hammer.forexco.com.au/wp-content/uploads/2021/01/aud-daily-25jan-2048x1076.png 2048w" sizes="(max-width: 1024px) 100vw, 1024px" /></p>',
//     featuredMedia: {
//       thumbnail: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-150x150.jpg',
//       medium: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-300x124.jpg',
//       medium_large: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-768x318.jpg',
//       large: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-1024x424.jpg',
//       full: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit.jpg',
//     },
//   },
//   {
//     id: '3',
//     date: '2021-01-25T13:47:00',
//     authors: [{ id: '2', name: 'James', link: 'asdasdadsad' }],
//     title: 'Forex Talking Points Starting The New Month',
//     excerpt:
//       ' <p>This article is sponsored by Tonisignals. In financial markets, high and low points formed over quarterly and annual periods typically form significant levels for future movements. These levels are typically used by institutions as areas of interest for significant dealing, whether it be buying or selling. We will walk you through how to find these [&hellip;]</p>\n',
//     content:
//       '<p>The last month of the year has arrived, and what a big year it has been in the markets! Traders have seen extreme volatility across stock markets, crypto currencies, the FX Markets and commodities, seeing oil trade in the negatives and gold rocket to all time highs.</p>\n<h3>So What Can Traders Expect In The Markets As The Year Draws To A Close?</h3>\n<h2>Gold</h2>\n<p>The first area of interest for us is gold, currently trading in the 1700’s. Approaching the Weekly 50 moving average this may hold as a support. During both January and December gold has bullish seasonality, and we are watching prices closely to see if this will play out.</p>\n<p>Goldman Sachs have forecasted gold above $2300/ounce in 2021, and they are not the only large bank to have forecasted the precious metal over $2000/ounce; the Bank of America has forecasted prices to reach $3000/ounce over the next 18 months.</p>\n<h2>Watching the AUD Closely</h2>\n<p>Forex traders should be keeping a close eye on the AUD during december, with the RBA announcement of interest rates today. The AUD has been in a strong bull market since mid-march this year, and expectations are for this to continue. Westpac hold a AUDUSD end of year target at 0.7500, with forecasts at 0.8000 in 2021. The National Australian Bank (NAB) hold their 2020 end of year target at 0.7400, marginally above current price at 0.735.</p>\n<h2>GBP Advances</h2>\n<p>The possibility of a no-deal brexit is weighing on the GBP currently, with economic data having less of an impact on GBP exchange rates currently. Analysts seem to operating dual forecasts, hypothesising for a no-deal brexit and a trade-agreement brexit. OFX analysts have forecasted a drop on the GBPUSD rate to 1.2500 based upon a no-deal Brexit, whereas the NAB has forecasted an end of 2020 rate at 1.36, and look for it going into the 1.400’s over the next 24 months. Updates with Brexit will be an integral factor upon pound exchange rates in the coming months.</p>\n<h2>CAD &#8211; What To Expect For the Commodity Based Currency</h2>\n<p>The CAD has enjoyed recent gains on the back of recovering oil prices, and an increased risk appetite. Analysts for Scotiabank have claimed that the Canadian economy is in a better form than the BoC (Bank of Canada) recognise, and there are also speculations that under a new Biden Presidency new trade agreements between the US and Canada will be formed, which could strengthen the CAD. USDCAD has recently tested new lows for 2020, and should prices consolidate in these new lows CAD strength may prevail. The National Bank of Canada have forecasted short term CAD weakness, with an end of year USDCAD target at 1.3200, however anticipate a longer term bullish market on the CAD, with Q1 forecasts at 1.2800 and a 12 month target of 1.2500.</p>\n<p>Forecasts are prone to adjustments, to incorporate news and changing financial policies of countries, however offer good perspective for corporates looking to minimise exposure to change in exchange rates.</p>\n',
//     featuredMedia: {
//       thumbnail: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-150x150.jpg',
//       medium: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-300x124.jpg',
//       medium_large: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-768x318.jpg',
//       large: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-1024x424.jpg',
//       full: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit.jpg',
//     },
//   },
//   {
//     id: '4',
//     date: '2021-01-25T13:47:00',
//     authors: [{ id: '2', name: 'James', link: 'asdasdadsad' }],
//     title: 'Forex Talking Points Starting The New Month',
//     excerpt:
//       ' <p>This article is sponsored by Tonisignals. In financial markets, high and low points formed over quarterly and annual periods typically form significant levels for future movements. These levels are typically used by institutions as areas of interest for significant dealing, whether it be buying or selling. We will walk you through how to find these [&hellip;]</p>\n',
//     content:
//       '<p>The last month of the year has arrived, and what a big year it has been in the markets! Traders have seen extreme volatility across stock markets, crypto currencies, the FX Markets and commodities, seeing oil trade in the negatives and gold rocket to all time highs.</p>\n<h3>So What Can Traders Expect In The Markets As The Year Draws To A Close?</h3>\n<h2>Gold</h2>\n<p>The first area of interest for us is gold, currently trading in the 1700’s. Approaching the Weekly 50 moving average this may hold as a support. During both January and December gold has bullish seasonality, and we are watching prices closely to see if this will play out.</p>\n<p>Goldman Sachs have forecasted gold above $2300/ounce in 2021, and they are not the only large bank to have forecasted the precious metal over $2000/ounce; the Bank of America has forecasted prices to reach $3000/ounce over the next 18 months.</p>\n<h2>Watching the AUD Closely</h2>\n<p>Forex traders should be keeping a close eye on the AUD during december, with the RBA announcement of interest rates today. The AUD has been in a strong bull market since mid-march this year, and expectations are for this to continue. Westpac hold a AUDUSD end of year target at 0.7500, with forecasts at 0.8000 in 2021. The National Australian Bank (NAB) hold their 2020 end of year target at 0.7400, marginally above current price at 0.735.</p>\n<h2>GBP Advances</h2>\n<p>The possibility of a no-deal brexit is weighing on the GBP currently, with economic data having less of an impact on GBP exchange rates currently. Analysts seem to operating dual forecasts, hypothesising for a no-deal brexit and a trade-agreement brexit. OFX analysts have forecasted a drop on the GBPUSD rate to 1.2500 based upon a no-deal Brexit, whereas the NAB has forecasted an end of 2020 rate at 1.36, and look for it going into the 1.400’s over the next 24 months. Updates with Brexit will be an integral factor upon pound exchange rates in the coming months.</p>\n<h2>CAD &#8211; What To Expect For the Commodity Based Currency</h2>\n<p>The CAD has enjoyed recent gains on the back of recovering oil prices, and an increased risk appetite. Analysts for Scotiabank have claimed that the Canadian economy is in a better form than the BoC (Bank of Canada) recognise, and there are also speculations that under a new Biden Presidency new trade agreements between the US and Canada will be formed, which could strengthen the CAD. USDCAD has recently tested new lows for 2020, and should prices consolidate in these new lows CAD strength may prevail. The National Bank of Canada have forecasted short term CAD weakness, with an end of year USDCAD target at 1.3200, however anticipate a longer term bullish market on the CAD, with Q1 forecasts at 1.2800 and a 12 month target of 1.2500.</p>\n<p>Forecasts are prone to adjustments, to incorporate news and changing financial policies of countries, however offer good perspective for corporates looking to minimise exposure to change in exchange rates.</p>\n',
//     featuredMedia: {
//       thumbnail: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-150x150.jpg',
//       medium: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-300x124.jpg',
//       medium_large: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-768x318.jpg',
//       large: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit-1024x424.jpg',
//       full: 'https://hammer.forexco.com.au/wp-content/uploads/2020/12/what-is-the-current-standing-on-brexit.jpg',
//     },
//   },
// ];
const App: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | void>([]);
  // get all posts and store them in context
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
        <ScrollToTop />
        <CssBaseline />
        <Header />
        <Route exact path='/' component={indexPage} />
        <Route path='/article/:articleId' component={articlePage} />
        <Footer />
      </PostContext.Provider>
    </Router>
  );
};

export default App;
