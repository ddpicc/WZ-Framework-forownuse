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
						<Button type="success" size="small" v-if="outerNotClick" @click="modal1 = true">搜索</Button>
						<Button type="success" size="small" v-if="outerNotClick" @click="outerDb">出库</Button>
						<Button type="success" size="small" :disabled="isDisabled" v-if="!outerNotClick" @click="outerDbSure">出库</Button>
						<Button type="success" size="small" v-if="!outerNotClick" @click="outerDbCancal">取消</Button>
					</div>
				</div>

				<div style="" class="doc-content">
					<Table size="small" border ref="selectionTB" :columns="orderCol" :data="orderData" @on-selection-change="handleSelectChange"></Table>
				</div>
			</Col>
		</Row>
  </div>
</template>

<script>
  import orderExpandRow from './OrderExpand.vue';
	export default {
    components: { orderExpandRow },
		data () {
			return {
				transactiontype: '处方',
        outerNotClick: true,
        isDisabled: true,
        modal1: false,
				orderCol: [
          {
            type: 'expand',
            width: 20,
            render: (h, params) => {
              return h(orderExpandRow, {
                props: {
                  row: params.row
                }
              })
            }
          },
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
              if(params.row.editable){
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
                    }, '删除'
                  )
                ]);
              }else{
                return h('div', [
                  h('Button', {
                    props: {
                      type: 'success',
                      size: 'small'
                    },
                      on: {
                        click: () => {
                          this.remove(params.index)
                        }
                      }
                    }, '重用'
                  )
                ]);
              }
						}
					}
				],
        orderData: [],
        cacheAllOrder: [],
        cacheSelectedRow: []
			}
		},
		methods: {
			remove (index) {
        this.$Modal.confirm({
          content: '此操作将永久删除该处方, 是否继续?',
          onOk: ()=>{
            let tempObj = Object.assign({}, this.orderData[index]);
            let deleteId = tempObj['_id'];
            return new Promise((resolve, reject) => {
              this.$http.delete(`/ordapi/order/${deleteId}`).then(
                response => {
                  this.$Message.success('删除成功!');
                  this.getAll();
                  resolve();
                }
              ).catch(error => {
                this.$Message.error('删除失败');
                reject(error);
              });
            });
          },
          onCancel: ()=>{
            this.$Message.info('已取消删除');
          }
        });
				//this.data6.splice(index, 1);
      },

      handleSelectChange: function(selection){
        if(selection.length == 0){
          this.isDisabled = true;}
        else{
          this.isDisabled = false;}
        this.cacheSelectedRow = selection;
      },

			toLoading () {
        let newary = this.cacheAllOrder.filter((item) => item.editable == true);
        this.orderData = newary;
			},

			outerDb: function(){
        //change index column to selection column
				let objCol = {
          type: 'selection',
          width: 40,
          align: 'center'
				};
				this.orderCol.splice(1,1,objCol);
        this.outerNotClick = false;
        
        //update table
        let editableOrder = this.cacheAllOrder.filter((item) => item.editable == true);
        this.orderData = editableOrder;
			},

			outerDbSure: function(){
        alert(JSON.stringify(this.cacheSelectedRow));
			},

			outerDbCancal: function(){
				let objCol = {
					type: 'index',
					width: 40,
          align: 'center'
				};
				this.orderCol.splice(1,1,objCol);
        this.outerNotClick = true;
        //clear selection
        this.$refs.selectionTB.selectAll(false);
      },

      ok: function(){
        alert(kkk);
      },

      cancel: function(){

      },
    
    // 获取全部数据
    	getAll: function() {
				return new Promise((resolve, reject) => {
					this.$http.get("/ordapi/order").then(response => {
            this.cacheAllOrder = response.data;
						this.orderData = this.cacheAllOrder;
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
	.doc-header .actionMenu{
		float: right;

	}

</style>
								


