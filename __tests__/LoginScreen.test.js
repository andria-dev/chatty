import { mockFirestore, mockAuth, mockSdk } from '../__mock__/firebase.mock';
import '@testing-library/jest-dom/extend-expect';

import React from 'react';
import {
  render,
  fireEvent,
  waitForElement,
  act
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
  act(() => {
    mockAuth.flush();
  });

  expect(mockFn).toBeCalled();
});

// test('New user data is entered upon initial login', done => {
//   mockAuth.changeAuthState({
//     uid: 'test-uid',
//     displayName: 'test',
//     photoURL: 'test-url.com'
//   });

//   act(() => {
//     mockAuth.flush();
//   });

//   act(() => {
//     mockFirestore.flush();
//   });

//   console.log(
//     mockFirestore
//       .doc('users/test-uid')
//       .get()
//       .then(x => {
//         console.log(x.data());
//         done();
//       })
//   );
// });
