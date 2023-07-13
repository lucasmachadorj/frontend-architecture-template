import { BaseIOC } from "./base.ioc";

const baseIOC = new BaseIOC();
baseIOC.buildBaseTemplate();
const container = baseIOC.getContainer();


export { container };
