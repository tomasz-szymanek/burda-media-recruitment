const swaggerJsdoc = require("swagger-jsdoc");
const fs = require("fs");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hello World",
    },
  },
  apis: ["./app/**/*.ts"], // files containing annotations as above
  swaggerDefinition: {
    swagger: "2.0",
  },
};

const openapiSpecification = swaggerJsdoc(options);
fs.writeFileSync("swagger.json", JSON.stringify(openapiSpecification));
