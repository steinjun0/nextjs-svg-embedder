const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const builtins = require('builtin-modules');
const dts = require("rollup-plugin-dts").default
const babel = require("@rollup/plugin-babel").default;

const packageJson = require("./package.json");

const external = pkg => {
  const externals = [...Object.keys({ ...packageJson.dependencies, ...packageJson.peerDependencies }), ...builtins];
  const result = externals.some(externalPkg => {
    return pkg.startsWith(externalPkg);
  });
  return result
};

module.exports = [
  {
    input: "dist/index.js",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    external,
    plugins: [
      resolve(),
      commonjs(),
      // typescript({ tsconfig: "./tsconfig.json" }),
      babel({
        babelHelpers: "bundled",
      }),
      
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external,
    plugins: [dts()],
  },
];