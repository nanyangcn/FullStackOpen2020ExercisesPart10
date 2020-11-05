import { useMutation } from '@apollo/react-hooks';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const response = await mutate({
      variables: { repositoryName, ownerName, rating: Number(rating), text },
    });

    return response.data.createReview;
  };

  return [createReview, result];
};

export default useCreateReview;
