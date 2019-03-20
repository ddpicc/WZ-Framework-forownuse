<template>
    <div class="demo-split">
        <Split v-model="split2" mode="vertical">
            <div slot="top" class="demo-split-pane">
                Top Pane
            </div>
            <div slot="bottom" class="demo-split-pane">
                Bottom Pane
            </div>
        </Split>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                split2: 0.5
            }
        },
    }
</script>
<style>
    .demo-split{
        height: 200px;
        border: 1px solid #dcdee2;
    }
    .demo-split-pane{
        padding: 10px;
    }
</style>