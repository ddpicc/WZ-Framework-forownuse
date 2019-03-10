<template>
	<div class="animated fadeIn">
		<Row>
			<Col :md="24" >
				<div class="doc-header">
					<RadioGroup v-model="medtype" size="small">
						<Radio label="免煎药"></Radio>
						<Radio label="草药"></Radio>
					</RadioGroup>
					<div class="actionMenu">
						<Button type="success" size="small" v-if="searchNotClick" @click="toLoading">添加</Button>
						<Button type="success" size="small" v-if="searchNotClick" @click="searchMed">搜索</Button>
						<Button type="success" size="small" v-if="!searchNotClick" @click="searchCancal">取消</Button>
					</div>
				</div>

				<div style="" class="doc-content">
					<Table size="small" border :columns="columns7" :data="data6"></Table>
				</div>
			</Col>
		</Row>

		<Modal v-model="modalModify" title="修改药品" @on-ok="ok" @on-cancel="cancel">
			<Form ref="formModify" :model="formModify" :rules="ruleModify" :label-width="80" inline>
        <FormItem label="药品名称" prop="medname">
            <Input v-model="formModify.medname" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="别名" prop="alias">
            <Input v-model="formModify.alias" placeholder="Enter your e-mail"></Input>
        </FormItem>
				<FormItem label="类别" prop="medtype">
					<RadioGroup v-model="formModify.medtype" size="large">
						<Radio label="免煎药"></Radio>
						<Radio label="草药"></Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="规格" prop="spec">
            <Input v-model="formModify.spec" placeholder="Enter your e-mail"></Input>
        </FormItem>
				<FormItem label="袋/盒" prop="bagperbox">
            <Input v-model="formModify.bagperbox" placeholder="Enter your e-mail"></Input>
        </FormItem>
				<FormItem label="数量" prop="count">
            <Input v-model="formModify.count" placeholder="Enter your e-mail"></Input>
        </FormItem>
				<FormItem label="进价" prop="baseprice">
            <Input v-model="formModify.baseprice" placeholder="Enter your e-mail"></Input>
        </FormItem>
				<FormItem label="零售价" prop="sellprice">
            <Input v-model="formModify.sellprice" placeholder="Enter your e-mail"></Input>
        </FormItem>
    	</Form>
		</Modal>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				medtype: '免煎药',
				modalModify: false,
				searchNotClick: true,
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
																h('strong', params.row.medname)
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
											title: '袋/盒',
											key: 'bagperbox',
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
																						this.modify(params.index)
																				}
																		}
																}, '修改'),
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
								data6: [],
								formModify: {
                    name: '',
										mail: '',
										city: 'shanghai'
                },
                ruleModify: {
                    name: [
                        { required: true, message: 'Please fill in the user name', trigger: 'blur' }
                    ],
                    mail: [
                        { required: true, message: 'Please fill in the password.', trigger: 'blur' },
                        { type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur' }
                    ]
                }
						}
				},
		methods: {
			modify (index) {
				this.modalModify = true;
				alert(this.data6[index]);
				this.formModify = Object.assign({}, this.data6[index]);
			},

			remove (index) {
				this.data6.splice(index, 1);
			},

			toLoading () {
				if(this.medtype == '草药'){
					alert("hahaha");
				};
				alert("ffffff");
			},

			searchMed: function(){
				this.searchNotClick = false;
			},

			searchCancal: function(){
				this.searchNotClick = true;
			},

			ok () {
                this.$Message.info('Clicked ok');
            },
      cancel () {
                this.$Message.info('Clicked cancel');
      },

			// 获取全部数据
    	getAll: function() {
				return new Promise((resolve, reject) => {
					this.$http.get("/medapi/allmed").then(response => {
						this.data6 = response.data;
						resolve();
					}).catch(error => {
						reject(error);
					});
				});
			}

		},

		watch: {
			medtype: function() {

			}
		},

		mounted: function() {
			this.getAll();
		}

	}
</script>

<style scoped>
	.doc-header .actionMenu{
		float: right;
	}

</style>