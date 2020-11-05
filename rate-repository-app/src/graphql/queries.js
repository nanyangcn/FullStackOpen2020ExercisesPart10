import { gql } from 'apollo-boost';

import { REPOSITORY_NODE_DETAILS, PAGE_INFO } from './fragments';

export const GET_REPOSITORIES = gql`
  query getRepositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $first: Int
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      first: $first
      after: $after
    ) {
      pageInfo {
        ...PageInfo
      }
      edges {
        node {
          ...RepositoryNodeDetails
        }
        cursor
      }
    }
  }
  ${PAGE_INFO}
  ${REPOSITORY_NODE_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query getRepository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      ...RepositoryNodeDetails
      reviews(first: $first, after: $after) {
        pageInfo {
          ...PageInfo
        }
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${PAGE_INFO}
  ${REPOSITORY_NODE_DETAILS}
`;

export const GET_AUTHORIZED_USER = gql`
  query getAuthorizedUser {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_MY_REVIEWS = gql`
  query getMyReviews($first: Int, $after: String) {
    authorizedUser {
      id
      username
      reviews(first: $first, after: $after) {
        pageInfo {
          ...PageInfo
        }
        edges {
          node {
            id
            rating
            text
            createdAt
            repositoryId
            repository {
              id
              fullName
            }
          }
        }
      }
    }
  }
  ${PAGE_INFO}
`;
