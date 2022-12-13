import { Container } from "inversify";
import { CONFIGURATION_TYPES } from "./types";
import { CalculateOptimalShoppingList } from "./OptimalShoppingList/CalculateOptimalShoppingList.service";
import { Config } from "./types/interfaces";
import { HttpConfig } from "./http.config";
import "reflect-metadata";

const container = new Container();

container
  .bind<CalculateOptimalShoppingList>(CalculateOptimalShoppingList)
  .toSelf();

container.bind<Config>(CONFIGURATION_TYPES.Config).toConstantValue(HttpConfig);

export { container };
