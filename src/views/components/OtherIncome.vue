<template>
	<div class="animated fadeIn">
		<Row>
			<Col :md="24" >
				<div class="doc-header">
					<p> 药丸记录 </p>
				</div>
		
				<div style="" class="doc-content">
					<Row :gutter="6">
						<Col span="3">
							<Select v-model="entryType">
								<Option value="药丸">药丸</Option>
								<Option value="其它">其它</Option>
							</Select>
						</Col>
      			<Col span="7">
							<Input v-model="entryName" border placeholder="输入名称..."/>
						</Col>
						<Col span="3">
							<Input v-model="entryAmount" border placeholder="输入价钱..."/>
						</Col>
						<Col span="4">
							<DatePicker type="date" :options="options" v-model="dateValue" placeholder="选择日期"></DatePicker>
						</Col>
						<Col span="6">
							<Input v-model="entryComment" placeholder="备注..."/>
						</Col>
						<Col span="1">
						<Button type="success" @click="postToTb">+</Button>
					</Col>
					</Row>
					<br>
					<Row>
      			<Col>
         			<Table :loading="loading" size="small" border :columns="tbCol" :data="tbData"></Table>
						</Col>
					</Row>
				</div>
			</Col>
		</Row>
  </div>
</template>
<script>
	import { dateToString } from 'utils/index';
	export default {
		data () {
			return {
				entryType: "药丸",
				entryName: "",
				dateValue: "",
				entryAmount: 0.00,
				entryComment: "",
				options: {
					disabledDate (date) {
						return date && (date.valueOf() > Date.now() || date.valueOf() < 1559260800000);
					}
				},
				tbCol: [
					{
						title: '名称',
						key: 'name',
						align: 'center',
						render: (h, params) => {
							return h('div', [
								h('strong', params.row.name)
							]);
						}
					},
					{
						title: '类型',
						key: 'type',
						align: 'center'
					},
					{
						title: '价钱',
						key: 'amount',
						align: 'center'
					},
					{
						title: '日期',
						key: 'date',
						align: 'center'
					},
					{
						title: '备注',
						key: 'comment',
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
										type: 'success',
										size: 'small'
									},
										on: {
											click: () => {
												this.handelOut(params.index)
											}
										}
									}, '出库')
							]);
						}
					}
				],
				tbData: []
			}
		},

		methods: {
			postToTb: function(){
				this.dateValue = dateToString(this.dateValue);
				let tempObj = {
					"name" : this.entryName,
					"type" : this.entryType,
					"date" : this.dateValue,
					"amount" : this.entryAmount,
					"comment" : this.entryComment,
					"editable" : true
				}
				return new Promise((resolve, reject) => {
          this.$http.post("/othincomeapi/addIncome", tempObj).then(
            response => {
            this.$Message.success('添加成功!');
            this.getAll();
            resolve();
          }).catch(error => {
            this.$Message.error('添加失败');
            reject(error);
          });
        });
			},

			// 获取全部数据
    	getAll: function() {
        this.loading = true;
				return new Promise((resolve, reject) => {
					this.$http.get("/othincomeapi/getAllIncome",).then(response => {
            this.tbData = response.data;
            this.loading = false;
						resolve();
					}).catch(error => {
						reject(error);
					});
				});
			}
		},

		mounted: function() {
			this.getAll();
		}
	}
</script>

<style scoped>

</style>