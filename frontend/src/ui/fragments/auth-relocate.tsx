import React from 'react';
import { Redirect } from 'react-router';
import { observer, inject } from 'mobx-react'

export const AuthRelocated = (WrappedComponent, relocateValue: boolean) => {
  const AuthenticatedComponent = (uprops) => {
    const authorizationStore = uprops.authorizationStore!;
    return (
      <>
        {authorizationStore.authorizationStatus === relocateValue ? <Redirect to="/" /> : <WrappedComponent {...uprops} />}
      </>
    )
  }
  const InjectedAuthComponent = inject('authorizationStore')(observer(AuthenticatedComponent));
  return InjectedAuthComponent;
}