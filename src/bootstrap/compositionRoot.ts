import { UserManager } from "oidc-client-ts";
import {
  AuthController,
  AuthGateway,
  AuthPresenter,
  AuthRepository,
} from "../modules/authentication";
import { credentials } from "./authCredentials";

export class CompositionRoot {
  private authController: AuthController;
  private authRepository: AuthRepository;
  private authGateway: AuthGateway;
  private authPresenter: AuthPresenter;

  private userManager: UserManager;

  constructor() {
    this.userManager = new UserManager(credentials);
    this.authGateway = new AuthGateway(this.userManager);
    this.authRepository = new AuthRepository(this.authGateway);
    this.authPresenter = new AuthPresenter(this.authRepository);
    this.authController = new AuthController(this.authRepository);
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
