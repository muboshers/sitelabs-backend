import swaggerRouteConfig from "./index.js";

const swaggerDoc = {
  openapi: "3.0.0",
  info: {
    title: "Sitelab Backend API",
    description: "Sitelabs backend api documentation for read Dovud",
    version: "1.0.0",
  },
  servers: [
    {
      url: "https://sitelabs-backend.herokuapp.com/api",
      description: "This is main server",
    },
  ],
  paths: {
    ...swaggerRouteConfig,
  },
};

export default swaggerDoc;
