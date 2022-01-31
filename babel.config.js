module.exports = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: {
            node: 'current'
          }
        }
      ],
      '@babel/preset-typescript'
    ],
    plugins: [
      ['module-resolver', {
        alias: {
          "@controllers/": "./src/controllers",
          "@errors": "./src/errors",
          "@models": "./src/models",
          "@config": "./src/config",
          "@repositories": "./src/repositories",
          "@services": "./src/services",
          "@util": "./src/util"
        }
      }]
    ],
    ignore: [
      '**/*.spec.ts'
    ]
  }