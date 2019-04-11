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
							</div>
        		</Panel>
        		<Panel name="4">
            	定时任务配置
							<div slot='content'>
            		<Tag v-for="item in count" :key="item" :name="item" closable @on-close="handleClose2">标签{{ item + 1 }}</Tag>
    						<Button icon="ios-add" type="dashed" size="small" @click="handleAdd">添加标签</Button>
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
					count: [0, 1, 2],
					value1: '1',
					value2: 0,
					value3: 0,
					value4: 0
				}
      },
			methods: {
				handleAdd () {
					if (this.count.length) {
						this.count.push(this.count[this.count.length - 1] + 1);
					} else {
						this.count.push(0);
					}
				},
				handleClose2 (event, name) {
					const index = this.count.indexOf(name);
					this.count.splice(index, 1);
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