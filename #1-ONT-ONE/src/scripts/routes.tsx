import * as React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/app';
import Container from './pages/_container';
import OEP4Token from './pages/OEP4Token';
import OEP4TokenCrowdsale from './pages/OEP4TokenCrowdsale';
import ManageCrowdsale from './pages/ManageCrowdsale';
import BuyTokens from './pages/BuyTokens';

export function getRoutes() {
  return (
    <Route path='/' component={Container}>
      <IndexRoute component={App} />
      <Route path='oep4' component={OEP4Token} />
      <Route path='oep4crowdsale' component={OEP4TokenCrowdsale} />
      <Route path='mangecrowdsale' component={ManageCrowdsale} />
      <Route path='buytokens' component={BuyTokens} />
    </Route>
  );
}
