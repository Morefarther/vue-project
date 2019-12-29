<template>
    <div style="float: left; width: 100%; height: 590px; text-align: center;overflow-y: auto;">
      <div id="cdrOriginal" style="float: left; width: 100%; height: 350px;"></div>
      <div id="mreImsi" style="float: left; width: 100%; height: 350px;"></div>
      <div id="mreRaw" style="float: left; width: 100%; height: 350px;"></div>
      <div id="mroBlackhole" style="float: left; width: 100%; height: 350px;"></div>
      <div id="mroRaw" style="float: left; width: 100%; height: 350px;"></div>
    </div>
</template>

<script>
  import echarts from '../../../../static/echarts'

  export default {
    name: 'HSLMrlocationFilelength',
    data () {
      return {
        echartsOriginal: '',
        echartsMreImsi: '',
        echartsMreRaw: '',
        echartsMroBlackhole: '',
        echartsMroRaw: '',
        postgresqlData: []
      }
    },
    mounted () {
      // 初始化echarts样式 optiongloble
      let optiongloble = {
        tooltip: {
            trigger: 'axis',
            position: function (pt) {
                return [pt[0], '10%']
            }
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
                type: 'line',
                smooth: true,
                symbol: 'none',
                sampling: 'average',
                itemStyle: {
                    color: 'rgb(255, 70, 131)'
                },
                data: []
            }
        ]
      }

      // 异步加载数据
      this.$http.get(this.$baseUrl + '/myPostgresql/api/history/filelength/').then((res) => {
        console.log(res.data)
        this.postgresqlData = res.data
        // 第一个图表 cdr original
        this.echartsOriginal.setOption({
          title: {
              text: 'filelength_cdr_original'
            },
            xAxis: {
              data: res.data['keys']
            },
            yAxis: {
              max: 5000000
            },
            series: [{
              data: res.data['filelength_cdr_original']
            }
            ]
        })

        // 第二个图表 mre imsi
        this.echartsMreImsi.setOption({
          title: {
            text: 'filelength_lte_mre_imsi_h'
          },
          xAxis: {
            data: res.data['keys']
          },
          series: [{
            data: res.data['filelength_lte_mre_imsi_h']
          }]
        })

        // 第三个图表 mre Raw
        this.echartsMreRaw.setOption({
          title: {
            text: 'filelength_lte_mre_raw_h'
          },
          xAxis: {
            data: res.data['keys']
          },
          series: [{
            data: res.data['filelength_lte_mre_raw_h']
          }]
        })

        // 第四个图表 mro blackhole
        this.echartsMroBlackhole.setOption({
          title: {
            text: 'filelength_lte_mro_blackhole_h'
          },
          xAxis: {
            data: res.data['keys']
          },
          series: [{
            data: res.data['filelength_lte_mro_blackhole_h']
          }]
        })

        // 第五个图表 mro raw
        this.echartsMroRaw.setOption({
          title: {
            text: 'filelength_lte_mro_raw_h'
          },
          xAxis: {
            data: res.data['keys']
          },
          series: [{
            data: res.data['filelength_lte_mro_raw_h']
          }]
        })
      }).catch((res) => {
        alert('ajax is wrong, connect Adminstrator')
        console.log('ajax is wrong')
        console.log(res)
      })

      // 初始化dom
      this.$nextTick(() => {
        this.echartsOriginal = echarts.init(document.getElementById('cdrOriginal'))
        this.echartsMreImsi = echarts.init(document.getElementById('mreImsi'))
        this.echartsMreRaw = echarts.init(document.getElementById('mreRaw'))
        this.echartsMroBlackhole = echarts.init(document.getElementById('mroBlackhole'))
        this.echartsMroRaw = echarts.init(document.getElementById('mroRaw'))

        this.echartsOriginal.setOption(optiongloble)
        this.echartsMreImsi.setOption(optiongloble)
        this.echartsMreRaw.setOption(optiongloble)
        this.echartsMroBlackhole.setOption(optiongloble)
        this.echartsMroRaw.setOption(optiongloble)
      })
    }
  }
</script>

<style scoped>

</style>
