import React from 'react';
import Constants from 'expo-constants';
import { StyleSheet, View } from 'react-native';
import { Route, Switch, Redirect } from 'react-router-native';

import RepositoryList from './RepositoryList';
import SingleRepository from './SingleRepository';
import AppBar from './AppBar';
import SignIn from './SignIn';
import SignUp from './SignUp';
import CreateReview from './CreateReview';
import MyReviews from './MyReviews';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.main,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar />
      <Switch>
        <Route path='/login' exact>
          <SignIn />
        </Route>
        <Route path='/sign-up' exact>
          <SignUp />
        </Route>
        <Route path='/create-review' exact>
          <CreateReview />
        </Route>
        <Route path='/my-reviews' exact>
          <MyReviews />
        </Route>
        <Route path='/:id' exact>
          <SingleRepository />
        </Route>
        <Route path='/' exact>
          <RepositoryList />
        </Route>
        <Redirect to='/' />
      </Switch>
    </View>
  );
};

export default Main;
