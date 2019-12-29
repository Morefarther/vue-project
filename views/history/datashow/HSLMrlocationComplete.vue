<template>
  <div style="float: left; width: 100%; height: 590px; text-align: center;overflow-y: auto;">
    <div id="completeOne" style="float: left; width: 100%; height: 350px;"></div>
    <div id="completeOnePercent" style="float: left; width: 100%; height: 350px;"></div>
    <div id="completeMore" style="float: left; width: 100%; height: 350px;"></div>
    <div id="completeMorePercent" style="float: left; width: 100%; height: 350px;"></div>
  </div>
</template>

<script>
  import echarts from '../../../../static/echarts'
  export default {
    name: 'HSLMrlocationComplete',
    data () {
      return {
        echartsOne: '',
        echartsOnePercent: '',
        echartsMore: '',
        echartsMorePercent: '',
        echartsOneData: [],
        echartsMoreData: []
      }
    },
    mounted () {
      // 百分比样式
      const percentOption = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        legend: {
          data: ['match_count', 'mr_count'],
          padding: 40
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            name: 'match_count',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            data: []
          },
          {
            name: 'mr_count',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            data: []
          }]
        }
      // 正常样式
      const option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        legend: {
          data: ['match_count', 'mr_count'],
          padding: 40
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [{
          type: 'inside',
          start: 0,
          end: 10
        }, {
          start: 0,
          end: 10,
          handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '80%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        }],
        series: [
          {
            name: 'match_count',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            data: []
          },
          {
            name: 'mr_count',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            data: []
          }
        ]
      }

      // 异步请求 more数据
      const moreParams = {
        params: {
          tablename: 'sql_lte_match_more_blackhole_h_complete'
        }
      }
      this.$http.get(this.$baseUrl + '/myPostgresql/api/history/complete/', moreParams).then((res) => {
        console.log(res.data)
        this.echartsMoreData = res.data
        this.echartsMore.setOption({
          title: {
            text: 'sql_lte_match_more_blackhole_h_complete'
          },
          xAxis: {
            data: res.data['keys']
          },
          series: [{
            name: 'match_count',
            data: res.data['sql_lte_match_more_blackhole_h_complete_match_count']
          },
            {
              name: 'mr_count',
              data: res.data['sql_lte_match_more_blackhole_h_complete_mr_count']
            }]
        })
        // more 百分比 数据
        var percent = []
        for (var i = 0; i < res.data['sql_lte_match_more_blackhole_h_complete_match_count'].length; i++) {
          percent.push(res.data['sql_lte_match_more_blackhole_h_complete_match_count'][i] / res.data['sql_lte_match_more_blackhole_h_complete_mr_count'][i])
        }
        console.log(percent)
        // one 百分比 样式
        this.echartsMorePercent.setOption({
          title: {
            text: 'match_more_blackhole_h_complete 百分比'
          },
          yAxis: {
            type: 'value',
            max: 1
          },
          xAxis: {
            data: res.data['keys']
          },
          series: [{
            data: percent
          }]
        })
      }).catch((res) => {
        alert('ajax is wrong, connect Adminstrator')
        console.log('ajax is wrong')
        console.log(res)
      })

      // 异步请求 one 数据
      const oneParams = {
        params: {
          tablename: 'sql_lte_match_one_blackhole_h_complete'
        }
      }
      this.$http.get(this.$baseUrl + '/myPostgresql/api/history/complete/', oneParams).then((res) => {
        console.log(res.data)
        this.echartsOneData = res.data
        const tablesName = 'sql_lte_match_one_blackhole_h_complete'
        this.echartsOne.setOption({
          title: {
            text: tablesName
          },
          xAxis: {
            data: res.data['keys']
          },
          series: [{
            name: 'match_count',
            data: res.data[tablesName + '_match_count']
          },
            {
              name: 'mr_count',
              data: res.data[tablesName + '_mr_count']
            }]
        })
        // one 百分比 数据
        var percent = []
        for (var i = 0; i < res.data[tablesName + '_match_count'].length; i++) {
          percent.push(res.data[tablesName + '_match_count'][i] / res.data[tablesName + '_mr_count'][i])
        }
        // one 百分比 样式
        this.echartsOnePercent.setOption({
          title: {
            text: tablesName + '百分比'
          },
          yAxis: {
            type: 'value',
            max: 1
          },
          xAxis: {
            data: res.data['keys']
          },
          series: [{
            data: percent
          }]
        })
      }).catch((res) => {
        alert('ajax is wrong, connect Adminstrator')
        console.log('ajax is wrong')
        console.log(res)
      })

      this.$nextTick(() => {
        this.echartsOne = echarts.init(document.getElementById('completeOne'))
        this.echartsOnePercent = echarts.init(document.getElementById('completeOnePercent'))
        this.echartsMore = echarts.init(document.getElementById('completeMore'))
        this.echartsMorePercent = echarts.init(document.getElementById('completeMorePercent'))

        this.echartsOne.setOption(option)
        this.echartsOnePercent.setOption(percentOption)
        this.echartsMore.setOption(option)
        this.echartsMorePercent.setOption(percentOption)
      })
    }
  }
</script>

<style scoped>

</style>
