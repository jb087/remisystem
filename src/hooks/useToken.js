import { useContext, useCallback } from 'react';
import { UserContext } from '../providers/UserProvider';

export default function useToken() {
  const {
    user: { userAuth },
  } = useContext(UserContext);
  const getIdToken = useCallback(() => userAuth.getIdToken(), [userAuth]);

  return getIdToken;
}
