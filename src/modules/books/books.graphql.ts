import { gql } from "@apollo/client";

export const QUERY_BOOKS = gql`
  query {
    books {
      id
      title
      author
    }
  }
`;

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!) {
    addBook(title: $title, author: $author) {
      id
      title
      author
    }
  }
`;
