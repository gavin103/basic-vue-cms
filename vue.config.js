module.exports = {
    // baseUrl: './',
    // assetsDir: 'static',
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/users':{
                target:'http://localhost:3000/',
                changeOrigin:true,
                // pathRewrite:{
                //     '/api':''
                // }
            },
            '/api':{
                target:'http://localhost:3000/',
                changeOrigin:true,
                // pathRewrite:{
                //     '/api':''
                // }
            },
        }
    }
}