const {override, fixBabelImports, addLessLoader,addWebpackPlugin, addDecoratorsLegacy} = require('customize-cra');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
module.exports = override(
    addWebpackPlugin(new AntdDayjsWebpackPlugin()),
    addDecoratorsLegacy(),
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }), addLessLoader({
        // https://stackoverflow.com/questions/61686398/webpack-less-loader-javascriptenabled-error 解决方案
        lessOptions:{
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#D01011',
                '@normal-color': '#666666',
            },
        }

    }),
);

