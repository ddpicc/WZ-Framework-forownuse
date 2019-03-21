<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row>
    	<Col span="24">
          <h6>{{ row.patient }}</h6>
			</Col>
    </Row>
		<Row :gutter="16" v-for="item in row.med" :key="item.id">
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
</template>
<script>
    export default {
        props: {
            row: Object
        }
    };
</script>