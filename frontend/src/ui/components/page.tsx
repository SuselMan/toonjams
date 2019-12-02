import React, { StrictMode, Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { stores } from 'stores';

import { MainPageContainer } from 'ui/containers/main-page-container';
import { PageHeader } from 'ui/components/top-navigation/header';

import { ErrorCatcher } from 'ui/fragments/error-catcher';
import { GlobalStyle } from 'ui/styles/global-styles';
import { Layout } from 'ui/styles/main-layout-styles';
import { lazy } from 'utils/lazy';

const LazyNoMatch = lazy(() => import('./no-match'), 'NoMatch');

export const Page = () => (
  <Provider {...stores} >
    <GlobalStyle />
    {/* 
        some logo by design and topbar
      */}
    <Router>
      <Layout>
        <PageHeader />
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
  </Provider>
);
