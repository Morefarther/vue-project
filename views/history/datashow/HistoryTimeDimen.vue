<template>
  <div>
    <div style="float: left; width: 100%; height: auto; text-align:center;">
      <div style="float: left;position: relative; left: 200px; width: 150px; height: 38px; background: #42b983;text-align: center; align-items:center;vertical-align:middle;justify-content:center;display: flex">
        <a @click="leftMonth" style="display: block; width: 100%; height: auto; cursor: pointer;">上个月</a>
      </div>
      <div style="float: left; position: relative; left: 320px">
        <el-date-picker value-format="yyyy-MM"
          v-model="monthNow"
          type="month">
        </el-date-picker>
      </div>
      <div style="float: left;position: relative; left: 480px; width: 150px; height: 38px; background: #42b983; align-items: center;justify-content:center;display: flex">
        <a @click="rightMonth" style="display: block; width: 100%; height: auto; cursor: pointer;">下个月</a>
      </div>
    </div>
    <div style="float:left; width: 100%; height: 550px; overflow-y: auto;">
      <div id="first" style="width:100%;height:550px;float:left;user-select:text;border:1px dashed #000;solid-color: red;"></div>
    </div>
  </div>
</template>

<script>

  // import Vue from 'vue'
  // import { DatePicker } from 'element-ui'
  import moment from 'moment'
  import echarts from '../../../../static/echarts'
  // import axios from 'axios'

  // Vue.component(DatePicker.name, DatePicker)
  export default {
    name: 'HistoryTimeDimen',
    data () {
      return {
        monthNow: '',
        prcnetMainEchar: ''
      }
    },
    methods: {
      leftMonth: function () {
        const monthNow = this.monthNow
        const leftMonth = moment(monthNow).subtract(1, 'months').format('YYYY-MM')
        this.monthNow = leftMonth
        this.prcnetMainEchar.setOption({
            calendar: [{
                left: 'center',
                top: 'middle',
                cellSize: [70, 70],
                yearLabel: {show: false},
                orient: 'vertical',
                dayLabel: {
                    firstDay: 1,
                    nameMap: 'cn'
                },
                monthLabel: {
                    show: false
                },
                range: leftMonth
            }]
        })
      },
      rightMonth: function () {
        const monthNow = this.monthNow
        const rightMonth = moment(monthNow).subtract(-1, 'months').format('YYYY-MM')
        this.monthNow = rightMonth
        this.prcnetMainEchar.setOption({
            calendar: [{
                left: 'center',
                top: 'middle',
                cellSize: [70, 70],
                yearLabel: {show: false},
                orient: 'vertical',
                dayLabel: {
                    firstDay: 1,
                    nameMap: 'cn'
                },
                monthLabel: {
                    show: false
                },
                range: rightMonth
            }]
        })
      }
    },
    mounted () {
      // 默认月显示并设置值
      const monthNow = moment(Date.now()).format('YYYY-MM')
      this.monthNow = monthNow

      this.$nextTick(() => {
        const prcnetMainEchar = echarts.init(document.getElementById('first'))
        this.$http.get(this.$baseUrl + '/myPostgresql/api/history/hisotryPercentAllDate/').then((res) => {
          console.log(res.data)
          const lunarData = []
          for (var i = 0; i < res.data.length; i++) {
            lunarData.push([
                res.data[i][0],
                1
            ])
          }
          const echartOption = {
            tooltip: {
                formatter: function (params) {
                    return 'mr完整率： ' + (params.value[1] * 100).toFixed(2) + '%<br>pm完整率： ' + (params.value[2] * 100).toFixed(2) + '%'
                }
            },
            visualMap: {
                show: false,
                min: 0,
                max: 300,
                calculable: true,
                seriesIndex: [1],
                orient: 'horizontal',
                left: 'center',
                bottom: 20,
                inRange: {
                    color: ['#e0ffff', '#006edd'],
                    opacity: 0.3
                },
                controller: {
                    inRange: {
                        opacity: 0.5
                    }
                }
            },
            calendar: [{
                left: 'center',
                top: 'middle',
                cellSize: [70, 70],
                yearLabel: {show: false},
                orient: 'vertical',
                dayLabel: {
                    firstDay: 1,
                    nameMap: 'cn'
                },
                monthLabel: {
                    show: false
                },
                range: monthNow
            }],
            series: [{
                type: 'scatter',
                coordinateSystem: 'calendar',
                symbolSize: 1,
                label: {
                    normal: {
                        show: true,
                        formatter: function (params) {
                            // var d = echarts.number.parseDate(params.value[0]);
                            // return d.getDate() + '\n\n';
                          return echarts.number.parseDate(params.value[0]).getDate() + '\n\n'
                        },
                        textStyle: {
                            color: '#000'
                        }
                    }
                },
                data: lunarData
            }, {
                name: '降雨量',
                type: 'heatmap',
                coordinateSystem: 'calendar',
                data: res.data
            }]
          }
          prcnetMainEchar.setOption(echartOption)
          this.prcnetMainEchar = prcnetMainEchar
          }).catch((res) => {
            console.log('ajax is wrong')
            console.log(res)
        })
    })
    }
  }
</script>

<style scoped src="../../../../node_modules/element-ui/lib/theme-chalk/index.css">
  .buttonLikeStyle {
    width: 150px;
    height: 40px;
    background: #d3dce6;
    float: left;
    text-align: center;
    align-items:center;
    display:flex;
    vertical-align:middle;
    justify-content:center;
  }
  .monthStyle {
    width: 150px;
    height: 50px;
    float: left;
    text-align: center;
    align-items:center;
    display:flex;
    vertical-align:middle;
    justify-content:center;
  }
  .gapLikeStyle {
    width: 4%;
    height: 50px;
    float: left;
    display: inline-block;
  }
  .routeLinkStyle {
    display: block;
    width: 100%;
    height: auto;
  }

</style>
