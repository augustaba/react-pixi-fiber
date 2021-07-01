const pkg = require("../package.json");
const json = require("rollup-plugin-json");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const globals = require("rollup-plugin-node-globals");
const replace = require("rollup-plugin-replace");
const resolve = require("rollup-plugin-node-resolve");
const { terser } = require("rollup-plugin-terser");
const visualizer = require("rollup-plugin-visualizer");

const NODE_ENV = process.env.NODE_ENV || "production";
const isProduction = NODE_ENV === "production";

const getOutputFile = (name, format = "cjs") => {
  const suffix = isProduction ? "production.min" : "development";
  return `${format}/${name}.${suffix}.js`;
};

const getPlugins = (entry, plugins = []) => [
  json({
    preferConst: true,
    indent: "  ",
  }),
  resolve({
    browser: true,
    jsnext: true,
    main: true,
  }),
  babel({
    exclude: "node_modules/**",
  }),
  ...plugins,
  replace({
    __DEV__: isProduction ? JSON.stringify(false) : JSON.stringify(true),
    __PACKAGE_NAME__: JSON.stringify(pkg.name),
    "process.env.NODE_ENV": isProduction ? JSON.stringify("production") : JSON.stringify("development"),
  }),
  commonjs({
    ignoreGlobal: false,
    include: [
      "node_modules/fbjs/**",
      "node_modules/object-assign/**",
      "node_modules/performance-now/**",
      "node_modules/prop-types/**",
      "node_modules/react/**",
      "node_modules/react-dom/**",
      "node_modules/react-reconciler/**",
      "node_modules/scheduler/**",
    ],
  }),
  globals(),
  isProduction && terser(),
  visualizer({
    filename: `./stats.${entry}.${isProduction ? "production" : "development"}.html`,
  }),
];

export default [
  {
    input: "src/index.js",
    output: {
      file: getOutputFile("react-pixi-fiber"),
      name: "ReactPixiFiber",
      exports: "named",
      format: "cjs",
    },
    plugins: getPlugins("index"),
    external: ["pixi.js", "prop-types", "react", "react-dom", "scheduler"],
  },
  {
    input: "src/index.js",
    output: {
      file: getOutputFile("react-pixi-fiber", "esm"),
      name: "ReactPixiFiber",
      exports: "named",
      format: "esm",
    },
    plugins: getPlugins("index"),
    external: ["pixi.js", "prop-types", "react", "react-dom", "scheduler"],
  },
  // {
  //   input: "src/index.js",
  //   output: {
  //     file: getOutputFile("react-pixi-mini"),
  //     name: "ReactPixiFiber",
  //     exports: "named",
  //     format: "cjs",
  //   },
  //   plugins: getPlugins("mini", [
  //     babel({
  //       plugins: [["module-resolver", { alias: { "pixi.js": "@tbminiapp/pixi-miniprogram-engine" } }]],
  //     }),
  //   ]),
  //   external: ["pixi.js", "prop-types", "react", "react-dom", "@tbminiapp/pixi-miniprogram-engine", "scheduler"],
  // },
  {
    input: "src/index.js",
    output: {
      file: getOutputFile("react-pixi-fiber", "umd"),
      name: "ReactPixiFiber",
      exports: "named",
      format: "umd",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
        "prop-types": "PropTypes",
        "pixi.js": "PIXI",
        scheduler: "Scheduler",
      },
    },
    plugins: getPlugins("index"),
    external: ["pixi.js", "prop-types", "react", "react-dom", "scheduler"],
  }
];
