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

describe('Logging in modifies the database:', () => {
  const mockDisplayName = 'Tester';
  const mockPhotoURL = 'https://test.com/test.png';

  const mockFn = jest.fn();
  const oldDoc = mockFirestore.doc;

  beforeEach(() => {
    mockAuth.changeAuthState({
      uid: 'test-uid',
      displayName: mockDisplayName,
      photoURL: mockPhotoURL
    });
  });

  test('if snapshot does not exist set new displayName and photoURL', done => {
    mockFirestore.doc = path => {
      expect(path).toBe('users/test-uid');
      return {
        // userDoc
        async get() {
          return {
            // snapshot
            exists: false
          };
        },
        set({ displayName, photoURL }) {
          expect(displayName).toBe(mockDisplayName);
          expect(photoURL).toBe(mockPhotoURL);
          done();
        }
      };
    };

    act(() => {
      mockAuth.flush();
    });
  });

  test('if snapshot exists update displayName and photoURL', done => {
    mockFirestore.doc = path => {
      expect(path).toBe('users/test-uid');
      return {
        // userDoc
        async get() {
          return {
            // snapshot
            exists: true,
            data() {
              return {
                displayName: 'outdated name',
                photoURL: 'https://outdated.com/photo.png'
              };
            }
          };
        },
        set({ displayName, photoURL }) {
          expect(displayName).toBe(mockDisplayName);
          expect(photoURL).toBe(mockPhotoURL);
          done();
        }
      };
    };

    act(() => {
      mockAuth.flush();
    });
  });
}, 10000);
