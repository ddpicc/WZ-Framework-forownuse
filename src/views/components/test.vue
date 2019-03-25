<template>
    <Row>
        <Col :md="24" :sm="24">
            <DatePicker type="daterange" transfer="true" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
        </Col>
    </Row>
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