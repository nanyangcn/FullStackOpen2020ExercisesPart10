import { gql } from 'apollo-boost';

export const REPOSITORY_NODE_DETAILS = gql`
  fragment RepositoryNodeDetails on Repository {
    id
    url
    ownerName
    name
    createdAt
    fullName
    ratingAverage
    reviewCount
    stargazersCount
    forksCount
    ownerAvatarUrl
    description
    language
  }
`;

export const PAGE_INFO = gql`
  fragment PageInfo on PageInfo {
    totalCount
    hasNextPage
    endCursor
    startCursor
  }
`;
