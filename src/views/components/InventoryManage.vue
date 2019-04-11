<template>
	<div class="animated fadeIn">
		<Row>
			<Col :md="24" >
				<div class="doc-header">
					<p> Status </p>
				</div>

				<div style="" class="doc-content">
					<Collapse v-model="value1">
        		<Panel name="1">
            	检查免煎药
							<div slot='content'>
								<Row>
        					<Col span="18">
										<Slider v-model="value2" :min=0 :max=8></Slider>
        					</Col>
        					<Col span="6">
										<Button type="success" size="large" class="pannelInline">检查</Button>
        					</Col>
								</Row>
								<br>
								<Table size="small" border :columns="columns7" :data="data6"></Table>								
							</div>
        		</Panel>
						<Panel name="2">
            	检查草药
							<div slot='content'>
            		<Row>
        					<Col span="18">
										<Slider v-model="value3" :min=0 :max=8></Slider>
        					</Col>
        					<Col span="6">
										<Button type="success" size="large" class="pannelInline">检查</Button>
        					</Col>
								</Row>
								<br>
								<Table size="small" border :columns="columns7" :data="data6"></Table>				
							</div>
        		</Panel>
						<Panel name="3">
            	检查其他
							<div slot='content'>
            		<Row>
        					<Col span="18">
										<Slider v-model="value4" :min=0 :max=3></Slider>
        					</Col>
        					<Col span="6">
										<Button type="success" size="large" class="pannelInline">检查</Button>
        					</Col>
								</Row>
								<br>
								<Table size="small" border :columns="columns7" :data="data6"></Table>					
							</div>
        		</Panel>
        		<Panel name="4">
            	定时任务配置
							<div slot='content'>
            		<Tag type="dot" color="success" v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">{{ item }}</Tag>
    						<AutoComplete
									v-model="inputMed"
									@on-search="handleSearch"
									placeholder="input here"
									@on-focus="focus($event)"
									ref="mark1"
									style="width:10%">
									<Option v-for="item in list" :value="item.medname" :key="item._id">{{ item.alias }}    {{item.medname}} </Option>
								</AutoComplete>
								<Button icon="ios-add" @click="handleAdd"></Button>
							</div>
        		</Panel>
    			</Collapse>
				</div>
			</Col>
		</Row>
	</div>
</template>
<script>
    export default {
      data () {
				return {
					count: [],
					value1: '1',
					value2: 2,
					value3: 2,
					value4: 2,
					inputMed: '',
					columns7: [],
					data6: [],
					list: []
				}
      },
			methods: {
				focus(event) {
				//alert(event.currentTarget);
        event.currentTarget.select();
				},

				handleAdd () {
					if(this.count.indexOf(this.inputMed) === -1)
						this.count.push(this.inputMed);
				},

				handleClose2 (event, name) {
					const index = this.count.indexOf(name);
					this.count.splice(index, 1);
				},

				handleSearch: function() {

				}
			}  
    }
</script>

<style scoped>
	.doc-header .actionMenu{
		float: right;
	}

	.pannelInline{
		float: right;
	}
</style>