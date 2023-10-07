import auth from '@react-native-firebase/auth';
import React from 'react';
import { showMessage } from 'react-native-flash-message';

import { useAuth } from '@/core';
import { useSoftKeyboardEffect } from '@/core/keyboard';
import { FocusAwareStatusBar } from '@/ui';

import type { LoginFormProps } from './login-form';
import { LoginForm } from './login-form';

export const Login = () => {
  const signIn = useAuth.use.signIn();
  useSoftKeyboardEffect();
  // const logout = () => {
  //   auth()
  //     .signOut()
  //     .then(() => console.log('User signed out!'));
  // };

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    console.log(data);
    auth()
      .createUserWithEmailAndPassword(
        'jane.doe@example.com',
        'SuperSecretPassword!'
      )
      .then(() => {
        console.log('User account created & signed in!');
        signIn({ access: 'access-token', refresh: 'refresh-token' });
        showMessage({
          message: 'Profile created successfully',
          type: 'success',
        });
      })
      .catch((error) => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};
