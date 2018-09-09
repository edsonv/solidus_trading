module.exports= {
  plugins: [ require('autoprefixer'),
  require('postcss-import')( {
    plugins: [ require('stylelint'),
    ]
  }
  ),
  require('postcss-font-magician')( {
    variants: {
      'Raleway': {
        '300': [],
        '600': [],
        '700': [],
        '700 italic': [],
      }
    }
  }
  ),
  require('postcss-preset-env')( {
    stage: 0,
    features: {
      customProperties: false,
      calc: false
    }
    ,
    browsers: 'last 2 versions'
  }
  ),
  require('css-mqpacker'),
  require('cssnano'),
  ]
}