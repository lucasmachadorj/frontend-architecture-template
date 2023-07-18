import { UserManager } from "oidc-client-ts";
import {
  AuthController,
  AuthGateway,
  AuthPresenter,
  AuthRepository,
} from "../modules/authentication";
import { credentials } from "./authCredentials";
import {
  BooksController,
  BooksPresenter,
  BooksRepository,
} from "../modules/books";
import { GraphQLApolloGateway } from "../modules/shared/gateways/graphql-apollo.gateway";
import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";

export class CompositionRoot {
  private authController: AuthController;
  private authRepository: AuthRepository;
  private authGateway: AuthGateway;
  private authPresenter: AuthPresenter;
  private userManager: UserManager;

  private booksController: BooksController;
  private booksRepository: BooksRepository;
  private booksPresenter: BooksPresenter;

  private graphqlApolloGateway: GraphQLApolloGateway;

  private apolloClient: ApolloClient<NormalizedCacheObject>;

  constructor() {
    this.userManager = new UserManager(credentials);
    this.authGateway = new AuthGateway(this.userManager);
    this.authRepository = new AuthRepository(this.authGateway);
    this.authPresenter = new AuthPresenter(this.authRepository);
    this.authController = new AuthController(this.authRepository);

    this.apolloClient = new ApolloClient({
      uri: "http://localhost:4000",
      cache: new InMemoryCache(),
    });

    this.graphqlApolloGateway = new GraphQLApolloGateway(this.apolloClient);
    this.booksRepository = new BooksRepository(this.graphqlApolloGateway);
    this.booksPresenter = new BooksPresenter(this.booksRepository);
    this.booksController = new BooksController(this.booksRepository);
  }

  public getAuthHandlers() {
    return {
      controller: this.authController,
      presenter: this.authPresenter,
    };
  }

  public getBooksHandlers(): {
    controller: BooksController;
    presenter: BooksPresenter;
  } {
    return {
      controller: this.booksController,
      presenter: this.booksPresenter,
    };
  }
}

const compositionRoot = new CompositionRoot();

export default compositionRoot;
