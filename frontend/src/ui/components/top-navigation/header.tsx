import React, { memo } from 'react';
import { Header } from 'ui/styles/top-navigation/header-styles';
import { NavigationBar } from './navigation-bar';
import { UserProfile } from './user-profile';

export const PageHeader = memo(() => (
  <Header>
    <NavigationBar />
    <UserProfile />
  </Header>
))