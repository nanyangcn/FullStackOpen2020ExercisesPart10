import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import Text from './Text';
import FormikTextInput from './FormikTextInput';
import theme from '../theme';
import useCreateReview from '../hooks/useCreateReview';

const CreateReviewForm = ({ onSubmit }) => {
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
          name='ownerName'
          placeholder='Repository owner name'
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name='repositoryName'
          placeholder='Repository name'
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name='rating'
          placeholder='Rating between 0 and 100'
        />
      </View>
      <View style={styles.inputContainer}>
        <FormikTextInput
          style={styles.input}
          name='text'
          placeholder='Review'
          multiline
        />
      </View>
      <TouchableOpacity onPress={onSubmit}>
        <View style={styles.buttonContainer}>
          <Text color='textSecondary' fontWeight='bold'>
            Create a review
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const CreateReviewContainer = ({ onSubmit }) => {
  const initialValues = {
    repositoryName: '',
    ownerName: '',
    rating: '',
    text: '',
  };

  const validationSchema = yup.object().shape({
    repositoryName: yup.string().required('Repository name is required'),
    ownerName: yup.string().required('Repository owner name is required'),
    rating: yup
      .number()
      .required('Rating is required')
      .min(0, 'Rating must be 0-100')
      .max(100, 'Rating must be 0-100'),
    text: yup.string(),
  });

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

const CreateReview = () => {
  const [error, setError] = useState(null);
  const [createReview] = useCreateReview();
  const history = useHistory();

  const styles = StyleSheet.create({
    errorContainer: {
      margin: 15,
      height: 'auto',
      display: error ? '' : 'none',
    },
    errorText: {
      color: theme.colors.error,
    },
  });

  const onSubmit = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
    try {
      const response = await createReview({
        repositoryName,
        ownerName,
        rating,
        text,
      });
      history.push(`/${response.repositoryId}`);
    } catch (e) {
      setError(e.message);
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <View>
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error?.split(':')[1]}</Text>
      </View>
      <CreateReviewContainer onSubmit={onSubmit} />
    </View>
  );
};

export default CreateReview;
