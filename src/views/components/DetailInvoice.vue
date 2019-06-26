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
         			<DatePicker v-model="dateRange" type="daterange" size="large" placement="bottom-end" placeholder="Select date" style="width: 100%"></DatePicker>
								<Card>
        					<div style="text-align:center">
            				<h4>详细统计</h4>
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
				}
			}
    }
</script>

<style scoped>
	.doc-header .actionMenu{
		float: right;
	}
</style>