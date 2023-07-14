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

  constructor() {
    this.userManager = new UserManager(credentials);
    this.authGateway = new AuthGateway(this.userManager);
    this.authRepository = new AuthRepository(this.authGateway);
    this.authPresenter = new AuthPresenter(this.authRepository);
    this.authController = new AuthController(this.authRepository);

    this.graphqlApolloGateway = new GraphQLApolloGateway();
    this.booksRepository = new BooksRepository(this.graphqlApolloGateway);
  }

  public getAuthController(): AuthController {
    return this.authController;
  }

  public getAuthPresenter(): AuthPresenter {
    return this.authPresenter;
  }
}

const compositionRoot = new CompositionRoot();

export default compositionRoot;
