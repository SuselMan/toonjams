import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { ThemeProvider } from 'styled-components';
import { stores } from 'stores';

import { PageHeader } from 'ui/components/top-navigation/header';

import { ErrorCatcher } from 'ui/fragments/error-catcher';
import { GlobalStyle } from 'ui/styles/global-styles';
import { Layout } from 'ui/styles/main-layout-styles';

import { getListOfLazyComponents } from 'utils/lazy';
import { ScrollToTop } from 'utils/scroll-to-top';

const LazyComponents = getListOfLazyComponents();

export const Page = () => (
  <Provider {...stores} >
    <ThemeProvider theme={{ mode: 'light' }}>
      <GlobalStyle />
      {/* 
        some logo by design and topbar
      */}
      <Router>
        <ScrollToTop />
        <Layout>
          <PageHeader />
          <ErrorCatcher>
            {/* 
            here should be some preloader instead of fallback text
          */}
            <Suspense fallback="Loading...">
              <Switch>
                <Route path="/" exact>
                  <LazyComponents.MainPage />
                </Route>

                <Route path="/authorization" >
                  <LazyComponents.Authorization />
                </Route>

                <Route path="/users">
                  <LazyComponents.UsersList />
                </Route>

                <Route path="/user/:id">
                  <LazyComponents.UserPage />
                </Route>

                <Route path="/settings">
                  <LazyComponents.SettingsPage />
                </Route>

                <Route path="/medias">
                  <LazyComponents.MediasPage />
                </Route>

                <Route path="uploadmedia">
                  <LazyComponents.MediasPage />
                </Route>

                <Route path="/events">
                  <LazyComponents.EventsPage />
                </Route>

                <Route path="/event/:id">
                  <LazyComponents.EventPage />
                </Route>

                <Route path="/createevent">
                  <LazyComponents.CreateEventPage />
                </Route>

                <Route>
                  <LazyComponents.NoMatch />
                </Route>

              </Switch>
            </Suspense>
          </ErrorCatcher>
        </Layout>
      </Router>
    </ThemeProvider>
  </Provider>
);
