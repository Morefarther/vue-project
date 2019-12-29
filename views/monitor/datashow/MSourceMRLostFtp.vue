<template>
  <div style="float: left; width: 100%; height: auto; text-align:center;">
    <div id="first" style="width:100%;height:550px;float:left;user-select:text; overflow-y: auto;"></div>
    <MSourceFloat v-show="detailShow" v-bind:dataDetail="lostFtpDetail" v-on:closeDetail="showDetail"></MSourceFloat>
<!--    <div v-show="detailShow" style="position:fixed;z-index:1000;width: 70%;left: 100px; height:400px; overflow-y: auto;">-->
<!--      <button @click="detailShow =! detailShow">关闭</button>-->
<!--      <table class='gridtable'>-->
<!--        <tr>-->
<!--          <th>index</th>-->
<!--          <th v-for="(value, key) in lostFtpDetail[0]" :key="key">{{key}}</th>-->
<!--        </tr>-->
<!--        <tr v-for="(lfd,index) in lostFtpDetail" :key="index">-->
<!--          <td>{{index}}</td>-->
<!--          <td v-for="(value,key) in lfd" :key="key">{{value}}</td>-->
<!--        </tr>-->
<!--      </table>-->
<!--    </div>-->
  </div>
</template>

<script>
  import echarts from '../../../../static/echarts'
  import MSourceFloat from './MSourceFloat'

  export default {
    name: 'MSourceMRLostFtp',
    components: {
      MSourceFloat
    },
    data () {
      return {
        lostFtpData: [],
        mainEachart: '',
        detailShow: false,
        lostFtpDetail: []
      }
    },
    mounted () {
      this.$http.get(this.$baseUrl + '/myPostgresql/api/monitor/getlostftp/', {params: {ftype: 'mrtar'}}).then((res) => {
        console.log(res.data)
        this.lostFtpData = res.data
        this.mainEachart.setOption({
          title: {
            text: '无法连接ftp数量'
          },
          xAxis: {
            data: res.data['keys']
          },
          series: [{
            name: 'lost_ftp',
            type: 'bar',
            data: res.data['lostftpnum']
          }]
        })
        this.mainEachart.on('click', (bar) => {
          this.$http.get(this.$baseUrl + '/myPostgresql/api/monitor/getlostftpdetail/', {
            params: {
              ftype: 'mrtar',
              timesplit: bar.name
            }
          }).then((deep) => {
            console.log(deep.data)
            this.lostFtpDetail = deep.data
            this.detailShow = true
          }).catch((res) => {
            alert('ajax is wrong, connect Adminstrator')
            console.log('ajax is wrong')
            console.log(res)
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
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          yAxis: {
            type: 'value'
          },
          xAxis: {
            type: 'category',
            data: []
          },
          series: []
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
