'use strict';
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';

module.exports = merge({
        entry: {
            main: path.resolve(__dirname, 'src/index.tsx'),
        },
        resolve: {
            extensions: ['.js', '.tsx']
        },
        module: {
            rules: [
                {
                    enforce: 'pre',
                    test: /\.(ts|tsx)$/,
                    include: [
                        path.resolve(__dirname, 'src'),
                    ],
                    options: {
                        cache: true,
                        //formatter: require.resolve('react-dev-utils/eslintFormatter'),
                        tslintPath: require.resolve('tslint'),
                        emitWarning: !isProd,
                        //failOnError: true,
                        //failOnWarning: true,
                    },
                    loader: require.resolve('tslint-loader'),
                }, {
                    test: /\.(js|jsx|ts|tsx)$/,
                    include: [
                        path.resolve(__dirname, 'src'),
                    ],
                    use: [{
                        loader: "babel-loader",
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                                '@babel/preset-typescript',
                            ],
                            plugins: [
                                "@babel/plugin-syntax-dynamic-import",
                                "@babel/plugin-transform-react-jsx",
                                "@babel/plugin-transform-template-literals",
                                "@babel/plugin-proposal-export-namespace-from",
                                "@babel/plugin-proposal-export-default-from",
                                "@babel/plugin-transform-runtime",
                                "transform-es2015-template-literals",
                                "es6-promise",
                                [
                                    require.resolve('babel-plugin-named-asset-import'),
                                    {
                                        loaderMap: {
                                            svg: {
                                                ReactComponent:
                                                    '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                                            },
                                        },
                                    },
                                ],
                                '@babel/plugin-proposal-object-rest-spread',
                                '@babel/plugin-proposal-class-properties',
                            ],
                            // This is a feature of `babel-loader` for webpack (not Babel itself).
                            // It enables caching results in ./node_modules/.cache/babel-loader/
                            // directory for faster rebuilds.
                            cacheDirectory: true,
                            // See #6846 for context on why cacheCompression is disabled
                            cacheCompression: false,
                            compact: isProd,
                        }
                    }]
                }, {
                    // Process any JS outside of the app with Babel.
                    // Unlike the application JS, we only compile the standard ES features.
                    test: /\.(js|mjs)$/,
                    exclude: [
                        /@babel(?:\/|\\{1,2})runtime/,
                        path.resolve(__dirname, 'src'),
                    ],
                    loaders: 'babel-loader',
                    options: {
                        babelrc: false,
                        configFile: false,
                        compact: false,
                        presets: [
                            [
                                require.resolve('babel-preset-react-app/dependencies'),
                                {helpers: true},
                            ],
                        ],
                        cacheDirectory: true,
                        cacheCompression: false,

                        // If an error happens in a package, it's possible to be
                        // because it was compiled. Thus, we don't want the browser
                        // debugger to show the original code. Instead, the code
                        // being evaluated would be much more helpful.
                        sourceMaps: false,
                    },
                }, {
                    test: /\.html$/i,
                    // exclude: [/node_modules/],
                    use: [{
                        loader: 'ejs-loader'
                    }, {
                        loader: 'extract-loader'
                    }, {
                        loader: 'html-loader',
                        options: {
                            minimize: isProd,
                            interpolate: false,
                        }
                    }],
                }, {
                    test: /\.css$/i,
                    exclude: [/node_modules/],
                    loader: 'style-loader!css-loader'
                }, {
                    test: /\.css$/i,
                    include: [/node_modules/],
                    use: [
                        {loader: 'style-loader', options: {injectType: 'lazySingletonStyleTag'}},
                        'css-loader',
                    ],
                }, {
                    test: /\.s[ac]ss$/i,
                    exclude: [/node_modules/],
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader',
                    ],
                },
            ],
        },
        optimization: {
            minimize: isProd,
            minimizer: [new TerserPlugin({
                terserOptions: {
                    parse: {
                        // We want terser to parse ecma 8 code. However, we don't want it
                        // to apply any minification steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the 'compress' and 'output'
                        // sections only apply transformations that are ecma 5 safe
                        // https://github.com/facebook/create-react-app/pull/4234
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        warnings: false,
                        // Disabled because of an issue with Uglify breaking seemingly valid code:
                        // https://github.com/facebook/create-react-app/issues/2376
                        // Pending further investigation:
                        // https://github.com/mishoo/UglifyJS2/issues/2011
                        comparisons: false,
                        // Disabled because of an issue with Terser breaking valid code:
                        // https://github.com/facebook/create-react-app/issues/5250
                        // Pending further investigation:
                        // https://github.com/terser-js/terser/issues/120
                        inline: 2,
                    },
                    mangle: {
                        safari10: true,
                    },
                    // Added for profiling in devtools
                    keep_classnames: false,
                    keep_fnames: false,
                    /*keep_classnames: isEnvProductionProfile,
                    keep_fnames: isEnvProductionProfile,*/
                    output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true,
                    },
                },
                // Use multi-process parallel running to improve the build speed
                // Default number of concurrent runs: os.cpus().length - 1
                // Disabled on WSL (Windows Subsystem for Linux) due to an issue with Terser
                // https://github.com/webpack-contrib/terser-webpack-plugin/issues/21
                // parallel: !isWsl,
                // Enable file caching
                cache: true,
                sourceMap: true,
            })],
        },
    }, {
        entry: {
            // todo: if vendors are enabled, they still remain in `main`
            //vendors: ['react', 'react-dom'],
        },
        output: {
            filename: 'assets/[name].js',
            //filename: 'assets/[name].[hash:8].js',
            path: path.resolve(__dirname, 'dist'),
            chunkFilename: 'assets/[name].js',
            //chunkFilename: 'assets/[name].chunk.[hash:8].js',
            futureEmitAssets: true,
        },
        performance: {
            hints: false,
        },
        resolve: {
            // options for resolving module requests
            // (does not apply to resolving to loaders)
            // todo: make as strict as possible, only include needed ones
            modules: [
                //path.resolve(root, 'node_modules'),
                "node_modules",
            ],
        },
        module: {
            rules: [{
                test: /\.(jpe?g|png|gif)$/i,
                exclude: /node_modules/,
                use: [
                    'url-loader?limit=10000',
                    'img-loader',
                    'file-loader?name=[name].[ext]?[hash]'
                ]
            }, {
                // the following 3 rules handle font extraction
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'url-loader?limit=10000&mimetype=application/font-woff'
            }, {
                test: /\.(ttf|eot)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader'
            }, {
                test: /\.otf(\?.*)?$/,
                use: 'file-loader?name=/fonts/[name].[ext]&mimetype=application/font-otf'
            }, {
                loader: 'file-loader',
                // Exclude `js` files to keep "css" loader working as it injects
                // its runtime that would otherwise be processed through "file" loader.
                // Also exclude `html` and `json` extensions so they get processed
                // by webpacks internal loaders.
                exclude: [/\.(js|css|s[ac]ss|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
                options: {
                    name: 'assets/media/[name].[hash:8].[ext]',
                },
            },],
        },
        optimization: {
            runtimeChunk: false,
            splitChunks: {
                //chunks: 'all',
                name: true,
                /*cacheGroups: {
                    default: false,
                    vendors: false,
                    vendor: {
                        chunks: 'all',
                        test: /node_modules/
                    }
                }*/
            },
        },
        plugins: [
            new HtmlWebpackPlugin(
                Object.assign(
                    {},
                    {
                        inject: true,
                        template: path.resolve(__dirname, 'public', 'index.html'),
                    },
                    process.env.NODE_ENV === 'production' ? {
                            minify: {
                                removeComments: true,
                                collapseWhitespace: true,
                                removeRedundantAttributes: true,
                                useShortDoctype: true,
                                removeEmptyAttributes: true,
                                removeStyleLinkTypeAttributes: true,
                                keepClosingSlash: true,
                                minifyJS: true,
                                minifyCSS: true,
                                minifyURLs: true,
                            },
                        }
                        : undefined
                )
            ),

            // doesnt work with v4 of HtmlWebpackPlugin, but we need HtmlWebpackPlugin for the code splitting it seems
            //new InterpolateHtmlPlugin(HtmlWebpackPlugin, buildEnv(paths.demo.servedPath).raw),
        ],
    },
    isProd ? {
        mode: 'production',
        /*optimization: {
            runtimeChunk: 'single',
        },*/
        plugins: [
            new CleanWebpackPlugin(),
            // Inlines the webpack runtime script. This script is too small to warrant
            // a network request.
            // https://github.com/facebook/create-react-app/issues/5358
            // new InlineChunkHtmlPlugin(HtmlWebpackPlugin, [/runtime-.+[.]js/])
        ]
    } : {
        mode: 'development',
        devServer: {
            contentBase: 'public',
            publicPath: '/',
            compress: true,
            inline: true,
            hot: true,
            historyApiFallback: true,
            port: 4044,
        },
        optimization: {
            //runtimeChunk: 'single',
            namedModules: true,
        },
        //devtool: 'eval-cheap-module-source-map',// faster rebuild, not for production
        devtool: 'cheap-module-source-map',// slow build, for production
    }
);
