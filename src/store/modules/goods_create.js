import $Util from '@/common/util.js'
export default {
	state: {
		sku_type: 0, // SKU类型 0 单一规格  1 多规格
		title: '', // 商品名称 
		category: [], // 分类
		desc: '',
		unit: '',
		stock: 0, // 总库存
		min_stock: 0, // 库存预警
		display_stock: 0, // 显示库存
		status: 0, // 是否上架
		express: '', // 运费
		
		banners: [
			{id:1, url:"http://127.0.0.1:8080/img/avatar.08803b0d.png"},
		], // 商品大图 
		
		
		
		// 单一规格
		oprice: 0, // 市场价 - 原价
		pprice: 0, // 销售价 - 现价
		cprice: 0, // 成本价
		weight: 0, // 重量
		volume: 0, // 体积
		
		// 多规格卡片
		sku_card: [],
		
		// 商品类型
		goods_type_id: "", 
		// 商品属性
		goods_attrs: {
			phone_model: ""
		},
		// 折扣
		discount: 0,
		
		// 规格组合表格表头
		ths:[
			{ name:'商品规格', rowspan: 1, colspan: 1, width: '' },
			{ name:'SKU图片', rowspan: 2, width: '60' },
			{ name:'销售价', rowspan: 2, width: '100' },
			{ name:'市场价', rowspan: 2, width: '100' },
			{ name:'成本价', rowspan: 2, width: '100' },
			{ name:'库存', rowspan: 2, width: '100' },
			{ name:'体积', rowspan: 2, width: '100' },
			{ name:'重量', rowspan: 2, width: '100' },
			{ name:'编码', rowspan: 2, width: '100' },
		]
	},
	getters: {
		skuLabels(state){
			return state.sku_card.filter(v=>v.list.length>0)
		},
		// 构造表头
		tableThs(state,getters){
			let length = getters.skuLabels.length
			state.ths[0].colspan = length
			state.ths[0].rowspan = length > 0 ? 1 : 0
			return state.ths
		},
		// 获取表格数据
		tableData(state){
			// 当前是否有规格卡片 没有的话直接返回一个空数组
			if(state.sku_card.length === 0) return []
			let sku_list = []
			for (var i = 0; i < state.sku_card.length; i++) {
				if(state.sku_card[i].list.length > 0) {
					sku_list.push(state.sku_card[i].list)
				}
			}
			if (sku_list.length === 0) return []
			let arr = $Util.cartesianProductOf(...sku_list)
			return arr.map(v=>{
				let obj = {
					skus:  [],
					image: '', // SKU图片
					pprice: 0, // 销售价
					oprice: 0, // 市场价
					cprice: 0, // 成本价
					stock:  0, // 库存
					volume: 0, // 体积
					weight: 0, // 重量
					code:   '' // 编码
				}
				obj.skus = v
				return obj
			})
		}
	},
	mutations: {
		// 修改state
		vModelState(state,{key,value}){
			state[key] = value
		},
		// 增加规格卡片
		addSkuCard(state,data){
			state.sku_card.push(data)
		},
		// 删除规格卡片
		delSkuCard(state,index){
			state.sku_card.splice(index,1)	
		},
		// 修改规格卡片
		vModelSkuCard(state, { key,index,value }){
			state.sku_card[index][key] = value
		},
		// 规格卡片排序
		sortSkuCard(state, {action,index}){
			console.log("state.sku_card:",state.sku_card)
			$Util[action](state.sku_card, index)
		},
		// 增加指定规格卡片的规格属性
		addSkuValue(state, {index, data}){
			state.sku_card[index].list.push(data)
		},
		// 删除指定规格卡片的规格属性
		delSkuValue(state, {cardIndex, valueIndex}){
			state.sku_card[cardIndex].list.splice(valueIndex, 1)
		},
		// 修改指定规格卡片的规格属性
		updateSkuValue(state, {cardIndex, valueIndex, key, value}){
			state.sku_card[cardIndex].list[valueIndex][key] = value
		},
		// 排序规格卡片的规格值列表
		sotrSkuValue(state, {cardIndex, value}){
			state.sku_card[cardIndex].list = value
		},
		// 修改商品属性
		vModelGoodsAttrs(state, { key, value }){
			state.goods_attrs[key] = value
		},
	},
	actions: {
		
	}
}