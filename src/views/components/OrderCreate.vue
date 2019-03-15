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
			<Col :md="24" >
				<div class="tableSum">
					<Tag type="border" color="primary">每付价钱</Tag>
					<Tag type="border" color="primary">{{ordTotal}}元</Tag>
				</div>
			</Col>
		</Row>
		<Row>
			<Col :md="24" >
				<div class="tableSum">
					<Input v-model="orderCount" size="small" @on-focus="focus($event)"/>
					<Tag type="border" color="primary" style="width: 40%">合计：   </Tag>
					<Input v-model="total" size="small" @on-focus="focus($event)"/>
				</div>
			</Col>
		</Row>
		<Row>
      <Col :sm="24" :md="15">
				<div class="doc-indiv">
					<Input v-model="patientName" class="doc-input1" placeholder="输入名字..." style="width: 95%"/>
					<v-autocomplete :items="items" v-model="item" :get-label="getLabel" :component-item='template' @update-items="updateItems" :min-len='1'> </v-autocomplete>
					<Input v-model="inputDose" class="doc-input2" placeholder="Enter something..." style="width: 20%"/>
					<Button type="success" class="doc-input2" size="small" @click="toLoading">+</Button>


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
	import ItemTemplate from './ItemTemplate.vue'
	export default {
		data () {
			return {
				medtype: '免煎药',
				deleteNotClick: true,
				patientName: '',
				inputDose: '',
				ordTotal: '0',
				orderCount: '',
				total: '',
				item: null,
			items: [],
			Animals: [{id: 1, name: 'Golden Retriever', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
  {id: 2, name: 'Cat', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
  {id: 3, name: 'Squirrel', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
  {id: 4, name: 'Cougar', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
  {id: 5, name: 'Rave', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
  {id: 6, name: 'Alligator', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'},
{id: 7, name: 'Black Bear', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.'}],
      template: ItemTemplate,
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
			//select text when get focus
      focus(event) {
				//alert(event.currentTarget);
        event.currentTarget.select();
			},
			
			remove (index) {
				alert(tryconst);
			},

		  getLabel (item) {
      	if (item) {
        	return item.name
      	}
      	return ''
    },
    updateItems (text) {
			//alert(text);
			if(!text){
				this.items = [];
				return;
			}
      this.items = this.Animals.filter((item) => {
        return (item.name.toLowerCase().indexOf(text.toLowerCase()) == 0)
      })
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

	.doc-indiv .doc-input2{
		margin-top:9px;
	}

	.tableSum{
		float: right;
		display: flex;
	}

</style>