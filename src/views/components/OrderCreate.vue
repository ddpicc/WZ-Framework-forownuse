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
						<Button type="success" size="small" v-if="deleteNotClick" @click="postOrdToDbSure">添加</Button>
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
			<Col :xs="24" :sm="24" :md="12" :lg="12">
				<div class="emptyTop"> </div>
				<Row :gutter="8">
					<Col span="7">
						<Input v-model="patientName" border placeholder="输入姓名..."/>
					</Col>
					<Col span="3">
						<Input v-model="patientName" placeholder="年龄..."/>
					</Col>
					<Col span="4">
						<Input v-model="patientName" placeholder="性别..."/>
					</Col>
					<Col span="9">
						<Input v-model="patientName" placeholder="症状..."/>
					</Col>
				</Row>
				<Row :gutter="8">
					<Col span="14">
						<AutoComplete
							v-model="inputMed"
							@on-search="handleSearch"
							placeholder="input here"
							@on-focus="focus($event)"
							@keyup.enter.native="moveFocusToDose"
							@on-select="handleSelect"
							ref="mark1">
							<Option v-for="item in list" :value="item.medname" :key="item._id">{{ item.alias }}    {{item.medname}} </Option>
						</AutoComplete>
					</Col>
					<Col span="6">
						<Input v-model="inputDose" placeholder="数量" @on-focus="focus($event)" ref="mark" @keyup.enter.native="postToTb"/>
					</Col>
					<Col span="2">
						<Button type="success" @click="postToTb">+</Button>
					</Col>
				</Row>
			</Col>
			<Col :xs="24" :sm="24" :md="12" :lg="12">
				<Row>
					<Col>
						<Tag type="border" color="primary" class="rightInput" >每付价钱: {{ordTotal}}元</Tag>
					</Col>
				</Row>
				<Row>
					<Col span="24">
						<Input v-model="total" class="rightInput" @on-focus="focus($event)" style="width: 15%"/>
						<Tag type="border" color="primary" class="rightInput" style="width: 20%">合计：</Tag>
						<Input v-model="orderCount" class="rightInput" @on-focus="focus($event)" placeholder="几付" style="width: 15%"/>
					</Col>
				</Row>
				<Col span="22" offset="2">
					<Table border :columns="infoDisplayCol" :data="infoDisplayData"></Table>
				</Col>
			</Col>
    </Row>
		<Modal v-model="printmodal" ok-text="打印" cancel-text="取消" @on-ok="printOrder">
			<div ref="print">
				<Row>
					<Col>
						<h6> {{patientName}}  </h6>
					</Col>
				</Row>			
				<Row :gutter="16" v-for="item in createOrdData" :key="item.id">
					<Col span="6">
							<div>{{item.medname1}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.count1}}</div>
					</Col>
					<Col span="6">
							<div>{{item.medname2}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.count2}}</div>
					</Col>
					<Col span="6">
							<div>{{item.medname3}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.count3}}</div>
					</Col>
					<Col span="6">
							<div>{{item.medname4}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.count4}}</div>
					</Col>
				</Row>
  		</div>
    </Modal>
	</div>
</template>

<script>
	import { getTime } from 'utils/index';
	export default {
		data () {
			return {
				printmodal: false,
				medtype: '免煎药',
				deleteNotClick: true,
				patientName: '',
				inputMed: '',
				inputDose: '',
				ordTotal: 0,
				ordBaseTotal: 0,
				orderCount: '',
				total: '',			
				list: [],
				cacheMedData: [],
				orderMed1PerObj: [],
				createOrdCol: [
					{
						title: '名称',
						key: 'medname1',
						align: 'center',
					},
					{
						title: '数量',
						key: 'count1',
						align: 'center'
					},
          {
						title: '名称',
						key: 'medname2',
						align: 'center',
					},
					{
						title: '数量',
						key: 'count2',
						align: 'center'
					},
          {
						title: '名称',
						key: 'medname3',
						align: 'center',
					},
					{
						title: '数量',
						key: 'count3',
						align: 'center'
					},
          {
						title: '名称',
						key: 'medname4',
						align: 'center',
					},
					{
						title: '数量',
						key: 'count4',
						align: 'center'
					},
				],
				createOrdData: [],
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

			//display all the med 4 each line
			disPlayToTb() {
				this.createOrdData = [];
				var emptyStr = "{";
				var carry = 4;
				for(var i=0; i < this.orderMed1PerObj.length; i++){
					let tempStrName = "medname" + (i%4+1);
					let tempStrNumber = 'count' + (i%4+1);
					emptyStr = emptyStr + '"' + tempStrName + '":"' + this.orderMed1PerObj[i].medname + '","'  + tempStrNumber + '":"' + this.orderMed1PerObj[i].count + '",';
					if(i>0 && (i+1) % 4 == 0){
						emptyStr = emptyStr.substr(0,emptyStr.length-1);
						emptyStr = emptyStr + '}';
						let tempObj = JSON.parse(emptyStr);
						this.createOrdData.push(tempObj);
						emptyStr = "{";
					}
				}
				if( i%4 != 0){
					emptyStr = emptyStr.substr(0,emptyStr.length-1);
					emptyStr = emptyStr + '}';
					let tempObj = JSON.parse(emptyStr);
					this.createOrdData.push(tempObj);
				}
			},

			moveFocusToDose: function(){
        let searchStr = this.inputMed;
        if(searchStr === ""){
          alert("不能为空");
          return;
        }
        
        //check if it is exist
        let existInDb = this.cacheMedData.find(function(p){
            return p.medname === searchStr;
        });

        if(typeof(existInDb)=="undefined"){
            alert("药品库中没有这种药，请重输");
            return;
				}
				
        //check if already exist in table
        let existInTable = this.orderMed1PerObj.find(function(p){
            return p.medname === searchStr;
        });
        if(typeof(existInTable)!="undefined"){
            alert("不能重复添加药品");
            return;
				}
				
				let tempObj = [{
					"inventory": existInDb.count,
					"spec": existInDb.spec,
					"unitprice": existInDb.sellprice,
				}];
				this.infoDisplayData = tempObj;
 
        //move focus to input dose
        this.$refs.mark.$el.querySelector('input').focus();
      },

			postToTb () {
				let searchStr = this.inputMed;
        if(searchStr === ""){
          alert("不能为空");
          this.$refs.mark1.$el.querySelector('input').focus();
          return;
        }
        
        //check if it is exist
        let existInDb = this.cacheMedData.find(function(p){
            return p.medname === searchStr;
        });
        if(typeof(existInDb)=="undefined"){
            alert("药品库中没有这种药，请重输");
            this.$refs.mark1.$el.querySelector('input').focus();
            return;
        }

        //check if already exist in table
        let existInTable = this.orderMed1PerObj.find(function(p){
            return p.medname === searchStr;
        });
        if(typeof(existInTable)!="undefined"){
            alert("不能重复添加药品");
            this.$refs.mark1.$el.querySelector('input').focus();
            return;
				}
				
				//update order med cache
				this.orderMed1PerObj.push({
					medname: this.inputMed,
					count: this.inputDose,
					baseprice: existInDb.baseprice,
					sellprice: existInDb.sellprice
				})

				this.disPlayToTb();
				if(this.orderCount === '')
          this.orderCount = 1;
				this.$refs.mark1.$el.querySelector('input').focus();
				this.inputDose = 1;
			},

			//获取当前时间，格式YYYY-MM-DD
      getNowFormatDate() {
				var date = new Date();
				var seperator1 = "/";
				var year = date.getFullYear();  //年
				var month = date.getMonth() + 1;   //月
				var strDate = date.getDate();   //日
				if (month >= 1 && month <= 9) {
					month = "0" + month;
				}
				if (strDate >= 0 && strDate <= 9) {
					strDate = "0" + strDate;
				}
				var currentdate = year + seperator1 + month + seperator1 + strDate;
				return currentdate;
      },

			postOrdToDbSure:function() {
				let mydate = this.getNowFormatDate();

				if(this.createOrdData.length == 0){
					alert("订单为空");
					return;
				}

				var addOrd = [{
					patient: this.patientName,
					orderalias: 'new',
					type: '收入',
					date: mydate,
					med: this.createOrdData,
					dose: this.orderCount,
					total: parseFloat(this.total),
					totalprofit : (parseFloat(this.total) - parseFloat((this.ordBaseTotal * this.orderCount).toFixed(2))).toFixed(2),
          editable: true,
				}];

				return new Promise((resolve, reject) => {
          this.$http.post("/ordapi/order", addOrd).then(response => {
						this.$Message.success('添加成功!');
						this.patientName = '';
						this.inputMed = '';
						this.inputDose = 1;
						this.ordTotal = 0;
						this.ordBaseTotal = 0;
						this.orderCount = '';
						this.total = '';
						this.createOrdData = [];
						this.orderMed1PerObj = [];
						this.infoDisplayData = [];
            resolve();
          }).catch(error => {
            this.$Message.error('修改失败');
            reject(error);
          });
        });
			},

			
			handleSelect(){
				//not sure why this is needed. But if the focus is not set, the focus will not move. Seems if will select itself first
				this.$refs.mark1.$el.querySelector('input').focus();
			},

			showPrint(){
				this.printmodal = true;
			},

			printOrder: function(){
				this.$print(this.$refs.print);
			},

			handleSearch (value) {
				if(value.length < 2){
					this.list = [];
					return;
				}

				let state = this.cacheMedData;
				this.list = state.filter( function (item) {
  				return item.alias.indexOf(value) === 0;
					}
				);
      },

			deleteMed: function(){
				this.deleteNotClick = false;
				//dynamic modify column
				//need to find a better way
				let deleteCol1 = {
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
										this.remove1(params.index)
									}
								}
							},)
						]);
					}
				};
				this.createOrdCol.splice(2,0,deleteCol1);
				let deleteCol2 = {
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
										this.remove2(params.index)
									}
								}
							},)
						]);
					}
				};
				this.createOrdCol.splice(5,0,deleteCol2);
				let deleteCol3 = {
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
										this.remove3(params.index)
									}
								}
							},)
						]);
					}
				};
				this.createOrdCol.splice(8,0,deleteCol3);
				let deleteCol4 = {
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
										this.remove4(params.index)
									}
								}
							},)
						]);
					}
				};
				this.createOrdCol.splice(11,0,deleteCol4);
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
						//alert(JSON.stringify(this.cacheMedData));
						resolve();
					}).catch(error => {
						reject(error);
					});
				});
			},

			deleteAndDisplay(indexToDel){
        this.orderMed1PerObj.splice(indexToDel,1);
        this.disPlayToTb();
      },

      remove1(index){
        var indexToDel = index * 4 + 0;
        this.deleteAndDisplay(indexToDel);
      },

      remove2(index){
        var indexToDel = index * 4 + 1;
        this.deleteAndDisplay(indexToDel);
      },

      remove3(index){
        var indexToDel = index * 4 + 2;
        this.deleteAndDisplay(indexToDel);
			},
			
			remove4(index){
        var indexToDel = index * 4 + 3;
        this.deleteAndDisplay(indexToDel);
      },

		},

		watch: {
      orderMed1PerObj: function(){
        this.ordBaseTotal = 0;
        this.ordTotal = 0;
        for(let item of this.orderMed1PerObj) {
          let basePriceOfMed = item.baseprice;
          let sellPriceOfMed = item.sellprice;
          let medDose = item.count;
          this.ordBaseTotal = parseFloat((this.ordBaseTotal + parseFloat((basePriceOfMed*medDose).toFixed(2))).toFixed(2));
          this.ordTotal = parseFloat((this.ordTotal + parseFloat((sellPriceOfMed*medDose).toFixed(2))).toFixed(2));
          let temp = (this.ordTotal * this.orderCount).toFixed(2);
          temp += ' 元';
          this.total = temp;
        }
      },
      
      orderCount: function(val) {
        if(val != ''){
          this.orderCount = val;
        }
        let temp = (this.ordTotal * this.orderCount).toFixed(2);
        temp += ' 元';
        this.total = temp;
      }, 
		},

		mounted: function() {
			this.getAll();
		},

		created:function(e){
    // 主页添加键盘事件,注意,不能直接在焦点事件上添加回车
			var lett=this;
			document.onkeydown=function(e){
				var key=e.keyCode;
				var altKey = e.altKey;
				if(altKey && key==35){
					lett.showPrint();
				}
			}
		},

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

	.rightInput{
		float: right;
	}

	.emptyTop{
		margin-top:32px;
	}

	.tableSum{
		float: right;
		display: flex;
	}

	.ivu-select-item:hover {
    background: #2e8de6;
}

.ivu-select-item-focus{
	background: #2e8de6;
}


</style>