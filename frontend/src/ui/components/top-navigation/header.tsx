import React, { memo } from 'react';
import { Header, HeaderLeftPart, HeaderRightPart, HeaderLogo } from 'ui/styles/top-navigation/header-styles';
import { NavigationBar } from './navigation-bar';
import { UserProfile } from './user-profile';

import Logo from 'res/logo.png'

export const PageHeader = memo(() => (
  <Header>
    <HeaderLeftPart>
      <HeaderLogo src={Logo} />
    </HeaderLeftPart>
    <HeaderRightPart>
      <NavigationBar />
      <UserProfile />
    </HeaderRightPart>
  </Header>
))