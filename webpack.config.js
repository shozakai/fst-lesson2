/**
 *
 * webpack.config.js
 *
 */
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const globule = require('globule');
const globImporter = require('node-sass-glob-importer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');



/**
 * root
 */
const ROOT = '';



/**
 * config
 */
const CONFIG = {
    mode: process.env.NODE_ENV || 'development',
    dest: process.env.NODE_ENV === 'production' ? 'public' : 'develop',
    useSourceMap: process.env.NODE_ENV !== 'production',
    entry: './src/entry.js',
    output: {
        js: ROOT + 'assets/js/app.js',
        css: ROOT + 'assets/css/app.css',
    },
    path: {
        pugRoot: './src/pug/root/',
        staticRoot: './src/static',
    },
    provide: {
        $: 'jquery',
        TweenMax: ['gsap', 'TweenMax'],
        Power1: ['gsap', 'Power1'],
        Power2: ['gsap', 'Power2'],
        Power3: ['gsap', 'Power3'],
        Power4: ['gsap', 'Power4']
    }
}



/**
 * app
 */
const app = {
    mode: CONFIG.mode,
    entry: CONFIG.entry,
    output: {
        path: path.join(__dirname, CONFIG.dest),
        filename: CONFIG.output.js
    },
    devServer: {
		contentBase: path.join(__dirname, CONFIG.dest),
        open: true,
        openPage: ROOT,
        port: 3000,
        host: '0.0.0.0',
        disableHostCheck: true
	},
    module: {
        rules: [

            /* js */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    '@babel/preset-env',
                                    {
                                        'targets': {
                                            'ie': '11'
                                        },
                                        'useBuiltIns': 'usage',
                                        'corejs': 3
                                    }
                                ]
                            ]
                        }
                    }
                ]
            },

            /* scss */
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: CONFIG.useSourceMap,
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: CONFIG.useSourceMap,
                            plugins: [
                                require('autoprefixer')({
                                    grid: true
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: CONFIG.useSourceMap,
                            sassOptions: {
                                importer: globImporter()
                            }
                        }
                    }
                ]
            },


            /* css */
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: CONFIG.useSourceMap,
                            url: false
                        }
                    }
                ]
            },

            /* html */
            {
                test: /\.pug$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            attrs: false
                        }
                    },
                    {
                        loader: 'pug-html-loader',
                        options: {
                            pretty: true,
                            data: {
                                isProduction: CONFIG.mode === 'production'
                            }
                        }
                    }
                ]
            },

            /* images */
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            },

            /* font */
            {
                test: /\.(woff|woff2|eot|ttf)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]'
                }
            }
        ]
    },
    performance: {
        hints: false
    },
    devtool: CONFIG.useSourceMap ? 'source-map' : false,
    plugins: [
        new webpack.ProvidePlugin(CONFIG.provide),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: CONFIG.output.css
        }),
        new CopyWebpackPlugin([
            { from: CONFIG.path.staticRoot, to: ROOT }
        ])
    ]
};



/**
 * pugs
 */
const PUGS = globule.find(CONFIG.path.pugRoot + '**/*.pug', {
    ignore: [
        CONFIG.path.pugRoot + '**/_*.pug'
    ]
});
PUGS.forEach((filePath) => {
    const fileName = filePath.replace(CONFIG.path.pugRoot, ROOT).replace('.pug', '.html');
    const inst = new HtmlWebpackPlugin({
        filename: fileName,
        template: filePath
    });
    app.plugins.push(inst);
});



/**
 * exports
 */
module.exports = app;
