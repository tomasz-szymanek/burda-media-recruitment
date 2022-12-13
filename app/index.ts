import { container } from "./inversify.config";
import { CONFIGURATION_TYPES } from "./types";
import { Config } from "./types/interfaces";
import express from "express";
import bodyParser from "body-parser";
import { OptimalShoppingListController } from "./OptimalShoppingList/OptimalShoppingList.controller";
import "reflect-metadata";
import { validator } from "./OptimalShoppingList/validation/validator";
import { serve, setup } from "swagger-ui-express";
import fs from "fs";

const config = container.get<Config>(CONFIGURATION_TYPES.Config);

const app = express();

app.use(bodyParser.json());

const port = config.port;

const handler = container.resolve<OptimalShoppingListController>(
  OptimalShoppingListController
).getOptimalShoppingList;

app.post("/get-optimal-shopping-list", [validator], handler);

const swaggerDocument = JSON.parse(fs.readFileSync("./swagger.json", "utf8"));

app.use("/documentation", serve, setup(swaggerDocument));

app.listen(config.port, () => {
  console.log(`App running at ${port}`);
  console.log(`Api docs: localhost:${port}`);
});
