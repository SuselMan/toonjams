import React, { useReducer } from 'react';
import { observer, inject } from 'mobx-react'
import { Form } from 'ui/styles/fragments/form';
import { Button } from 'ui/styles/fragments/button';
import { checkLoginAvailable } from 'helpers/sign-in';

type SignInState = {
  login: string;
  password: string;
}


export const SignInComponent = (uprops?) => {

  const [inputValues, setInputValues] = useReducer(
    (state, newState): SignInState => ({ ...state, ...newState }),
    {
      login: "",
      password: ""
    }
  );

  const handleInputChange = (name, value) => {
    console.log(`handled ${name} with value ${value}`)
    setInputValues({ [name]: value });
  }

  return (
    <>
      <h1>Sign In</h1>
      <Form onSubmit={(e) => {
        e.preventDefault();
        console.log('form submit');
      }}>
        <input
          type="text"
          name="login"
          value={inputValues.login}
          onChange={e => {
            handleInputChange(e.target.name, e.target.value);
            checkLoginAvailable(e.target.value)
          }}
          placeholder="login"
        />
        <input
          type="text"
          name="password"
          value={inputValues.password}
          onChange={e => handleInputChange(e.target.name, e.target.value)}
          placeholder="password"
        />
        <Button type="submit">
          submit
        </Button>
      </Form>
    </>
  )
}

export const SignIn = inject('authorizationStore')(observer(SignInComponent));