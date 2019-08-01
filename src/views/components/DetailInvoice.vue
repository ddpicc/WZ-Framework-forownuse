<template>
	<div class="animated fadeIn">
		<Row>
			<Col :md="24" >
				<div class="doc-header">
					详细统计
					<div class="actionMenu">
						<Button type="success" size="small" @click="actionGenerate">生成</Button>
						<Button type="success" size="small" @click="startPrint">打印</Button>
					</div>
				</div>
		
				<div style="" class="doc-content">
					<Row  :gutter="16">
      			<Col :xs="24" :sm="24" :md="24" :lg="24">
         			<DatePicker v-model="dateRange" split-panels type="daterange" :options="options3" size="large" placement="bottom-end" placeholder="Select date" style="width: 100%"></DatePicker>
								<Card>
        					<div v-if="reportDisplay">
            				<h4 style="text-align:center">{{startDay}} --- {{endDay}} 详情</h4>
										  <ul>
												<li><div class="list-nap1">总收入</div><div class="list-line"></div><div class="list-con1">25元</div></li>
												<li><div class="list-nap1">总利润</div><div class="list-line"></div><div class="list-con1">5元</div></li>
												<Divider>收&nbsp;&nbsp;&nbsp;&nbsp;入</Divider>
												<li><div class="list-nap1">草药</div><div class="list-line"></div><div class="list-con1">30元</div></li>
												<li><div class="list-nap1">免煎药</div><div class="list-line"></div><div class="list-con1">6元</div></li>
												<li><div class="list-nap1">西药</div><div class="list-line"></div><div class="list-con1">30元</div></li>
												<li><div class="list-nap1">药丸</div><div class="list-line"></div><div class="list-con1">10元</div></li>
												<li><div class="list-nap1">收入合计</div><div class="list-line"></div><div class="list-con1">10元</div></li>
												<li><div class="list-nap1">平均每天</div><div class="list-line"></div><div class="list-con1">10元</div></li>
												<Divider>利&nbsp;&nbsp;&nbsp;&nbsp;润</Divider>
												<li><div class="list-nap1">草药</div><div class="list-line"></div><div class="list-con1">30元</div></li>
												<li><div class="list-nap1">免煎药</div><div class="list-line"></div><div class="list-con1">6元</div></li>
												<li><div class="list-nap1">西药</div><div class="list-line"></div><div class="list-con1">30元</div></li>
												<li><div class="list-nap1">药丸</div><div class="list-line"></div><div class="list-con1">10元</div></li>
												<li><div class="list-nap1">利润合计</div><div class="list-line"></div><div class="list-con1">10元</div></li>
												<li><div class="list-nap1">平均每天</div><div class="list-line"></div><div class="list-con1">10元</div></li>
												<Divider>病&nbsp;&nbsp;&nbsp;&nbsp;人</Divider>
												<li><div class="list-nap1">总计</div><div class="list-line"></div><div class="list-con1">10人</div></li>
												<li><div class="list-nap1">平均每天</div><div class="list-line"></div><div class="list-con1">10人</div></li>
												<li><div class="list-nap1">小于20岁</div><div class="list-line"></div><div class="list-con1">10人</div></li>
												<li><div class="list-nap1">大于20岁</div><div class="list-line"></div><div class="list-con1">10人</div></li>
												<Divider>其&nbsp;&nbsp;&nbsp;&nbsp;它</Divider>
												<li><div class="list-nap1">煎药次数</div><div class="list-line"></div><div class="list-con1">10次</div></li>
    									</ul>
        					</div>
    						</Card>
						</Col>
					</Row>
				</div>
			</Col>
		</Row>
  </div>
</template>
<script>
    export default {
      data () {
				return {
					dateRange: '',
					startDay: '',
					endDay: '',
					reportDisplay: false,
					options3: {
						disabledDate (date) {
							return date && (date.valueOf() > Date.now() || date.valueOf() < 1559260800000);
						}
					},
				}
			},

			methods: {
				actionGenerate: function(){
					this.reportDisplay = true;
					var tempMon = this.dateRange[0].getMonth()+1;
					if(tempMon < 10)
						tempMon = '0' + tempMon;
					var tempYear = this.dateRange[0].getFullYear();
					var tempDay = this.dateRange[0].getDate();
					if(tempDay < 10)
						tempDay = '0' + tempDay;
					var start = tempYear + '/' + tempMon + '/' + tempDay;
					//alert(start);

					tempMon = this.dateRange[1].getMonth()+1;
					if(tempMon < 10)
						tempMon = '0' + tempMon;
					tempYear = this.dateRange[1].getFullYear();
					tempDay = this.dateRange[1].getDate();
					if(tempDay < 10)
						tempDay = '0' + tempDay;
					var end = tempYear + '/' + tempMon + '/' + tempDay;
					//alert(end);
					var range = {
						startDate: start,
						endDate: end,
					};
					this.startDay = start;
					this.endDay = end;
					var orderObj = [];
					var otherEntryObj = [];
					this.$http.get("/ordapi/getOrderStatement", {params:range})
					.then(
						function(response) {
							orderObj = response.data;
							this.$http.get("/othentryapi/getOtherEntryRange", {params:range}).then(response => {
								otherEntryObj = response.data;
								this.calculateAndAnalysis(orderObj,otherEntryObj);
							})							
						}
					);
				},

				calculateAndAnalysis: function(orderObj,otherEntryObj){
					//alert(orderObj.length);
					//alert(otherEntryObj.length);
					let totalIncome = totalOutcome = 0;
					let incomeMianjian = incomeXiyao = incomeYaowan = incomeCaoyao = 0;
					let profitMianjian = profitXiyao = profitYaowan = profitCaoyao = 0;
					for(let item of orderObj){
						if(item.medType == "免煎药"){
							incomeMianjian = parseFloat((incomeMianjian + item.total).toFixed(2));
							profitMianjian = parseFloat((profitMianjian + item.totalprofit).toFixed(2));
						} 
						else if(item.medType == "草药"){
							incomeCaoyao = parseFloat((incomeCaoyao + item.total).toFixed(2));
							profitCaoyao = parseFloat((profitCaoyao + item.totalprofit).toFixed(2));
						}
						else if(item.medType == "西药"){
							incomeXiyao = parseFloat((incomeXiyao + item.total).toFixed(2));
							profitXiyao = parseFloat((profitXiyao + item.totalprofit).toFixed(2));
						}

					}
				},

				startPrint: function(){

				}
			}
    }
</script>

<style scoped>
	.doc-header .actionMenu{
		float: right;
	}
  ul li div{display:inline-block;padding-left: 10px;}
  .list-line{border-top:1px solid #d8d8d8;top:11px;margin: 0 5px;width: 90%;}
  .list-con1{ position: absolute;right: 0px;padding: 0 5px;z-index: 100;text-align: right;background: #fff;padding-right: 10px;}



</style>