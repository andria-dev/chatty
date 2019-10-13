import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

function withUser(Component) {
  return props => {
    const [user, loadingUser, errorLoadingUser] = useAuthState(auth);

    return (
      <Component
        user={user}
        loadingUser={loadingUser}
        errorLoadingUser={errorLoadingUser}
        {...props}
      />
    );
  };
}

export default withUser;
