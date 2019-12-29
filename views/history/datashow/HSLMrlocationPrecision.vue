<template>
    <div style="float: left; width: 100%; height: 590px; text-align: center;overflow-y: auto;">
    <div id="precisionOne" style="float: left; width: 100%; height: 350px;"></div>
    <div id="precisionOnePercent" style="float: left; width: 100%; height: 350px;"></div>
    <div id="precisionMore" style="float: left; width: 100%; height: 350px;"></div>
    <div id="precisionMorePercent" style="float: left; width: 100%; height: 350px;"></div>
  </div>
</template>

<script>
  import echarts from '../../../../static/echarts'
  export default {
    name: 'HSLMrlocationPrecision',
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
      // 普通样式
      const option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        legend: {
          data: ['mr_count', 'delta_dist_50', 'delta_dist_100', 'delta_dist_150', 'delta_dist_other'],
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
            name: 'mr_count',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            data: []
          },
          {
            name: 'delta_dist_50',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            data: []
          },
          {
            name: 'delta_dist_100',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            data: []
          },
          {
            name: 'delta_dist_150',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            data: []
          },
          {
            name: 'delta_dist_other',
            type: 'line',
            smooth: true,
            symbol: 'none',
            sampling: 'average',
            data: []
          }
        ]
        }

      // 百分比样式
      const percentOption = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%']
          }
        },
        legend: {
          data: ['dist_50占比', 'dist_100占比', 'dist_150占比', 'dist_other占比'],
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
          max: 1
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
            name: 'dist_50占比',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: 'dist_100占比',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: 'dist_150占比',
            type: 'bar',
            stack: '总量',
            data: []
          },
          {
            name: 'dist_other占比',
            type: 'bar',
            stack: '总量',
            data: []
          }
        ]
      }

      //
      const moreParams = {
        params: {
          tablename: 'sql_lte_match_more_blackhole_h_precision'
        }
      }
      this.$http.get(this.$baseUrl + '/myPostgresql/api/history/precision/', moreParams).then((res) => {
        console.log(res.data)
        this.echartsMoreData = res.data
        const tableName = 'sql_lte_match_more_blackhole_h_precision'
        this.echartsMore.setOption({
          title: {
            text: tableName
          },
          xAxis: {
            data: res.data['keys']
          },
          series: [{
            name: 'mr_count',
            data: res.data[tableName + '_mr_count']
          },
            {
              name: 'delta_dist_50',
              data: res.data[tableName + '_delta_dist_50']
            },
            {
              name: 'delta_dist_100',
              data: res.data[tableName + '_delta_dist_100']
            },
            {
              name: 'delta_dist_150',
              data: res.data[tableName + '_delta_dist_150']
            },
            {
              name: 'delta_dist_other',
              data: res.data[tableName + '_delta_dist_other']
            }]
        })
        // more 百分比 数据
        var dist_50 = []
        var dist_100 = []
        var dist_150 = []
        var dist_other = []
        for (var i = 0; i < res.data[tableName + '_mr_count'].length; i++) {
          dist_50.push(res.data[tableName + '_delta_dist_50'][i] / res.data[tableName + '_mr_count'][i])
          dist_100.push(res.data[tableName + '_delta_dist_100'][i] / res.data[tableName + '_mr_count'][i])
          dist_150.push(res.data[tableName + '_delta_dist_150'][i] / res.data[tableName + '_mr_count'][i])
          dist_other.push(res.data[tableName + '_delta_dist_other'][i] / res.data[tableName + '_mr_count'][i])
        }
        //  more 百分比 样式
        this.echartsMorePercent.setOption({
          title: {
            text: tableName + '百分比'
          },
          yAxis: {
            type: 'value',
            max: 1
          },
          xAxis: {
            data: res.data['keys']
          },
          series: [
            {
              name: 'dist_50占比',
              data: dist_50
            },
            {
              name: 'dist_100占比',
              data: dist_100
            },
            {
              name: 'dist_150占比',
              data: dist_150
            },
            {
              name: 'dist_other占比',
              data: dist_other
            }
          ]
        })
      }).catch((res) => {
        alert('ajax is wrong, connect Adminstrator')
        console.log('ajax is wrong')
        console.log(res)
      })

      // 异步请求 one 数据
      const oneParams = {
        params: {
          tablename: 'sql_lte_match_one_blackhole_h_precision'
        }
      }
      this.$http.get(this.$baseUrl + '/myPostgresql/api/history/precision/', oneParams).then((res) => {
        console.log(res.data)
        this.echartsOneData = res.data
        const tablesName = 'sql_lte_match_one_blackhole_h_precision'
        this.echartsOne.setOption({
          title: {
            text: tablesName
          },
          xAxis: {
            data: res.data['keys']
          },
          series: [{
            name: 'mr_count',
            data: res.data[tablesName + '_mr_count']
          },
            {
              name: 'delta_dist_50',
              data: res.data[tablesName + '_delta_dist_50']
            },
            {
              name: 'delta_dist_100',
              data: res.data[tablesName + '_delta_dist_100']
            },
            {
              name: 'delta_dist_150',
              data: res.data[tablesName + '_delta_dist_150']
            },
            {
              name: 'delta_dist_other',
              data: res.data[tablesName + '_delta_dist_other']
            }]
        })
        // one 百分比 数据
        var dist_50 = []
        var dist_100 = []
        var dist_150 = []
        var dist_other = []
        for (var i = 0; i < res.data[tablesName + '_mr_count'].length; i++) {
          dist_50.push(res.data[tablesName + '_delta_dist_50'][i] / res.data[tablesName + '_mr_count'][i])
          dist_100.push(res.data[tablesName + '_delta_dist_100'][i] / res.data[tablesName + '_mr_count'][i])
          dist_150.push(res.data[tablesName + '_delta_dist_150'][i] / res.data[tablesName + '_mr_count'][i])
          dist_other.push(res.data[tablesName + '_delta_dist_other'][i] / res.data[tablesName + '_mr_count'][i])
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
          series: [
            {
              name: 'dist_50占比',
              data: dist_50
            },
            {
              name: 'dist_100占比',
              data: dist_100
            },
            {
              name: 'dist_150占比',
              data: dist_150
            },
            {
              name: 'dist_other占比',
              data: dist_other
            }
          ]
        })
      }).catch((res) => {
        alert('ajax is wrong, connect Adminstrator')
        console.log('ajax is wrong')
        console.log(res)
      })

      this.$nextTick(() => {
        this.echartsOne = echarts.init(document.getElementById('precisionOne'))
        this.echartsOnePercent = echarts.init(document.getElementById('precisionOnePercent'))
        this.echartsMore = echarts.init(document.getElementById('precisionMore'))
        this.echartsMorePercent = echarts.init(document.getElementById('precisionMorePercent'))

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
