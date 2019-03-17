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
					<AutoComplete
						v-model="inputMed"
        		@on-search="handleSearch2"
						placeholder="input here"
						@on-focus="focus($event)"
						@keyup.enter.native="moveFocusToDose"
						@on-clear="kkk"
						ref="mark1"
						:clearable="true"
						style="width:70%">
						<Option v-for="item in list" :value="item.medname" :key="item._id">{{ item.alias }}    {{item.medname}} </Option>
					</AutoComplete>
					<Input v-model="inputDose" class="doc-input2" placeholder="Enter something..." ref="mark" @keyup.enter.native="postToTb" style="width: 20%"/>
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
	export default {
		data () {
			return {
				medtype: '免煎药',
				deleteNotClick: true,
				patientName: '',
				inputMed: '',
				inputDose: '',
				ordTotal: '0',
				orderCount: '',
				total: '',			
				list: [],
				cacheMedData: [],
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

			moveFocusToDose: function(){
        /* let searchStr = this.inputMed;
        if(searchStr === ""){
          alert("不能为空");
          return;
        }
        
        //check if it is exist
        let existInDb = this.medsToShow.find(function(p){
            return p.medname === searchStr;
        });

        if(typeof(existInDb)=="undefined"){
            alert("药品库中没有这种药，请重输");
            return;
        }

        //check if already exist in table
        let existInTable = this.orderMed.find(function(p){
            return p.medname === searchStr;
        });
        if(typeof(existInTable)!="undefined"){
            alert("不能重复添加药品");
            return;
        }

        this.remainInv = existInDb.inventory;
        this.singlePrice = existInDb.sellprice;
        this.singleG = existInDb.spec; */
        //move focus to input dose
        this.$refs.mark.$el.querySelector('input').focus();
      },

			postToTb () {
				this.$refs.mark1.$el.querySelector('input').focus();
			},

			remove (index) {
				alert(tryconst);
			},

			toLoading () {
				if(this.medtype == '草药'){
					alert("hahaha");
				};
				alert(tryconst);
			},

			kkk(){
				alert("11111");
			},

			handleSearch2 (value) {
				if(value.length < 2){
					this.list = [];
					return;
				}

				let state = this.cacheMedData;
				this.list = state.filter( function (item) {
  				return item.alias.indexOf(value) === 0;
					}
				);
				//alert(this.list);
				//this.list = ['Alabama', 'Alaska'];
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
						this.cacheMedData = response.data;
						alert(JSON.stringify(this.cacheMedData));
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