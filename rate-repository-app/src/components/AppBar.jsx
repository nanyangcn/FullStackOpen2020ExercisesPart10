import React, { useContext } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Link, useHistory } from 'react-router-native';
import { useQuery, useApolloClient } from '@apollo/react-hooks';

import Text from './Text';
import theme from '../theme';
import { GET_AUTHORIZED_USER } from '../graphql/queries';
import AuthStorageContext from '../contexts/AuthStorageContext';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
  },
  tabItem: {
    flexGrow: 0,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
});

const AppBarTab = ({ link, buttonText }) => {
  return (
    <Link to={link} component={TouchableOpacity}>
      <View style={styles.tabItem}>
        <Text color='textSecondary' fontWeight='bold'>
          {buttonText}
        </Text>
      </View>
    </Link>
  );
};

const SignOutTab = () => {
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const history = useHistory();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/login');
  };

  return (
    <TouchableOpacity onPress={handleSignOut}>
      <View style={styles.tabItem}>
        <Text color='textSecondary' fontWeight='bold'>
          Sign out
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const AppBar = () => {
  const { data } = useQuery(GET_AUTHORIZED_USER);

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab link='/' buttonText='Repositories' />
        {!data?.authorizedUser && (
          <AppBarTab link='/login' buttonText='Sign in' />
        )}
        {!data?.authorizedUser && (
          <AppBarTab link='/sign-up' buttonText='Sign up' />
        )}
        {data?.authorizedUser && (
          <AppBarTab link='/create-review' buttonText='Create a review' />
        )}
        {data?.authorizedUser && (
          <AppBarTab link='/my-reviews' buttonText='My reviews' />
        )}
        {data?.authorizedUser && <SignOutTab />}
      </ScrollView>
    </View>
  );
};

export default AppBar;
