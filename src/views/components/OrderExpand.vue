<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row :gutter="16">
    	<Col span="4">
        <p>姓名：{{row.patient}}</p>
			</Col>
      <Col span="4">
        <p>性别： {{row.sex}}</p>
      </Col>
      <Col span="4">
        <p>年龄： {{row.age}}</p>
      </Col>
      <Col span="12">
        <p>症状：{{row.comment}}</p>
      </Col>
    </Row>
    <br>
		<Row :gutter="16" v-for="item in row.med" :key="item.id">
        <Col span="6">
            <div>{{item.medname1}}&nbsp;&nbsp;{{item.count1}}</div>
        </Col>
        <Col span="6">
            <div>{{item.medname2}}&nbsp;&nbsp;{{item.count2}}</div>
        </Col>
        <Col span="6">
            <div>{{item.medname3}}&nbsp;&nbsp;{{item.count3}}</div>
        </Col>
        <Col span="6">
            <div>{{item.medname4}}&nbsp;&nbsp;{{item.count4}}</div>
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