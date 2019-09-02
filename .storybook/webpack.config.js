const path = require('path')

module.exports = async ({ config }) => {
  config.resolve = {
    ...config.resolve,
    alias: {
      'styled-components': path.join(
        __dirname,
        '../node_modules/styled-components'
      ),
        'styled-system': path.join(__dirname, '../node_modules/styled-system'),
    'prop-types': path.join(__dirname, '../node_modules/prop-types'),
    '@lessondesk/material-icons': path.join(__dirname, '../node_modules/@lessondesk/material-icons/'),
    '@babel/runtime': path.join(__dirname, '../node_modules/@babel/runtime'),
    '@radio-retail/radio-ui': path.join(__dirname, '../src'),
    }
  }

  // NOTE: Let babel compile @lessondesk/material-icons by overriding excludes rule
  config.module.rules[0].exclude = function (modulePath) {
    return /node_modules/.test(modulePath) &&
      !/node_modules\/@lessondesk\/material-icons/.test(modulePath)
  },

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
  config.resolve.extensions.push(".mjs");

  // NOTE: Override loader
  config.module.rules[5] = {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      }

      config.module.rules.push({
          test: /\.(woff|woff2|eot|ttf|svg)$/,
          use: 'url-loader'
      })

  return config
};
