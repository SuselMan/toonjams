import React from 'react';
import { Navigation, NavigationList, NavigationItem } from 'ui/styles/top-navigation/topbar-styles';
import { Link } from 'react-router-dom';

export const NavigationBar = () => (
  <Navigation>
    <NavigationList>

      <NavigationItem>
        <Link to="/">ToonJams</Link>
      </NavigationItem>

      <NavigationItem>
        <Link to="/events">Events</Link>
      </NavigationItem>

      <NavigationItem>
        <Link to="/users">Users</Link>
      </NavigationItem>

    </NavigationList>
  </Navigation>
);
