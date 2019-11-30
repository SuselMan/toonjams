import React, { memo } from 'react';
import { Header } from 'ui/styles/top-navigation/header-styles';
import { TopBar } from './topbar';
import { UserProfile } from './user-profile';

export const PageHeader = memo(() => (
  <Header>
    <TopBar />
    <UserProfile />
  </Header>
))