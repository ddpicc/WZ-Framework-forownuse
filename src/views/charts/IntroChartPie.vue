<template>
  <Row>
    <Col  :xs="24" :sm="12" :md="12" :lg="12" >
      <chart :options="option1" class="echarts" id="chart" theme="macarons" autoResize> </chart>
    </Col>
    <Col  :xs="24" :sm="12" :md="12" :lg="12" >
      <chart :options="option2" class="echarts" id="chart" theme="macarons" autoResize> </chart>
    </Col>
  </Row>
</template>

<style scoped>
  .echarts {
    height: 300px;
    width: 100%;
    border-radius: 25px;
  }

  canvas{
    margin-top:50px !important;
  }
</style>

<script>

export default {
  data: function () {   
    return {
      option1: {
        
      },
      option2: {}
    }
  },

  methods: {
    loadIncomePie: function(){
      return new Promise((resolve, reject) => {
        this.$http.get('/ordapi/getCurrenDay').then(response => {
          this.$nextTick( () => {
            alert(JSON.stringify(response.data));
            for(let item of response.data){
              
            }
            this.option1 = {
              title : {
                text: '当天收入',
                x:'center'
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                x : 'center',
                y : 'bottom',
                data:['vue 2976','webpack 1092','node 241','css 59']
              },
              toolbox: {
                show : true,
                feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {
                    show: true,
                    type: ['pie', 'funnel']
                  },
                  restore : {show: true},
                  saveAsImage : {show: true}
                }
              },
              calculable : true,
              series : [
                {
                  name:'收入来源',
                  type:'pie',
                  radius : [30, 110],
                  center : ['55%', '55%'],
                  data:[
                    {value:300, name:'vue 2976'},
                    {value:124, name:'webpack 1092'},
                    {value:54, name:'node 241'},
                    {value:899, name:'css 59'},
                  ]
                }
              ]
            },
            this.option2 = {
              title : {
                text: '当天利润',
                x:'center'
              },
              tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              legend: {
                x : 'center',
                y : 'bottom',
                data:['vue 2976','webpack 1092','node 241','css 59']
              },
              toolbox: {
                show : true,
                feature : {
                  mark : {show: true},
                  dataView : {show: true, readOnly: false},
                  magicType : {
                      show: true,
                      type: ['pie', 'funnel']
                  },
                  restore : {show: true},
                  saveAsImage : {show: true}
                }
              },
              calculable : true,
              series : [
                {
                  name:'利润来源',
                  type:'pie',
                  radius : [30, 110],
                  center : ['55%', '55%'],
                  data:[
                      {value:300, name:'vue 2976'},
                      {value:124, name:'webpack 1092'},
                      {value:54, name:'node 241'},
                      {value:899, name:'css 59'},
                  ]
                }      
              ]
            }
          })
          resolve();
        })
      })
    }
  },


  mounted: function () {      
    this.loadIncomePie();
  }
} 
</script>