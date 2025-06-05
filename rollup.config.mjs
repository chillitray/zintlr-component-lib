import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { babel } from "@rollup/plugin-babel";
import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import json from '@rollup/plugin-json';

const config = {
  input: 'src/index.jsx',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      extensions: ['.js', '.jsx']
    }),
    commonjs(),
    json(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: ['@babel/preset-env', '@babel/preset-react'],
      extensions: ['.js', '.jsx']
    }),
    postcss({
      config: {
        path: './postcss.config.js',
      },
      extensions: ['.css'],
      minimize: true,
      inject: {
        insertAt: 'top',
      },
    }),
    terser(),
  ],
  external: ['react', 'react-dom'],
  onwarn(warning, warn) {
    // Suppress 'this is undefined' warning
    if (warning.code === 'THIS_IS_UNDEFINED') return;
    warn(warning);
  }
};

export default config;
