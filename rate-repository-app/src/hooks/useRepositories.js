import { useQuery } from '@apollo/react-hooks';
import { useDebounce } from 'use-debounce';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = ({ order, searchKeyword, first }) => {
  const [value] = useDebounce(searchKeyword, 500);

  const parseOrder = (order) => {
    switch (order) {
      case 'latestRelated': {
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      }
      case 'highestRated': {
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' };
      }
      case 'lowestRated': {
        return { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' };
      }
      default: {
        return { orderBy: 'CREATED_AT', orderDirection: 'DESC' };
      }
    }
  };

  const variables = { ...parseOrder(order), searchKeyword: value, first };
  const { data, loading, fetchMore, ...result } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network',
  });

  const handleFetchMore = () => {
    const canFetchMore =
      !loading && data && data.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      query: GET_REPOSITORIES,
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...variables,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        const nextResult = {
          repositories: {
            ...fetchMoreResult.repositories,
            edges: [
              ...previousResult.repositories.edges,
              ...fetchMoreResult.repositories.edges,
            ],
          },
        };

        return nextResult;
      },
    });
  };

  return {
    repositories: data?.repositories,
    loading,
    fetchMore: handleFetchMore,
    ...result,
  };
};

export default useRepositories;
