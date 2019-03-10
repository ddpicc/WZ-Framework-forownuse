<template>
  <div class="animated fadeIn">
		<Row>
			<Col :md="24" >
				<div class="doc-header">
					<RadioGroup v-model="transactiontype" size="small">
						<Radio label="处方"></Radio>
						<Radio label="支出"></Radio>
						<Radio label="显示全部"></Radio>
					</RadioGroup>
					<div class="actionMenu">
						<Button type="success" size="small" v-if="outerNotClick" @click="toLoading">添加</Button>
						<Button type="success" size="small" v-if="outerNotClick" @click="toLoading">搜索</Button>
						<Button type="success" size="small" v-if="outerNotClick" @click="outerDb">出库</Button>
						<Button type="success" size="small" v-if="!outerNotClick" @click="outerDbSure">出库</Button>
						<Button type="success" size="small" v-if="!outerNotClick" @click="outerDbCancal">取消</Button>
					</div>
				</div>

				<div style="" class="doc-content">
					<Table size="small" border :columns="orderCol" :data="orderData"></Table>
				</div>
			</Col>
		</Row>
  </div>
</template>

<script>
	export default {
		data () {
			return {
				transactiontype: '处方',
				outerNotClick: true,
				orderCol: [
					{
						type: 'index',
						width: 40,
            align: 'center'
          },
					{
						title: '名字',
						key: 'patient',
						align: 'center',
					},
					{
						title: '数量',
						key: 'dose',
						align: 'center'
					},
					{
						title: '总价',
						key: 'total',
						align: 'center'
					},
					{
						title: '日期',
						key: 'date',
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
				orderData: [
					{
            patient: 'John Brown',
            dose: 18,
            total: 5,
            date: '2016-10-03'
          }
				]
			}
		},
		methods: {
			modify (index) {
				alert(this.orderData[index]);
			},

			remove (index) {
				this.orderData.splice(index, 1);
			},

			toLoading () {
				alert("ffffff");
			},

			outerDb: function(){
				let objCol = {
          type: 'selection',
          width: 40,
          align: 'center'
				};
				this.orderCol.splice(0,1,objCol);
				this.outerNotClick = false;
			},

			outerDbSure: function(){

			},

			outerDbCancal: function(){
				let objCol = {
					type: 'index',
					width: 40,
          align: 'center'
				};
				this.orderCol.splice(0,1,objCol);
				this.outerNotClick = true;
			}


		}
	}
</script>

<style scoped>
	.doc-header .actionMenu{
		float: right;

	}

</style>
								


