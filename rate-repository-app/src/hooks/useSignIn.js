import { useContext } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { useApolloClient } from '@apollo/react-hooks';

import { LOGIN } from '../graphql/mutations';
import AuthStorageContext from '../contexts/AuthStorageContext';

const useSignIn = () => {
  const [mutate, result] = useMutation(LOGIN);
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    const response = await mutate({ variables: { username, password } });
    await authStorage.setAccessToken(response.data.authorize.accessToken);
    apolloClient.resetStore();

    return response;
  };

  return [signIn, result];
};

export default useSignIn;
