module.exports = {
	lintOnSave: false,
	devServer: {
		host: "localhost",
		port: 8080,
		https: false, //
		open: true, // 配置是否自动启动浏览器
		proxy: {
			'/api': {
				target: 'https://api.a7laya.com', // 服务器api地址
				ws: true,
				secure: false,
				changeOrigin: true, // 是否跨域
				pathRewrite: {
					'^/api': ''
				}
			}
		}

	}
}
