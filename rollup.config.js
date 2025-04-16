import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import json from '@rollup/plugin-json';
import { babel } from '@rollup/plugin-babel';
import autoExternal from 'rollup-plugin-auto-external';
import bundleSize from 'rollup-plugin-bundle-size';
import aliasPlugin from '@rollup/plugin-alias';
import { cleandir } from 'rollup-plugin-cleandir';
import path from 'path';
import copy from 'rollup-plugin-copy';

const lib = require("./package.json");
const outputFileName = 'logic-core';
const name = "_L";
const namedInput = './index.js';
const defaultInput = './index.js';
const srcMap = true;
const OUT_DIR = './dist';

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
      // aliasPlugin({
      //   entries: alias || [
      //       { find: './message-wrap.js', replacement: './message-wrap-bundle.js'},
      //       { find: './src/message-wrap.js', replacement: './src/message-wrap-bundle.js'},
      //   ]
      // }),
      json(),
      resolve({ browser }),
      commonjs(),

      minified && terser(),
      minified && bundleSize(),
      ...(es5 ? [babel({
        babelHelpers: 'bundled',
        presets: ['@babel/preset-env']
      })] : []),
      ...(config.plugins || []),
    ],
    external: ['path', 'fs', 'url', 'URL'], // 내장 모듈은 번들 제외
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
  const banner = `/*! Logic Core v${lib.version} Copyright (c) ${year} ${lib.author} and contributors */`;

  return [
    // Node.js commonjs bundle
    {
      input: defaultInput,
      output: [
        {
          file: `dist/${outputFileName}.node.cjs`,
          format: "cjs",
          sourcemap: srcMap,
          // preferConst: true,
          exports: "named",
          banner
        },
      ],
      plugins: [
        autoExternal(),
        cleandir(OUT_DIR),
        aliasPlugin({
          entries: [
            { find: './message-wrap.js', replacement: './message-wrap.bundle.js'},
            { find: './src/message-wrap.js', replacement: './src/message-wrap.bundle.js'},
            { find: './load-json.js', replacement: './load-json.cjs'},
          ]
        }),
        resolve(),
        commonjs(),
        json(),
        copy({
          targets: [
            { src: 'src/locales/**/*', dest: 'dist/locales' }
          ]
        }),
        // resolve({ preferBuiltins: true }),
      ],
      external: ['path', 'fs', 'url', 'URL'], // 내장 모듈은 번들 제외
    },
      // dist 폴더 삭제 (빌드 전 처리)
    // {
    //   input: 'dummy', // 실제 사용되지 않는 더미 입력
    //   plugins: [
    //     del({ targets: 'dist/*' }) // dist 폴더 내 파일 삭제
    //   ]
    // },
    // {
    //   input: 'dummy',
    //   plugins: [cleandir(OUT_DIR)], // 'dist/' 디렉토리 정리
    // },
    // Browser UMD bundle for CDN
    ...buildConfig({
      input: defaultInput,
      es5: true,
      minifiedVersion: true,
      output: {
        file: `dist/${outputFileName}.js`,
        name,
        format: "umd",
        sourcemap: srcMap,
        exports: "named",
        banner,
        // globals: {
          // 'path': 'path',
          // 'fs': 'fs',
          // 'url': 'url',
        //   'URL': 'URL'
        // } 
      },
      plugins: [
        aliasPlugin({
          entries: [
            { find: './message-wrap.js', replacement: './message-wrap.bundle.js'},
            { find: './src/message-wrap.js', replacement: './src/message-wrap.bundle.js'},
            // { find: './load-json.js', replacement: './load-json.cjs'},
          ]
        }),
      ]
    }),
    // browser ESM bundle for CDN
    ...buildConfig({
      input: namedInput,
      minifiedVersion: true,
      browser: false,
      output: {
        file: `dist/${outputFileName}.esm.js`,
        format: "esm",
        // preferConst: true,
        sourcemap: srcMap,
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
        file: `dist/${outputFileName}.browser.cjs`,
        name,
        sourcemap: srcMap,
        format: "cjs",
        exports: "named",
        banner
      },
      plugins: [
        aliasPlugin({
          entries: [
            { find: './message-wrap.js', replacement: './message-wrap.bundle.js'},
            { find: './src/message-wrap.js', replacement: './src/message-wrap.bundle.js'},
            { find: './load-json.js', replacement: './load-json.cjs'},
          ]
        }),
      ]
    }),
    
  ]
};