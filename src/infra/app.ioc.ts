import { RouterGateway } from "../routing/router.gateway";
import { Types } from "../shared/providers/identifiers";
import { BaseIOC } from "./base.ioc";

const baseIOC = new BaseIOC();
baseIOC.buildBaseTemplate();
const container = baseIOC.getContainer();

container.bind(Types.RouterGateway).to(RouterGateway).inSingletonScope();

export { container };
