import React from 'react';
import { SignIn } from 'ui/components/authorization/sign-in';
import { SignUp } from 'ui/components/authorization/sign-up';


// here should be auto re-direct for main page if user authorized or message that user is authorized

export const AuthorizationPageContainer = () => (
  <>
    <h1>AuthorizationPageContainer</h1>
    <SignIn />
    {/* 
      TODO: all of these view's should be wrapped into modal
    */}
    <SignUp />
  </>
)