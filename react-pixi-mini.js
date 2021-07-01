/*
 * @Author: Lemon
 * @Date: 2021-06-30 20:34:05
 * @LastEditors: Lemon
 * @LastEditTime: 2021-06-30 20:34:17
 * @FilePath: /react-pixi-fiber/react-pixi-mini.js
 */
if (process.env.NODE_ENV === "production") {
  module.exports = require("./cjs/react-pixi-mini.production.min.js");
} else {
  module.exports = require("./cjs/react-pixi-mini.development.js");
}