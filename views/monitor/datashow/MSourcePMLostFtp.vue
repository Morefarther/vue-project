<template>
  <div style="float: left; width: 100%; height: auto; text-align:center;">
    <div id="first" style="width:100%;height:550px;float:left;user-select:text; overflow-y: auto;"></div>
    <MSourceFloat v-show="detailShow" v-bind:dataDetail="lostFtpDetail" v-on:closeDetail="showDetail"></MSourceFloat>
  </div>
</template>

<script>
  import echarts from '../../../../static/echarts'
  import MSourceFloat from './MSourceFloat'

  export default {
    name: 'MSourcePMLostFtp',
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
      this.$http.get(this.$baseUrl + '/myPostgresql/api/monitor/getlostftp/', {params: {ftype: 'pm'}}).then((res) => {
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
              ftype: 'pm',
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

</style>
