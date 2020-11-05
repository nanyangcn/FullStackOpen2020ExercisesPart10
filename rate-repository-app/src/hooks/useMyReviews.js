import { useQuery } from '@apollo/react-hooks';
import { useCallback } from 'react';

import { GET_MY_REVIEWS } from '../graphql/queries';

const useMyReviews = ({ first }) => {
  const variables = { first };

  const { data, loading, fetchMore, refetch: _refetch, ...result } = useQuery(
    GET_MY_REVIEWS,
    {
      variables,
      fetchPolicy: 'cache-and-network',
    }
  );

  const refetch = useCallback(() => {
    setTimeout(() => _refetch(), 0);
  }, [_refetch]);

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.authorizedUser.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_MY_REVIEWS,
      variables: {
        after: data.authorizedUser.reviews.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          authorizedUser: {
            ...fetchMoreResult.authorizedUser,
            reviews: {
              ...fetchMoreResult.authorizedUser.reviews,
              edges: [
                ...previousResult.authorizedUser.reviews.edges,
                ...fetchMoreResult.authorizedUser.reviews.edges,
              ],
            },
          },
        };

        return nextResult;
      },
    });
  };

  return {
    authorizedUser: data?.authorizedUser,
    loading,
    fetchMore: handleFetchMore,
    refetch,
    ...result,
  };
};

export default useMyReviews;
