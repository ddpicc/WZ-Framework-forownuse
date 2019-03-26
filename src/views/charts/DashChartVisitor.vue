<template>
  <Col :span="24">
    <chart :options="option" class="echarts" id="chart" theme="macarons" autoResize> </chart>
  </Col>
</template>

<style scoped>
.echarts {
  border-radius:4px;    
  height: 250px;
  width: 100%;
}
</style>

<script>
	export default {
    data() {   
      return {
        option : {}
      };
    },

    methods: {
      loadMonthChart: function() {
        let _totalFstMon = 0.00;
        let _profitFstMon = 0.00;

        let _totalSecMon = 0.00;
        let _profitSecMon = 0.00;

        let _totalTrdMon = 0.00;
        let _profitTrdMon = 0.00;

        let nowMonth = new Date().getMonth()+1;
        let firstMonth = (nowMonth-2) % 12;
        if(firstMonth<10)
          firstMonth = '0' + firstMonth;
        let secondMonth = (nowMonth-1) % 12;
        if(secondMonth<10)
          secondMonth = '0' + secondMonth;
        let thirdMonth = nowMonth % 12;
        if(nowMonth<10)
          thirdMonth = '0' + nowMonth;
        this.$http.get("/ordapi/getOrdinThreeMonth").then(function (data) {
          for(let item of data.body) {
            let tempMon = item.date.split('/')[1];
            tempMon = parseInt(tempMon);
            firstMonth = parseInt(firstMonth);
            secondMonth = parseInt(secondMonth);
            thirdMonth = parseInt(thirdMonth);
            switch(tempMon){
              case firstMonth:
                _totalFstMon = _totalFstMon + item.total;
                _profitFstMon = _profitFstMon + item.totalprofit;
                break;
              case secondMonth:
                _totalSecMon = _totalSecMon + item.total;
                _profitSecMon = _profitSecMon + item.totalprofit;
                break;
              case thirdMonth:
                _totalTrdMon = _totalTrdMon + item.total;
                _profitTrdMon = _profitTrdMon + item.totalprofit;
                break;
            }  
          }
          _totalFstMon = _totalFstMon.toFixed(2);
          _profitFstMon = _profitFstMon.toFixed(2);
          _totalSecMon = _totalSecMon.toFixed(2);
          _profitSecMon = _profitSecMon.toFixed(2);
          _totalTrdMon = _totalTrdMon.toFixed(2);
          _profitTrdMon = _profitTrdMon.toFixed(2);
          this.$nextTick( () => {
            this.option = {
              title: {
                text: '最近12个月收入情况',
              },
              tooltip: {
                  trigger: 'axis',
              },
              legend: {
                  data:['收入','利润']
              },
              toolbox: {
                  show : true,
                  feature : {
                      mark : {show: true},
                      dataView : {show: true, readOnly: false},
                      magicType : {show: true, type: ['line', 'bar']},
                      restore : {show: true},
                      saveAsImage : {show: true}
                  }
              },
              calculable : true,
              xAxis : [
                  {
                      type : 'category',
                      boundaryGap : false,
                      data : [(nowMonth-2)+'月', (nowMonth-1)+'月', nowMonth+'月' ]
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
                  data:[_totalFstMon,_totalSecMon,_totalTrdMon],
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
                  name:'利润',
                  type:'line',
                  data:[_profitFstMon,_profitSecMon,_profitTrdMon],
                  markLine : {
                    data : [
                      {type : 'average', name : '平均值'}
                    ]
                  }
                }
              ]
            }
          })
        })
      }
    },

    mounted: function () {
      this.loadMonthChart();
		}
	}
  
    

</script>