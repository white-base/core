import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';
import autoExternal from 'rollup-plugin-auto-external';
import bundleSize from 'rollup-plugin-bundle-size';
import aliasPlugin from '@rollup/plugin-alias';
import path from 'path';
import copy from 'rollup-plugin-copy';

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
      minifiedVersion: false,
      output: {
        file: `dist/${outputFileName}.js`,
        format: "esm",
        preferConst: true,
        // sourcemap: true,
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
      minifiedVersion: false,
      output: {
        file: `dist/${outputFileName}.umd.js`,
        name,
        format: "umd",
        // sourcemap: true,
        exports: "named",
        banner
      }
    }),

    // Browser CJS bundle
    // ...buildConfig({
    //   input: defaultInput,
    //   es5: false,
    //   minifiedVersion: false,
    //   output: {
    //     file: `dist/browser/${outputFileName}.cjs`,
    //     name,
    //     format: "cjs",
    //     exports: "named",
    //     banner
    //   }
    // }),

    // Node.js commonjs bundle
    {
      input: defaultInput,
      output: [
        {
          file: `dist/${outputFileName}.cjs`,
          format: "cjs",
          // sourcemap: true,
          preferConst: true,
          exports: "named",
          banner
        },
        // {
        //   file: `dist/${outputFileName}.min.cjs`,
        //   format: "cjs",
        //   preferConst: true,
        //   exports: "named",
        //   plugins: [terser()], // 압축된 파일
        // }
      ],
      plugins: [
        autoExternal(),
        resolve(),
        commonjs(),
        copy({
          targets: [
            { src: 'src/locales/**/*', dest: 'dist/locales' }
          ]
        })
      ]
    },
    // test 1
    {
      input: 'src/message2.js',
      output: [
        {
          file: `dist/message2.cjs`,
          format: "cjs",
          // sourcemap: true,
          preferConst: true,
          exports: "named",
          banner
        },
        {
          file: `dist/message2.umd.js`,
          format: "umd",
          // sourcemap: true,
          name: "MyLibrary", 
          preferConst: true,
          exports: "named",
          banner
        }
      ],
      plugins: [
        autoExternal(),
        resolve(),
        commonjs(),
        json()
      ]
    },
    // test 2
    {
      input: 'src/message3.js',
      output: [
        {
          file: `dist/message3.cjs`,
          format: "cjs",
          preferConst: true,
          exports: "named",
          banner
        }
      ],
      plugins: [
        autoExternal(),
        resolve(),
        json({
          namedExports: true, // JSON을 ES6 모듈처럼 변환
          preferConst: true
        }),
        commonjs(),
        babel({
          babelHelpers: 'bundled',
          presets: [
            ["@babel/preset-env", {
              "targets": {
                "ie": "11"  // IE 11 및 ES5 지원
              },
              "useBuiltIns": "entry",
              "corejs": 3
            }]
          ],
          exclude: 'node_modules/**'
        }),
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