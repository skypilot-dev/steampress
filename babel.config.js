module.exports = {
  presets: [
    '@babel/typescript',
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
  ],
  plugins: [
    '@babel/proposal-class-properties',
    '@babel/proposal-numeric-separator',
    '@babel/proposal-object-rest-spread',
  ],
};
