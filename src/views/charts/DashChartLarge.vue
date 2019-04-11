<template>
  <Col :span="24">
    <chart :options="option" class="echarts" id="chart" theme="macarons" autoResize> </chart>
  </Col>

</template>

<style scoped>
.echarts {
  height: 400px;
  width: 100%;

}
</style>

<script>
	var last30days = [];
	var last30daysIncome = [];
	var last30daysNum = [];
	export default {
    data() {   
      return {
        option : {}
      }
    },

    methods: {
      getYearMonthIndex(nowMonth, nowYear, count){
        nowMonth = nowMonth - count;
        if(nowMonth < 1)
          nowYear = nowYear - 1;
        nowMonth = (nowMonth + 12) % 12;
        if(nowMonth == 0)
          nowMonth = '12';
        if (nowMonth >= 1 && nowMonth <= 9) {
					nowMonth = "0" + nowMonth;
        }
        return nowYear + '/' + nowMonth;
      },

      loadMonthChart: function() {
        return new Promise((resolve, reject) => {
          var end = last30days[0];
					var start = last30days[29];
          this.$http.get('/ordapi/getLast30Days', {
    				params: {
        			startDate: start,
        			endDate: end
    				}
					}).then(response => {
            this.$nextTick( () => {
            this.option = {
              title: {
                text: '最近30天',
              },
              tooltip: {
                  trigger: 'axis',
              },
              legend: {
                  data:['收入','人数']
              },
              toolbox: {
                  show : true,
                  feature : {
                      mark : {show: true},
                      dataView : {show: true, readOnly: false},
                      magicType : {show: true, type: ['line', 'bar']},
                      restore : {show: true},
                      saveAsImage : {show: false}
                  }
              },
              calculable : true,
              xAxis : [
                  {
                      type : 'category',
                      boundaryGap : false,
                      data : last30days
                  }
              ],
              yAxis : [
                  {
                      type : 'value'
                  }
              ],
              series: [
                {
                  name:'收入',
                  type: 'line',
                  data:[                  ],
                  markPoint : {
                    data : [
                      {type : 'max', name: '最大值'},
                      {type : 'min', name: '最小值'}
                    ]
                  },
                  markLine : {
                    data : [
                      {type : 'average', name: '平均值'}
                    ]
                  }
                },
                {
                  name:'人数',
                  type:'line',
                  data:[                        ],
                  markLine : {
                    data : [
                      {type : 'average', name : '平均值'}
                    ]
                  }
                }
              ]
            }
          })
						resolve();
					}).catch(error => {
						reject(error);
					});
        })
      }
    },

    mounted: function () {
      alert(new Date(new Date().setDate(new Date().getDate()-3)).getDate());
      for(var i = 0;i<30;i++)
			{ 
				last30days.push(new Date(new Date().setDate(new Date().getDate()-i)).toLocaleDateString());
			}
			this.loadMonthChart();

		}
	}
  
    

</script>