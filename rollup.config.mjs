import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import json from '@rollup/plugin-json';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';

const createConfig = (format) => ({
  input: 'src/index.jsx',
  output: {
    file: `dist/index.${format === 'esm' ? 'esm.js' : 'js'}`,
    format,
    sourcemap: true,
    exports: 'named',
    name: 'ZintlrComponentLib',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      extensions: ['.js', '.jsx'],
      preferBuiltins: true,
    }),
    commonjs({
      include: /node_modules/,
    }),
    json(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: [
        ['@babel/preset-env', {
          modules: false,
          targets: {
            browsers: ['>0.2%', 'not dead', 'not op_mini all']
          }
        }],
        '@babel/preset-react'
      ],
      plugins: [
        '@babel/plugin-proposal-class-properties'
      ],
      extensions: ['.js', '.jsx']
    }),
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extensions: ['.css'],
      minimize: true,
      modules: true,
      inject: {
        insertAt: 'top',
      },
    }),
    terser({
      format: {
        comments: false,
      },
      compress: {
        drop_console: true,
        pure_getters: true,
      }
    }),
  ],
  external: [
    'react',
    'react-dom',
    '@reduxjs/toolkit',
    'react-redux',
    'axios',
    'yup'
  ],
  onwarn(warning, warn) {
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  }
});

export default [
  createConfig('cjs'),
  createConfig('esm')
];
