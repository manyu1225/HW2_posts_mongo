const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    version: "1.0.0",
    title: "MY API",
    description: "",
  },
<<<<<<< .mine
  host: "intense-fortress-59028.herokuapp.com", //"localhost:3000"

=======
<<<<<<< HEAD
  host: "intense-fortress-59028.herokuapp.com", //intense-fortress-59028.herokuapp.com
>>>>>>> .theirs
=======
  host: "intense-fortress-59028.herokuapp.com", //"localhost:3000"
>>>>>>> remotes/origin/Branch_f_w6_JWT身份驗證機制
  basePath: "/", // by default: "/"
  schemes: ["https", "http"], //https
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [
    {
      name: "Users",
      description: "使用者 router",
    },
    {
      name: "Posts",
      description: "貼文 router",
    },
  ],
  securityDefinitions: {
    Bearer: {
      type: "apiKey",
      in: "header", // can be 'header', 'query' or 'cookie'
      name: "Authorization", // name of the header, query parameter or cookie
      description: "請加上 JWT TOKEN",
    },
  }, // by default: empty object
  definitions: {},
};
const outputFile = "./swagger_output.json";
const endpointsFiles = ["./app.js"];
swaggerAutogen(outputFile, endpointsFiles, doc);
