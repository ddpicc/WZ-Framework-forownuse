<template>
	<div class="animated fadeIn">
		<Row>
			<Col :md="24" >
				<div class="doc-header">
					<p> Status </p>
				</div>
		
				<div style="" class="doc-content">
					<Row  :gutter="16">
      			<Col :xs="24" :sm="24" :md="8" :lg="8">
							<Table size="small" border :columns="columns7" :data="data6"></Table>
						</Col>
						<Col  :xs="24" :sm="24" :md="16" :lg="16" >
							<p> Status </p>
							<Divider />
							
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
					columns7: [],
					data6: []
				}
			}
    }
</script>

<style scoped>

</style>