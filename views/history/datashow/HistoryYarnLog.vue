<template>
  <div style="float: left; width: 100%; height: auto; text-align:center;">
    <div style="float: left;width: 100%; height: 38px; text-align: left; align-items:center;vertical-align:middle;justify-content:left;display: flex">
      <label>选择时间维度：</label>
      <select v-model="timeDimenSelected" @change="timeDimenChange">
        <option v-for="(td,index) in timeDimen" :key="index">{{td}}</option>
      </select>
      <label>选择时间：</label>
      <select v-model="timeSelected" @change="getAppInfo">
        <option v-for="(tl ,index) in timeList" :key="index">{{tl.time}}</option>
      </select>
      <label>任务总数为：{{total}}</label>
    </div>
    <div style="float: left; width: 100%; height: 38px; text-align:center;align-items:center;vertical-align:middle;display: flex">
      <label>名称过滤：</label><input v-model="nameFilter"/>
    </div>
    <div style="float: left; width: 100%; height: 500px; text-align:center; overflow-y: auto; ">
      <div v-show="detailShow" style="width: 100%;height:400px; overflow-y: auto;">
        <button @click="detailShow =! detailShow">关闭详细列表</button>
        <table class='gridtable'>
          <tr>
            <th>index</th>
            <th v-for="(value, key) in appInfoDetail[0]" :key="key">{{key}}
              <button v-if="key==='finalStatus' || key==='costTime'" @click="orderAppDetail(key)">排序</button>
            </th>
          </tr>
          <tr v-for="(fd,index) in appInfoDetailFilter" :key="index">
            <td>{{index}}</td>
            <td v-for="(value,key) in fd" :key="key">{{value}}</td>
          </tr>
        </table>
      </div>
      <div v-show="detailShow" style="width: 100%;height:20px;">
        <hr/>
        <br>
      </div>
      <table class='gridtable'>
        <tr>
          <th>index</th>
          <th v-for='(value,key) in appInfos[0]' :key="key">{{key}}
            <button v-if="key==='times' || key==='maxTime'" @click="orderAppInfo(key)">排序</button>
          </th>
        </tr>
        <tr v-for='(appInfo, index) in appInfosFilter' :key="index">
          <td>{{index}}</td>
          <td v-for='(value,key) in appInfo' :key="key">
            <a v-if="key==='times'" href="#" @click.stop="getAppInfoDetail(appInfo)">
              {{value}}
            </a>
            <a v-else>
              {{value}}
            </a>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HistoryYarnLog',
    data () {
      return {
        timeDimenSelected: '天级',
        timeDimen: ['天级', '小时级'],
        timeList: [],
        timeSelected: '',
        nameFilter: '',
        // statusFilter: '',
        detailShow: false,
        appInfos: [],
        countOrder: false,
        maxTimeOrder: false,
        appInfoDetail: [],
        // appInfoDetailFilter: []
        // appInfosFilter: []
        detailStatusOrder: false,
        detailCostTimeOrder: false
      }
    },
    computed: {
      // 显示当前时间的总任务数
      total: {
        get: function () {
          const {timeSelected, timeList} = this
          for (var i in timeList) {
            if (timeList[i].time === timeSelected) {
              return timeList[i].total
            }
          }
        },
        set: function (value) {
          // console.log('set total')
        }
      },
      // app信息的计算属性，显示过滤，排序后的任务信息
      appInfosFilter: {
        get: function () {
          const {appInfos, nameFilter, countOrder, maxTimeOrder} = this
          const fFtpInfos = appInfos.filter((fp) => {
            return fp.name.indexOf(nameFilter) !== -1
          })
          if (countOrder) {
            return fFtpInfos.sort((fp1, fp2) => {
              return fp2.ct - fp1.ct
            })
          }
          if (maxTimeOrder) {
            return fFtpInfos.sort((fp1, fp2) => {
              return fp2.maxTime - fp1.maxTime
            })
          }
          return fFtpInfos
        },
        set: function () {
          // console.log('set appInfoFilter')
        }
      },
      // 点击数量后，详情列表，带有过滤，排序功能
      appInfoDetailFilter: {
        get: function () {
          const {detailStatusOrder, detailCostTimeOrder, appInfoDetail} = this
          // console.log(appInfoDetail)
          if (detailStatusOrder) {
            return appInfoDetail.sort((fp1, fp2) => {
              return fp2.finalStatus - fp1.finalStatus
            })
          }
          if (detailCostTimeOrder) {
            return appInfoDetail.sort((fp1, fp2) => {
              return fp2.costTime - fp1.costTime
            })
          }
          return appInfoDetail
        },
        set: function (value) {
          //
        }
      }
    },
    methods: {
      // 根据选择的维度，得到时间下拉框的 所有选项
      timeDimenChange () {
        const timeDimenSelected = this.timeDimenSelected
        const params = {
          params: {
            timeDimen: timeDimenSelected
          }
        }
        this.$http.get(this.$baseUrl + '/myPostgresql/api/history/historyYarnLogTime/', params).then((res) => {
          // console.log(res.data) 更新值
          this.timeList = res.data
          this.timeSelected = res.data[0].time
          // 调用方法，得到默认的appinfo信息
          this.getAppInfo()
        }).catch((res) => {
          alert('ajax is wrong, connect Adminstrator')
          console.log('ajax is wrong')
          console.log(res)
        })
      },
      // ajax 获取 appinfo 统计信息
      getAppInfo () {
        const {timeDimenSelected, timeSelected} = this
        const params = {
          params: {
            timeDimen: timeDimenSelected,
            timeSplit: timeSelected
          }
        }
        this.$http.get(this.$baseUrl + '/myPostgresql/api/history/hisotryYarnLogByName/', params).then((res) => {
          // console.log(res.data)
          let appInfos = []
          for (var i in res.data) {
            // console.log(res.data[i])
            appInfos.push({name: res.data[i].name, user: res.data[i].user, queue: res.data[i].queue, times: res.data[i].ct, avgTime: Math.floor(res.data[i].avgTime / 1000), maxTime: Math.floor(res.data[i].maxTime / 1000)})
          }
          this.appInfos = appInfos
        }).catch((res) => {
          alert('ajax is wrong, connect Adminstrator')
          console.log('ajax is wrong')
          console.log(res)
        })
      },
      // appInfo 排序
      orderAppInfo (orderKey) {
        if (orderKey === 'times') {
          this.countOrder = true
          this.maxTimeOrder = false
        } else if (orderKey === 'maxTime') {
          this.maxTimeOrder = true
          this.countOrder = false
        }
      },
      // 下钻
      getAppInfoDetail (appInfo) {
        // console.log(appInfo)
        this.detailShow = !this.detailShow
        const params = {
          params: {
            name: appInfo.name,
            timeDimen: this.timeDimenSelected,
            timeSplit: this.timeSelected
          }
        }
        this.$http.get(this.$baseUrl + '/myPostgresql/api/history/hisotryYarnLogDetail/', params).then((res) => {
          // console.log(res.data)
          this.appInfoDetail = res.data
        }).catch((res) => {
          alert('ajax is wrong, connect Adminstrator')
          console.log('ajax is wrong')
          console.log(res)
        })
      },
      // 详情排序
      orderAppDetail (orderKey) {
        // console.log(orderKey)
        if (orderKey === 'finalStatus') {
          this.detailStatusOrder = true
          this.detailCostTimeOrder = false
        } else if (orderKey === 'costTime') {
          this.detailCostTimeOrder = true
          this.detailStatusOrder = false
        }
      }
    },
    mounted () {
      // 初始化得到 默认 天级  下，所有时间 下拉框的所有选择
      this.timeDimenChange()
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
