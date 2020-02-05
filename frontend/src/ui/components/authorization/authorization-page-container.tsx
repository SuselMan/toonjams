import React, { useState } from 'react';
import { SignIn } from 'ui/components/authorization/sign-in';
import { SignUp } from 'ui/components/authorization/sign-up';
import { AuthRelocated } from 'ui/fragments/auth-relocate';
import { Button } from 'ui/styles/fragments/button';

enum AUTH_PAGE {
  login = 'login',
  register = 'regsiter'
}

const AuthorizationPageContainer = () => {
  const [currentPage, setCurrentPage] = useState<string>(AUTH_PAGE.login);
  return (
    <>
      <h1>Authorization page container</h1>
      <Button onClick={() => setCurrentPage(AUTH_PAGE.login)}>
        Set Login
      </Button>
      <Button onClick={() => setCurrentPage(AUTH_PAGE.register)}>
        Set Register
      </Button>
      {currentPage === AUTH_PAGE.login ? <SignIn /> : <SignUp />}
    </>
  )
}

export const AuthorizationPageWrapped = AuthRelocated(AuthorizationPageContainer, true);



