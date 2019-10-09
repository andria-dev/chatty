import firebase from 'firebase-mock';

export const mockAuth = new firebase.MockAuthentication();
export const mockFirestore = new firebase.MockFirestore();
export const mockMessaging = new firebase.MockMessaging();

export const mockSdk = new firebase.MockFirebaseSdk(
  null,
  () => mockAuth,
  () => mockFirestore,
  null,
  () => mockMessaging
);

mockSdk.apps = { length: 0 };

jest.mock('firebase', () => mockSdk);
jest.mock('firebase/firestore', () => mockFirestore);
jest.mock('firebase/auth', () => mockAuth);
