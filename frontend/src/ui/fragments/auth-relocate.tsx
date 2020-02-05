import React, { ComponentClass, FunctionComponent } from 'react';
import { Redirect } from 'react-router';
import { observer, inject } from 'mobx-react'

/**
 * Auto relocate to main page insted of given component if relocateValue matches to auth status
 * @param WrappedComponent React/Functional Component which connected with authorization status
 * @param relocateValue Value when we should relocate to main page insted of given component
 */
export const AuthRelocated = (WrappedComponent: ComponentClass | FunctionComponent, relocateValue: boolean) => {
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