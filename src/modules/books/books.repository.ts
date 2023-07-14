import { ApolloQueryResult, Observer } from "@apollo/client";
import { GraphQLApolloGateway } from "../shared/gateways/graphql-apollo.gateway";
import { QUERY_BOOKS } from "./books.queries";

export type BooksDTO = {
  books: [{ id: string; title: string; author: string }];
};

export class BooksRepository {
  constructor(private graphqlApolloGateway: GraphQLApolloGateway) {}

  async getBooks(): Promise<BooksDTO["books"]> {
    const { data } = await this.graphqlApolloGateway.query<BooksDTO>(
      QUERY_BOOKS
    );

    return data.books;
  }

  watchBooks({ next, error }: Observer<ApolloQueryResult<BooksDTO>>) {
    this.graphqlApolloGateway.watchedQuery<BooksDTO>(
      { next, error },
      QUERY_BOOKS
    );
  }
}
