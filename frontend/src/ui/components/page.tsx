import React, { StrictMode, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { MainPageContainer } from 'ui/containers/main-page-container';

import { ErrorCatcher } from 'ui/components/partial/error-catcher';
import { GlobalStyle } from 'ui/styles/global-styles';
import { Layout } from 'ui/styles/main-layout-styles';
import { lazy } from 'ui/components/partial/lazy';

const LazyNoMatch = lazy(() => import('./no-match'), 'NoMatch');

export const Page = () => (
  <StrictMode>
    <GlobalStyle />
    {/* 
      some logo by design and topbar
    */}
    <Router>
      <Layout>
        <ErrorCatcher>
          {/* 
          here should be some preloader instead of fallback text
        */}
          <Suspense fallback="Loading...">
            <Switch>
              <Route path="/" exact>
                <MainPageContainer />
              </Route>

              <Route>
                <LazyNoMatch />
              </Route>

            </Switch>
          </Suspense>
        </ErrorCatcher>
      </Layout>
    </Router>
  </StrictMode>
);
