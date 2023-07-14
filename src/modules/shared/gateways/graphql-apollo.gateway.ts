import {
  ApolloClient,
  DocumentNode,
  NormalizedCacheObject,
  Observer,
  OperationVariables,
} from "@apollo/client";
import { ApolloQueryResult } from "@apollo/client/core/types";

export class GraphQLApolloGateway {
  constructor(private apolloClient: ApolloClient<NormalizedCacheObject>) {}

  async query<T = any>(
    query: DocumentNode,
    variables?: OperationVariables
  ): Promise<ApolloQueryResult<T>> {
    return this.apolloClient.query<T>({
      query,
      variables,
      fetchPolicy: "cache-first",
    });
  }

  async mutate<T = any>(
    mutation: DocumentNode,
    variables?: OperationVariables
  ): Promise<T | null | undefined> {
    return this.apolloClient
      .mutate<T>({
        mutation,
        variables,
      })
      .then((result) => result.data);
  }

  watchedQuery<T = any>(
    { next, error }: Observer<ApolloQueryResult<T>>,
    query: DocumentNode,
    variables?: OperationVariables
  ) {
    return this.apolloClient
      .watchQuery<T>({
        query,
        variables,
        fetchPolicy: "cache-and-network",
      })
      .subscribe({
        next,
        error,
      });
  }
}
