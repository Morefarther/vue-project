<template>
  <div style="float: left; width: 100%; height: auto; text-align:center;">
    <div id="first" style="width:100%;height:550px;float:left;user-select:text; overflow-y: auto;"></div>
    <MSourceFloat v-show="detailShow" v-bind:dataDetail="deepData" v-on:closeDetail="showDetail"></MSourceFloat>
<!--    <div v-show="detailShow"-->
<!--         style="position:fixed;z-index:1000;width: 70%;left: 100px; height:400px; overflow-y: auto;">-->
<!--      <button @click="detailShow =! detailShow">关闭</button>-->
<!--      <table class='gridtable'>-->
<!--        <tr>-->
<!--          <th>index</th>-->
<!--          <th v-for="(value, key) in deepData[0]" :key="key">{{key}}</th>-->
<!--        </tr>-->
<!--        <tr v-for="(dd,index) in deepData" :key="index">-->
<!--          <td>{{index}}</td>-->
<!--          <td v-for="(value,key) in dd" :key="key">{{value}}</td>-->
<!--        </tr>-->
<!--      </table>-->
<!--    </div>-->
  </div>
</template>

<script>
  import echarts from '../../../../static/echarts'
  import MSourceFloat from './MSourceFloat'

  export default {
    name: 'MSourceMRFile',
    components: {
      MSourceFloat
    },
    data () {
      return {
        echartData: {},
        mainEachart: '',
        detailShow: false,
        deepData: []
      }
    },
    mounted () {
      const params = {
        params: {
          fileType: 'mrtar'
        }
      }
      this.$http.get(this.$baseUrl + '/myPostgresql/api/monitor/sourcemrfile/', params).then((res) => {
        console.log(res.data)
        this.echartData = res.data
        this.mainEachart.setOption({
          xAxis: [
            {
              data: res.data.timeSplit
            }
          ],
          series: [
            {
              name: 'common',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: res.data.common
            },
            {
              name: 'nifi_only',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: res.data.nifiOnly
            },
            {
              name: 'ftp_only',
              type: 'bar',
              label: {
                normal: {
                  show: true,
                  position: 'insideRight'
                }
              },
              data: res.data.ftpOnly
            }
          ]
        })
        this.mainEachart.on('click', (bar) => {
          // console.log(bar)
          const deepParams = {
            params: {
              fileType: 'mrtar',
              seriesName: bar.seriesName,
              name: bar.name
            }
          }
          console.log(deepParams)
          this.$http.get(this.$baseUrl + '/myPostgresql/api/monitor/sourcemrfiledeep/', deepParams).then((deepData) => {
            console.log(deepData.data)
            this.deepData = deepData.data
            this.detailShow = true
          })
        })
      }).catch((res) => {
        alert('ajax is wrong, connect Adminstrator')
        console.log('ajax is wrong')
        console.log(res)
      })

      this.$nextTick(() => {
        this.mainEachart = echarts.init(document.getElementById('first'))
        const option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow',
              label: {
                show: true
              }
            }
          },
          toolbox: {
            show: true,
            feature: {
              mark: {show: true},
              dataView: {show: true, readOnly: false},
              magicType: {show: true, type: ['line', 'bar']},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          calculable: true,
          legend: {
            data: ['common', 'nifi_only', 'ftp_only'],
            itemGap: 5
          },
          grid: {
            top: '12%',
            left: '1%',
            right: '10%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: []
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: 'MR文件数监控'
            }
          ],
          dataZoom: [
            {
              show: true,
              start: 70,
              end: 90
            },
            {
              type: 'inside',
              start: 70,
              end: 90
            }
          ],
          series: [
          ]
        }
        this.mainEachart.setOption(option)
      })
    },
     methods: {
       showDetail: function (data) {
         console.log('MSourceFloat return data:' + data)
         this.detailShow = false
       }
     }
  }
</script>

<style scoped>
  table.gridtable {
    font-family: verdana,arial,sans-serif;
    font-size:14px;
    color:#333333;
    border-width: 1px;
    border-color: #666666;
    border-collapse: collapse;
    text-align:center;
    width:100%;
    user-select:text;
  }
  table.gridtable th {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #dedede;
    text-align:center;
    width: 50px;
  }
  table.gridtable td {
    border-width: 1px;
    padding: 8px;
    border-style: solid;
    border-color: #666666;
    background-color: #ffffff;
    width: 50px;
  }

</style>
