import {
  ApolloCache,
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

  async mutate<M extends object, Q extends object>(
    mutation: DocumentNode,
    variables?: OperationVariables,
    updateCache?: {
      query: DocumentNode;
      fieldName: keyof Q;
    }
  ): Promise<void> {
    this.apolloClient
      .mutate<M>({
        mutation,
        variables,
        update: (cache: ApolloCache<any>, { data }: any) => {
          if (!updateCache) return;
          const currentData = cache.readQuery<Q>({ query: updateCache.query });
          let updatedData: Record<string, any>;

          const dataToBeCached = Object.values(data)[0];

          if (!currentData) {
            updatedData = {
              [updateCache.fieldName]: [dataToBeCached],
            };
            cache.writeQuery({ query: updateCache.query, data: updatedData });
            return;
          }

          updatedData = {
            [updateCache.fieldName]: [
              ...currentData[updateCache.fieldName],
              dataToBeCached,
            ],
          };
          cache.writeQuery({ query: updateCache.query, data: updatedData });
        },
      })
      .catch((error) => {
        console.error(error);
      });
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
