export default {
	state: {
		navBar: {
			active: '0',
			list: []
		}
	},
	getters: { 
		// 获取第一个页面, 因为有的用户权限菜单首页并不是index页面,所以要先获取到第一个页面让其在登陆后进行跳转
		adminIndex(state){
			if(state.navBar.list.length === 0) return 'error_404'
			if(state.navBar.list[0].subMenu.length === 0) return 'error_404'
			let item = state.navBar.list[0].subMenu[0]
			if(item) return item.pathname
		}
	},
	mutations: {

		// 初始化菜单 把这个方法放到app.vue的created生命周期内 防止刷新页面丢失
		initNavBar(state){
			let navBar = window.sessionStorage.getItem('navBar')
			state.navBar = navBar ? JSON.parse(navBar) : {active: '0', list:[]}
		},
		// 创建菜单
		createNavBar(state, menus){
			let list = menus.map(item => {
				let subMenu = item.child.map(v=>{
					return {
						icon: v.icon,
						name: v.name,
						pathname: v.desc
					}
				})
				return {
					name: item.name,
					subActive: '0',
					subMenu,
				}
			})
			state.navBar.list = list
			// 本地存一份
			window.sessionStorage.setItem('navBar',JSON.stringify(state.navBar))
		}
	},
	actions: {
		
	}
}