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
						<Button type="success" size="small" @click="toLoading">添加</Button>
						<Button type="success" size="small" @click="searchCancal">取消</Button>
					</div>
				</div>

				<div style="" class="doc-content">
					<Table size="small" border :columns="createOrdCol" :data="createOrdData"></Table>
				</div>
			</Col>
		</Row>
	</div>
</template>

<script>
	export default {
		data () {
			return {
				medtype: '免煎药',
				createOrdCol: [
					{
						title: '名称',
						key: 'medname',
						align: 'center',
					},
					{
						title: '数量',
						key: 'mednumber',
						align: 'center'
					},
					{
				    title: '',
            key: 'action',
            width: 30,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Icon', {
									props: {
										type: 'md-trash',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.index)
										}
									}
								},)
							]);
						}
          },
          {
						title: '名称',
						key: 'medname',
						align: 'center',
					},
					{
						title: '数量',
						key: 'mednumber',
						align: 'center'
					},
					{
				    title: '',
            key: 'action',
            width: 30,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Icon', {
									props: {
										type: 'md-trash',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.index)
										}
									}
								},)
							]);
						}
          },
          {
						title: '名称',
						key: 'medname',
						align: 'center',
					},
					{
						title: '数量',
						key: 'mednumber',
						align: 'center'
					},
					{
				    title: '',
            key: 'action',
            width: 30,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Icon', {
									props: {
										type: 'md-trash',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.index)
										}
									}
								},)
							]);
						}
          },
          {
						title: '名称',
						key: 'medname',
						align: 'center',
					},
					{
						title: '数量',
						key: 'mednumber',
						align: 'center'
					},
					{
				    title: '',
            key: 'action',
            width: 30,
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('Icon', {
									props: {
										type: 'md-trash',
										size: 'small'
									},
									on: {
										click: () => {
											this.remove(params.index)
										}
									}
								},)
							]);
						}
					}
				],
				createOrdData: [
					{
						medname: '蜜款冬花',
						mednumber: 3,
					}
				],

			}
		},
		methods: {
			remove (index) {
				alert("fffff");
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