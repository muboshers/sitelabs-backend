export const getAllAdminSwagDoc = {
  tags: ["Get All Admin"],
  description: "Get all admin list",

  responses: {
    200: {
      description: "Succesfully get all admin list",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              admin: [
                {
                  _id: "631826516cc9e3d35efee79e",
                  name: "Mubosher Muydinov",
                  email: "muboshermuydinov5@gmail.com",
                  createdAt: "2022-09-07T05:03:40.231Z",
                  updatedAt: "2022-09-07T05:03:40.231Z",
                  __v: 0,
                },
              ],
            },
          },
        },
      },
    },
    500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: {
            type: "String",
            example: {
              massage: "Something is wrong",
            },
          },
        },
      },
    },
  },
};

export const createAdminSwagDoc = {
  tags: ["Admin"],
  description: "Admin Create",

  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of admin",
              example: "Admin",
            },
            email: {
              type: "string",
              description: "Email address",
              example: "admin@example.com",
            },
            password: {
              type: "string",
              description: "password for new admin ",
              example: "exampleadminpassword",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Succesfully crated admin",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              _id: "631826516cc9e3d35efee79e",
              name: "Mubosher Muydinov",
              email: "muboshermuydinov5@gmail.com",
              createdAt: "2022-09-07T05:03:40.231Z",
              updatedAt: "2022-09-07T05:03:40.231Z",
              __v: 0,
            },
          },
        },
      },
    },
    500: {
      description: "No Bro 😉😉",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              message: "External error",
            },
          },
        },
      },
    },
  },
};

export const patchSwaggerAdminDoc = {
  tags: ["Admin"],
  description: "Admin Update",
  summary: "Admin Update",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "id of admin",
      type: "string",
      example: "631826516cc9e3d35efee79e",
    },
  ],
  requestBody: {
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Name of admin",
              example: "Admin",
            },
            email: {
              type: "string",
              description: "Email address",
              example: "admin@example.com",
            },
            password: {
              type: "string",
              description: "password for new admin ",
              example: "exampleadminpassword",
            },
          },
        },
      },
    },
  },
  responses: {
    200: {
      description: "Succesfully crated admin",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              message: "Admin muvaqqiyatli yangilandi",
            },
          },
        },
      },
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: {
            type: "string",
            example: "Bu id bo'yicha admin mavjud emas",
          },
        },
      },
    },
    500: {
      description: "No Dovud 😉😉",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              message: "External error",
            },
          },
        },
      },
    },
  },
};

export const getIdSwaggerAdminDoc = {
  tags: ["Admin"],
  description: "Admin Update",
  summary: "Admin Update",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "id of admin",
      type: "string",
      example: "631826516cc9e3d35efee79e",
    },
  ],

  responses: {
    200: {
      description: "Succesfully crated admin",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              _id: "631826516cc9e3d35efee79e",
              name: "Admin",
              email: "developerbobosh@gmail.com",
              createdAt: "2022-09-07T05:03:40.231Z",
              updatedAt: "2022-10-13T11:21:47.722Z",
              __v: 0,
            },
          },
        },
      },
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: {
            type: "string",
            example: "Bu id bo'yicha admin mavjud emas",
          },
        },
      },
    },
    500: {
      description: "No Dovud 😉😉",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              message: "External error",
            },
          },
        },
      },
    },
  },
};

export const deleteSwaggerAdminDoc = {
  tags: ["Admin"],
  description: "Admin Delete",
  summary: "Admin Update",
  parameters: [
    {
      name: "id",
      in: "path",
      description: "id of admin",
      type: "string",
      example: "631826516cc9e3d35efee79e",
    },
  ],
  responses: {
    200: {
      description: "Succesfully crated admin",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              message: "Admin muvaqqiyatli o'chirildi",
            },
          },
        },
      },
    },
    404: {
      description: "Not Found",
      content: {
        "application/json": {
          schema: {
            type: "string",
            example: "Bu id bo'yicha admin mavjud emas",
          },
        },
      },
    },
    500: {
      description: "No Dovud 😉😉",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              message: "External error",
            },
          },
        },
      },
    },
  },
};

export const getAdminStatsSwagerDoc = {
  tags: ["Get All Admin Stats"],
  description: "Get all admin list",
  responses: {
    200: {
      description: "Succesfully get all admin list",
      content: {
        "application/json": {
          schema: {
            type: "object",
            example: {
              data: [
                {
                  _id: 9,
                  total: 1,
                },
              ],
            },
          },
        },
      },
    },
    500: {
      description: "Bad request",
      content: {
        "application/json": {
          schema: {
            type: "String",
            example: {
              massage: "Something is wrong",
            },
          },
        },
      },
    },
  },
};
