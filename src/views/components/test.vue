<template>
	<div class="animated fadeIn">
		<div class="doc-header">
			<Row>
					<Col :md="24" :sm="24">
							<DatePicker type="daterange" transfer="true" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
					</Col>
			</Row>
		</div>
		<div style="background:#eee;padding: 20px">
        <Card :bordered="false">
            <p slot="title">No border title</p>
            <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
        </Card>
    </div>
	</div>
</template>
<script>
    export default {
        
    }
</script>

<style scoped>
  .ivu-picker-panel-content ivu-picker-panel-content-left {
  width: 100px; 
}
</style>