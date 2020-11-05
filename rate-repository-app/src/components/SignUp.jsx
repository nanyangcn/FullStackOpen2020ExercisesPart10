import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useSignUp from '../hooks/useSignUp';

const SignUpForm = ({ onSubmit }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      padding: 15,
    },
    inputContainer: {
      marginBottom: 15,
    },
    input: {
      borderColor: theme.colors.textPrimary,
      borderWidth: 1,
      borderRadius: 3,
      height: 50,
      paddingVertical: 15,
      paddingHorizontal: 10,
    },
    buttonContainer: {
      backgroundColor: theme.colors.secondary,
      alignItems: 'center',
      flexGrow: 1,
      padding: 17,
      borderRadius: 3,
      height: 50,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name='username'
          placeholder='Username'
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name='password'
          placeholder='Password'
          secureTextEntry
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name='passwordConfirmation'
          placeholder='Password confirmation'
          secureTextEntry
        />
      </View>
      <TouchableOpacity onPress={onSubmit}>
        <View style={styles.buttonContainer}>
          <Text color='textSecondary' fontWeight='bold'>
            Sign Up
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const SignUpContainer = ({ onSubmit }) => {
  const initialValues = {
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required('Username is required')
      .min(1, 'Length must be 1-30')
      .max(30, 'Length must be 1-30'),
    password: yup
      .string()
      .required('Password is required')
      .min(5, 'Length must be 5-50')
      .max(50, 'Length must be 5-50'),
    passwordConfirmation: yup
      .string()
      .required('Password confirmation is required')
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .min(5, 'Length must be 5-50')
      .max(50, 'Length must be 5-50'),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const SignUp = () => {
  const [signUp] = useSignUp();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      await signUp({ username, password });
      history.push(`/login`);
    } catch (e) {
      console.log(e.message);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
