<template>
	<div class="animated fadeIn">
		<Row>
			<Col :md="24" >
				<Card>
          <h3>A high quality UI Toolkit based on Vue.js</h3>
        </Card>
				<Card>
            <h3>A high quality UI Toolkit based on Vue.js</h3>
        </Card>
				<Card>
            <p>Content of no border type. Content of no border type. Content of no border type. Content of no border type. </p>
        </Card>
			</Col>
		</Row>
		<Row>
			<div class="outerDiv">
				<Col span="20">
					<div class="outerDiv">div四边设置虚线边框</div>
				</Col>
				<Col span="4">
					<div class="outerDiv">div四边设置虚线边框</div>
				</Col>
			</div>
		</Row>
  </div>
</template>
<script>
    export default {
      data () {
				return {
				}
			}
    }
</script>

<style scoped>
	.outerDiv{
		border:3px solid #000
	}
</style>