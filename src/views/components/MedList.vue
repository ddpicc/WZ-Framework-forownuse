<template>
    <div class="animated fadeIn">

    <Row>
        <Col :md="24" >
            <div  class="doc-header">
                <RadioGroup v-model="medtype" size="small">
                    <Radio label="免煎药"></Radio>
                    <Radio label="草药"></Radio>
                </RadioGroup>
            </div>

            <div style="" class="doc-content">
                <Input search placeholder="输入内容搜索..." />
                <Table size="small" border :columns="columns7" :data="data6"></Table>
            </div>
            <Button type="success" long @click="toLoading">添加</Button>
        </Col>
    </Row> 




</div>
</template>

<script>
 export default {
        data () {
            return {
                medtype: '免煎药',
                columns7: [
                    {
                        title: '药品名称',
                        key: 'medname',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '别名',
                        key: 'alias',
                        align: 'center'
                    },
                    {
                        title: '规格',
                        key: 'spec',
                        align: 'center'
                    },
                    {
                        title: '数量',
                        key: 'count',
                        align: 'center'
                    },
                    {
                        title: '进价',
                        key: 'baseprice',
                        align: 'center'
                    },
                    {
                        title: '零售价',
                        key: 'sellprice',
                        align: 'center'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.index)
                                        }
                                    }
                                }, '显示'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data6: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park'
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'London No. 1 Lake Park'
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park'
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park'
                    }
                ]
            }
        },
        methods: {
            show (index) {
                this.$Modal.info({
                    title: 'User Info',
                    content: `Name：${this.data6[index].name}<br>Age：${this.data6[index].age}<br>Address：${this.data6[index].address}`
                })
            },

            remove (index) {
                this.data6.splice(index, 1);
            },

            toLoading () {
                alert("ffffff");
            },
        }
    }

</script>