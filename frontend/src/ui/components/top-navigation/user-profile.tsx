/**
 * This component just only for test now to try Mobx
 */


import React from 'react';
import { observable } from 'mobx'
import { observer, inject } from 'mobx-react'
import { UserProfileContainer } from 'ui/styles/top-navigation/user-profile-styles';
import { IAuthStore } from 'stores/authorization-store';

interface UserProfileProps {
  authorizationStore?: IAuthStore;
}

// TODO: find why component rerender 2 times after props changed.
const UserProfileComponent = (UserProfileProps) => {
  console.log('auth store: ', UserProfileProps);
  const data: IAuthStore = UserProfileProps.authorizationStore!;
  return (
    <>
      <h1>{data.authorizationStatus === true ? 'authorized' : 'nonauthorized'}</h1>
      <button onClick={data.authorizeUser}>authorize</button>
      <button onClick={data.logoutUser}>logout</button>
    </>
  )
};

export const UserProfile = inject('authorizationStore')(observer(UserProfileComponent));