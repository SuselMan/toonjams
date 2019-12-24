import React, { useState } from 'react';
import { SignIn } from 'ui/components/authorization/sign-in';
import { SignUp } from 'ui/components/authorization/sign-up';
import { Redirect } from 'react-router';
import { AuthRelocated } from 'ui/fragments/auth-relocate';

enum AUTH_PAGE {
  login = 'login',
  register = 'regsiter'
}

const AuthorizationPageContainer = () => {
  return (
    <h1>AUTHORIZATION PAGE CONTAINER</h1>
  )
}

export const AuthorizationPageWrapped = AuthRelocated(AuthorizationPageContainer, true);



