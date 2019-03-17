<template>
    <AutoComplete
        v-model="value3"
        :data="data3"
        :filter-method="filterMethod"
        placeholder="input here"
        @on-focus="focus($event)"
        style="width:200px">
    </AutoComplete>
</template>
<script>
    export default {
        data () {
            return {
                value3: '',
                data3: ['Steve Jobs', 'Stephen Gary Wozniak', 'Jonathan Paul Ive']
            }
        },
        methods: {
            filterMethod (value, option) {
                if(!value)
                    return;
                return option.toUpperCase().indexOf(value.toUpperCase()) !== -1;
            },
            focus(event) {
				//alert(event.currentTarget);
                event.currentTarget.select();
			},
        }
    }
</script>
