import { Container } from "inversify";

export class BaseIOC {
  private container: Container;

  constructor() {
    this.container = new Container({
      defaultScope: "Transient",
      autoBindInjectable: true,
    });
  }

  buildBaseTemplate(): void {

  }

  getContainer(): Container {
    return this.container;
  }
}
