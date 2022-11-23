import {
  createAdminSwagDoc,
  deleteSwaggerAdminDoc,
  getAdminStatsSwagerDoc,
  getAllAdminSwagDoc,
  getIdSwaggerAdminDoc,
  patchSwaggerAdminDoc,
} from "../swagger-route/swagger-admin.route.js";

const swaggerRouteConfig = {
  "/admin": {
    get: getAllAdminSwagDoc,
    post: createAdminSwagDoc,
  },
  "/admin/{id}": {
    patch: patchSwaggerAdminDoc,
    get: getIdSwaggerAdminDoc,
    delete: deleteSwaggerAdminDoc,
  },
  "/admin/statistic/admin": {
    get: getAdminStatsSwagerDoc,
  },
};

export default swaggerRouteConfig;
