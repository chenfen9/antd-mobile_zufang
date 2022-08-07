  搜索cssRegex，然后再下面仿着写下面的两步
  第一步：
  // 新加less
const lessRegex = /\.less$/
const lessModuleRegex = /\.module\.less$/


    第二步：
  // less 新加
              ,{
              test: lessRegex,  // 新加
              exclude: lessModuleRegex,  // 新加
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction && shouldUseSourceMap
                },
                'less-loader'   // 新加
              ),
              sideEffects: true
            },
            {
              test: lessModuleRegex,  // 新加
              use: getStyleLoaders(
                {
                  importLoaders: 3,
                  sourceMap: isEnvProduction && shouldUseSourceMap,
                  modules: {
                    getLocalIdent: getCSSModuleLocalIdent
                  }
                },
                'less-loader'    // 新加
              )
            },