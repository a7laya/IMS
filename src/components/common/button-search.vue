<!-- 搜索模块 - 高级搜索弹框 -->
<template>
	<div>
		<div class="d-flex align-items-center">
			<!-- 左边 -->
			<slot name="left"></slot>
			<!-- 右边 -->
			<div class="ml-auto animated faster" :class="superSearch ? 'fadeOutRight' : 'fadeInRight'" v-if='showSearch'>
				<slot name="right">
					<el-input v-model="keyword" size="mini" :placeholder="placeholder" :style="'width: '+width+'px;'"></el-input>
					<el-button type="info" size="mini" class="ml-2" @click="$emit('search', keyword)">搜索</el-button>
					<el-button v-if="showSuperSearch" size="mini" @click='openSuperSearch'>高级搜索</el-button>
				</slot>
			</div>
		</div>
		<!-- 高级搜索弹框 -->
		<div class="animated fadeInRight faster" v-show="superSearch && showSuperSearch">
			<el-card class="box-card bg-light mt-2">
				<div slot="header" class="clearfix" style="margin: -10px 0;">
					<span class="small">高级搜索</span>
					<i class="el-icon-caret-right" style="float: right; padding: 3px 0; cursor: pointer;" @click='closeSuperSearch'></i>
					<el-button style="float: right; padding: 3px 0;" type="text" size="mini" @click='closeSuperSearch'>收起</el-button>
				</div>
				<!-- 高级搜索表单 -->
				<slot name="form"></slot>
			</el-card>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			width: {
				type: [Number,String],
				default: 140
			},
			placeholder: {
				type: String,
				default: ''
			},
			showSearch: {
				type: Boolean,
				default: true
			},
			showSuperSearch: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				superSearch: false,
				keyword: ''
			}
		},
		methods:{
			closeSuperSearch(){
				this.superSearch = false
			},
			openSuperSearch(){
				this.superSearch = true
				this.$emit('openSuperSearch',this.keyword)
			}
		}
	}
</script>

<style>
</style>
