require('babel-register')({
  babelrc: false,
  presets: ['react'],
  plugins: [
    'transform-async-to-generator',
    'transform-object-rest-spread',
    'transform-es2015-modules-commonjs',
  ],
  env: {
    production: {
      plugins: [
        'transform-react-remove-prop-types',
        'transform-react-constant-elements',
        'transform-react-inline-elements',
      ],
    },
  },
});
require('css-modules-require-hook');
require('./server/server');
