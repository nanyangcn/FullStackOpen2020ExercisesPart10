import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createApolloClient = (authStorage) => {
  const apiUrl = Constants.manifest.extra.apolloUri;
  return new ApolloClient({
    request: async (operation) => {
      try {
        const accessToken = await authStorage.getAccessToken();
        operation.setContext({
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : '',
          },
        });
      } catch (e) {
        console.log(e);
      }
    },
    uri: `${apiUrl}/graphql`,
  });
};

export default createApolloClient;
