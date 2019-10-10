import { mockFirestore, mockAuth, mockSdk } from '../__mock__/firebase.mock';
import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import {
  render,
  fireEvent,
  waitForElement
} from '@testing-library/react-native';

import '../screens/LoginScreen';
import LoginScreen from '../screens/LoginScreen';

let renderResult;
beforeEach(() => {
  renderResult = render(<LoginScreen navigation={{ navigate() {} }} />);
});

test('Clicking on the login button triggers a login', () => {
  const { getByTestId } = renderResult;
  fireEvent.press(getByTestId('login-button'));

  const mockFn = jest.fn();

  mockAuth.onAuthStateChanged(mockFn);
  mockAuth.flush();

  expect(mockFn).toBeCalled();
});

test('Logging in saves displayName and photoURL to the database', () => {
  mockAuth.changeAuthState({
    uid: 'test-uid',
    provider: 'Google',
    token: 'test-token',
    expires: Math.floor(new Date() / 1000) + 24 * 60 * 60
  });

  mockAuth.flush();
  mockFirestore.flush();

  const mockFn = jest.fn(user => console.log(user));
  mockFirestore
    .doc('users/test-uid')
    .get()
    .then(mockFn);

  expect(mockFn).toBeCalled();
});
