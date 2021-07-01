if (process.env.NODE_ENV === "production") {
  module.exports = require("./esm/react-pixi-fiber.production.min.js");
} else {
  module.exports = require("./esm/react-pixi-fiber.development.js");
}
