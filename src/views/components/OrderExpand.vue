<style scoped>
    .expand-row{
        margin-bottom: 16px;
    }
</style>
<template>
    <div>
        <Row class="expand-row">
            <Col span="8">
                <span class="expand-key">Job: </span>
                <span class="expand-value">{{ row.patient }}</span>
                <div v-for="item in row.med" :key="item.id">
                    <span style="width: 20%" > {{item.medname1}} </span>   {{item.count1}}  {{item.medname2}}   {{item.count2}}
                </div>
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