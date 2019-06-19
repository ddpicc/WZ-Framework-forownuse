<template>
	<div class="animated fadeIn">
		<Row>
			<Col :md="24" >
				<div class="doc-header">
					<p> 详细账单 </p>
				</div>
		
				<div style="" class="doc-content">
					<Row  :gutter="16">
      			<Col :xs="24" :sm="24" :md="24" :lg="24">
         			<DatePicker v-model="dateRange" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
							<Button type="success" @click="actionGenerate">生成</Button>
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
					alert(this.dateRange);
				}
			}
    }
</script>

<style scoped>

</style>