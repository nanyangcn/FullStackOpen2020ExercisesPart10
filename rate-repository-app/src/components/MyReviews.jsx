import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { format } from 'date-fns';
import { useHistory } from 'react-router-native';

import Text from './Text';
import theme from '../theme';
import useMyReviews from '../hooks/useMyReviews';
import useDeleteReview from '../hooks/useDeleteReview';

const Buttons = ({ review, refetch }) => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();

  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },
    containerViewButton: {
      backgroundColor: theme.colors.secondary,
      alignItems: 'center',
      flexGrow: 1,
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 25,
      marginBottom: 20,
    },
    containerDeleteButton: {
      backgroundColor: theme.colors.error,
      alignItems: 'center',
      flexGrow: 1,
      borderRadius: 5,
      padding: 15,
      paddingHorizontal: 25,
      marginBottom: 20,
    },
  });

  const handleDeleteReview = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReview({ id: review.id });
              setTimeout(() => {
                refetch();
              }, 0);
            } catch (err) {
              console.log(err.message);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => history.push(`/${review.repository.id}`)}
      >
        <View style={styles.containerViewButton}>
          <Text color='textSecondary' fontWeight='bold'>
            View repository
          </Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteReview}>
        <View style={styles.containerDeleteButton}>
          <Text color='textSecondary' fontWeight='bold'>
            Delete review
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const ReviewItem = ({ review, refetch }) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
    },
    containerHeader: {
      flexDirection: 'row',
    },
    containerRating: {
      borderColor: theme.colors.secondary,
      borderWidth: 2,
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
      margin: 15,
      padding: 11,
      alignItems: 'center',
    },
    containerBody: {
      width: '75%',
      margin: 15,
      marginLeft: 0,
    },
    containerTitle: {
      marginVertical: 5,
    },
    textRating: {
      color: theme.colors.secondary,
      fontSize: theme.fontSizes.subheading,
      fontFamily: theme.fonts.main,
      fontWeight: theme.fontWeights.bold,
    },
    textName: {
      color: 'black',
      fontSize: theme.fontSizes.subheading,
      fontFamily: theme.fonts.main,
      fontWeight: theme.fontWeights.bold,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <View style={styles.containerRating}>
          <Text style={styles.textRating}>{review.rating}</Text>
        </View>
        <View style={styles.containerBody}>
          <View style={styles.containerTitle}>
            <Text style={styles.textName}>{review.repository.fullName}</Text>
            <Text>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          </View>
          <Text color='primary'>{review.text}</Text>
        </View>
      </View>
      <Buttons review={review} refetch={refetch} />
    </View>
  );
};

const MyReviews = () => {
  const { authorizedUser, fetchMore, refetch } = useMyReviews({ first: 3 });

  if (!authorizedUser) return null;

  const styles = StyleSheet.create({
    separator: {
      height: 10,
    },
    containerDeleteButton: {
      backgroundColor: theme.colors.error,
      borderRadius: 5,
      padding: 15,
    },
  });

  const reviews = authorizedUser.reviews.edges
    ? authorizedUser.reviews.edges.map((edge) => edge.node)
    : [];

  const onEndReach = () => {
    fetchMore();
  };

  return (
    <FlatList
      data={reviews}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => <ReviewItem review={item} refetch={refetch} />}
      keyExtractor={(item) => item.repository.id}
      onEndReached={onEndReach}
    />
  );
};

export default MyReviews;
