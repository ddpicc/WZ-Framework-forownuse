<template>
	<div class="animated fadeIn">
		<Row>
			<Col :md="24" >
				<div class="doc-header">
					<RadioGroup v-model="medtype" size="small">
						<Radio label="免煎药"></Radio>
						<Radio label="草药"></Radio>
					</RadioGroup>
					<div class="actionMenu">
						<Button type="success" size="small" v-if="deleteNotClick" @click="toLoading" @keyup.alt.enter.native="toLoading">添加</Button>
						<Button type="success" size="small" v-if="deleteNotClick" @click="deleteMed">删除</Button>
						<Button type="success" size="small" v-if="!deleteNotClick" @click="deleteCancal">取消</Button>
					</div>
				</div>

				<div style="" class="doc-content">
					<Table height="313" size="small" border :columns="createOrdCol" :data="createOrdData"></Table>
				</div>
			</Col>
		</Row>
		<Row>
      <Col :sm="24" :md="15">
				<div class="doc-indiv">
					<Input v-model="value" placeholder="Enter something..." style="width: 95%"/>
					<Input v-model="value" placeholder="Enter something..." style="width: 70%"/>
					<Input v-model="value" placeholder="Enter something..." style="width: 20%"/>
					<Button type="success" size="small" @click="toLoading">+</Button>
				</div>
			</Col>
      <Col :sm="24" :md="9">
				<div class="doc-indiv">
					<Table size="small" border :columns="infoDisplayCol" :data="infoDisplayData"></Table>
				</div>
			</Col>
    </Row>
	</div>
</template>

<script>
	import { tryconst } from 'utils/index';
	export default {
		data () {
			return {
				medtype: '免煎药',
				deleteNotClick: true,
				createOrdCol: [
					{
						title: '名称',
						key: 'medname',
						align: 'center',
					},
					{
						title: '数量',
						key: 'mednumber',
						align: 'center'
					},
          {
						title: '名称',
						key: 'medname',
						align: 'center',
					},
					{
						title: '数量',
						key: 'mednumber',
						align: 'center'
					},
          {
						title: '名称',
						key: 'medname',
						align: 'center',
					},
					{
						title: '数量',
						key: 'mednumber',
						align: 'center'
					},
          {
						title: '名称',
						key: 'medname',
						align: 'center',
					},
					{
						title: '数量',
						key: 'mednumber',
						align: 'center'
					},
				],
				createOrdData: [
					{
						medname: '蜜款冬花',
						mednumber: 3,
					},
					{
						medname: '蜜款冬花',
						mednumber: 3,
					},
					{
						medname: '蜜款冬花',
						mednumber: 3,
					},
					{
						medname: '蜜款冬花',
						mednumber: 3,
					},
					{
						medname: '蜜款冬花',
						mednumber: 3,
					},
					{
						medname: '蜜款冬花',
						mednumber: 3,
					},
					{
						medname: '蜜款冬花',
						mednumber: 3,
					},
					{
						medname: '蜜款冬花',
						mednumber: 3,
					}
				],
				infoDisplayCol: [
					{
						title: '库存',
						key: 'inventory',
						align: 'center',
					},
					{
						title: '含量',
						key: 'spec',
						align: 'center'
					},
          {
						title: '单价',
						key: 'unitprice',
						align: 'center',
					},

				],
				infoDisplayData: []

			}
		},
		methods: {
			remove (index) {
				alert(tryconst);
			},

			toLoading () {
				if(this.medtype == '草药'){
					alert("hahaha");
				};
				alert(tryconst);
			},

			deleteMed: function(){
				this.deleteNotClick = false;
				//dynamic modify column
				let deleteCol = {
					title: '',
					key: 'action',
					width: 30,
					align: 'center',
					render: (h, params) => {
						return h('div', [
							h('Icon', {
								props: {
									type: 'md-trash',
									size: 'small'
								},
								on: {
									click: () => {
										this.remove(params.index)
									}
								}
							},)
						]);
					}
				};
				this.createOrdCol.splice(2,0,deleteCol);
				this.createOrdCol.splice(5,0,deleteCol);
				this.createOrdCol.splice(8,0,deleteCol);
				this.createOrdCol.splice(11,0,deleteCol);
			},

			deleteCancal: function(){
				this.deleteNotClick = true;
				//restore column
				this.createOrdCol.splice(2,1);
				this.createOrdCol.splice(4,1);
				this.createOrdCol.splice(6,1);
				this.createOrdCol.splice(8,1);
			},

			// 获取全部数据
    	getAll: function() {
				return new Promise((resolve, reject) => {
					this.$http.get("/medapi/allmed").then(response => {
						this.data6 = response.data;
						resolve();
					}).catch(error => {
						reject(error);
					});
				});
			}

		},

		watch: {
			medtype: function() {

			}
		},

		mounted: function() {
			this.getAll();
		}

	}
</script>

<style scoped>
	.doc-header .actionMenu{
		float: right;
	}

	.doc-content{
		margin-bottom:5px;
	}

	.doc-indiv{
		margin-top:5px;margin-bottom:5px;padding:5px;line-height:20px
	}

</style>