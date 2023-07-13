import { Container } from "inversify";
import { RouterRepository } from "../routing/router.repository";
import { Types } from "../shared/providers/identifiers";
import { AppController } from "../app.controller";

export class BaseIOC {
  private container: Container;

  constructor() {
    this.container = new Container({
      defaultScope: "Transient",
      autoBindInjectable: true,
    });
  }

  buildBaseTemplate(): void {
    this.container
      .bind(Types.RouterRepository)
      .to(RouterRepository)
      .inSingletonScope();

    this.container
      .bind(Types.AppController)
      .to(AppController)
      .inSingletonScope();
  }

  getContainer(): Container {
    return this.container;
  }
}
