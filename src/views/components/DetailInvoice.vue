<template>
	<div class="animated fadeIn">
		<Row>
			<Col :md="24" >
				<div class="doc-header">
					详细账单
					<div class="actionMenu">
						<Button type="success" size="small" @click="actionGenerate">生成</Button>
					</div>
				</div>
		
				<div style="" class="doc-content">
					<Row  :gutter="16">
      			<Col :xs="24" :sm="24" :md="24" :lg="24">
         			<DatePicker v-model="dateRange" split-panels type="daterange" :options="options3" size="large" placement="bottom-end" placeholder="Select date" style="width: 100%"></DatePicker>
								<Card>
        					<div >
            				<h4 style="text-align:center">详细统计</h4>
										  <ul>
												<li><div class="list-nap1">行驶12公里</div><div class="list-line"></div><div class="list-con1">25元</div></li>
												<li><div class="list-nap1">时长30分钟</div><div class="list-line"></div><div class="list-con1">5元</div></li>
												<li><div class="list-nap1">高速费/停车费</div><div class="list-line"></div><div class="list-con1">30元</div></li>
												<li><div class="list-nap1">远途费</div><div class="list-line"></div><div class="list-con1">6元</div></li>
												<li><div class="list-nap1">个人支付</div><div class="list-line"></div><div class="list-con1">30元</div></li>
												<li><div class="list-nap1">企业支付</div><div class="list-line"></div><div class="list-con1">10元</div></li>
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
					options3: {
						disabledDate (date) {
							return date && (date.valueOf() > Date.now() || date.valueOf() < 1559260800000);
						}
					},
				}
			},

			methods: {
				actionGenerate: function(){
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
					this.$http.get("/ordapi/getOrderStatement", {params:range})
					.then(
						function(response) {
							alert((response.data).length);
						},
						function() {
							console.log("error");
						}
					);
				},
				calculateAndAnalysis: function(obj){
					let totalIncome = totalOutcome = 0;
					let incomeMian = incomeXi = incomeWan = incomeCao = 0;
					let profitMian = profitXi = profitWan = profitCao = 0;
					for(let item of obj){
						if(item.medType == "免煎药"){
							incomeMian = parseFloat((incomeMian + item.total).toFixed(2));
							profitMian = parseFloat((profitMian + item.totalprofit).toFixed(2));
						} 
						else if(item.medType == "草药"){
							incomeCao = parseFloat((incomeCao + item.total).toFixed(2));
							profitCao = parseFloat((profitCao + item.totalprofit).toFixed(2));
						}
						else if(item.medType == "西药"){
							incomeXi = parseFloat((incomeXi + item.total).toFixed(2));
							profitXi = parseFloat((profitXi + item.totalprofit).toFixed(2));
						}

					}
				}
			}
    }
</script>

<style scoped>
	.doc-header .actionMenu{
		float: right;
	}
  ul li div{display:inline-block;}
  .list-line{border-top:1px dashed #d8d8d8;position:absolute;top:11px;margin: 0 5px;width: 75%;}
  .list-con1{ position: absolute;right: 0px;padding: 0 5px;z-index: 100;text-align: right;background: #fff;padding-right: 80px;}


</style>