import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';
import autoExternal from 'rollup-plugin-auto-external';
import bundleSize from 'rollup-plugin-bundle-size';
import aliasPlugin from '@rollup/plugin-alias';
import path from 'path';

const lib = require("./package.json");
const outputFileName = 'logic-core';
const name = "_L";
const namedInput = './index.js';
const defaultInput = './index.js';

const buildConfig = ({es5, browser = true, minifiedVersion = true, alias, ...config}) => {
  const {file} = config.output;
  const ext = path.extname(file);
  const basename = path.basename(file, ext);
  const extArr = ext.split('.');
  extArr.shift();


  const build = ({minified}) => ({
    input: namedInput,
    ...config,
    output: {
      ...config.output,
      file: `${path.dirname(file)}/${basename}.${(minified ? ['min', ...extArr] : extArr).join('.')}`
    },
    plugins: [
      aliasPlugin({
        entries: alias || []
      }),
      json(),
      resolve({browser}),
      commonjs(),

      minified && terser(),
      minified && bundleSize(),
      ...(es5 ? [babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env']
      })] : []),
      ...(config.plugins || []),
    ]
  });

  const configs = [
    build({minified: false}),
  ];

  if (minifiedVersion) {
    configs.push(build({minified: true}))
  }

  return configs;
};

export default async () => {
  const year = new Date().getFullYear();
  const banner = `/*! logic Core v${lib.version} Copyright (c) ${year} ${lib.author} and contributors */`;

  return [
    // browser ESM bundle for CDN
    ...buildConfig({
      input: namedInput,
      output: {
        file: `dist/esm/${outputFileName}.js`,
        format: "esm",
        preferConst: true,
        exports: "named",
        banner
      }
    }),
    // browser ESM bundle for CDN with fetch adapter only
    // Downsizing from 12.97 kB (gzip) to 12.23 kB (gzip)
/*    ...buildConfig({
      input: namedInput,
      output: {
        file: `dist/esm/${outputFileName}-fetch.js`,
        format: "esm",
        preferConst: true,
        exports: "named",
        banner
      },
      alias: [
        { find: './xhr.js', replacement: '../helpers/null.js' }
      ]
    }),*/

    // Browser UMD bundle for CDN
    ...buildConfig({
      input: defaultInput,
      es5: true,
      output: {
        file: `dist/${outputFileName}.js`,
        name,
        format: "umd",
        exports: "named",
        banner
      }
    }),

    // Browser CJS bundle
    ...buildConfig({
      input: defaultInput,
      es5: false,
      minifiedVersion: false,
      output: {
        file: `dist/browser/${outputFileName}.cjs`,
        name,
        format: "cjs",
        exports: "named",
        banner
      }
    }),

    // Node.js commonjs bundle
    {
      input: defaultInput,
      output: {
        file: `dist/node/${outputFileName}.cjs`,
        format: "cjs",
        preferConst: true,
        exports: "named",
        banner
      },
      plugins: [
        autoExternal(),
        resolve(),
        commonjs()
      ]
    }
  ]
};
// export default {
//     input: ['index.esm.js'],      // 번들링 시작 파일 (엔트리 포인트)
//     output: [
//         { file: 'dist/bundle.esm.js', format: 'esm' },
//         { file: 'dist/bundle.cjs.js', format: 'cjs' },
//         { file: 'dist/bundle.umd.js', format: 'umd', name: '_L'}
//       ],
//   };