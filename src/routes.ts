import { RouteObject, redirect } from "react-router-dom";
import { AuthController, AuthPresenter } from "./modules/authentication";
import compositionRoot from "./bootstrap/compositionRoot";
import { HomePage } from "./pages";

class RoutesMapper {
  constructor(
    private authController: AuthController,
    private authPresenter: AuthPresenter
  ) {}

  private async protectedRouteHandler(path: string) {
    const isLoggedIn = await this.authPresenter.isLoggedIn();
    if (!isLoggedIn) {
      await this.authController.login();
      return;
    }

    return redirect(path);
  }

  getRoutes(): RouteObject[] {
    return [
      {
        path: "/",
        Component: HomePage,
        loader: async () => {
          await this.protectedRouteHandler("/home");
          return null;
        },
      },
      {
        path: "/home",
        Component: HomePage,
        loader: async () => {
          await this.protectedRouteHandler("/home");
          return null;
        },
      },
      {
        path: "/signed-in",
        loader: async () => {
          try {
            this.authController.requestTokens();
          } finally {
            return redirect("/");
          }
        },
      },
      {
        path: "/signed-out",
        loader: async () => {
          try {
            this.authController.removeTokens();
          } finally {
            return redirect("/");
          }
        },
      },
    ];
  }
}

const routesMapper = new RoutesMapper(
  compositionRoot.getAuthController(),
  compositionRoot.getAuthPresenter()
);

export default routesMapper;
