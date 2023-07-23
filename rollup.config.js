const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const builtins = require('builtin-modules');
const dts = require("rollup-plugin-dts").default

const packageJson = require("./package.json");

const external = pkg => {
  const externals = [...Object.keys({ ...packageJson.dependencies, ...packageJson.peerDependencies }), ...builtins, 'tslib', 'react'];
  const result = externals.some(externalPkg => {
    return pkg.startsWith(externalPkg);
  });
  // console.log(externals)
  // console.log(pkg,result)
  return result
};

module.exports = [
  {
    input: "src/index.ts",
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
      typescript({ tsconfig: "./tsconfig.json" }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external,
    plugins: [dts()],
  },
];