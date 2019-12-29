<template>
    <div style="float: left; width: 100%; height: auto; text-align:center;">
      <div style="float: left;width: 100%; height: 38px; text-align: left; align-items:center;vertical-align:middle;justify-content:left;display: flex">
        <label>选择数据类型：</label>
        <select v-model="fileTyepSelected" @change="firstDate(fileTyepSelected)">
          <option v-for="(ft,index) in fileType" :key="index">{{ft}}</option>
        </select>
        <label>选择日期：</label>
        <select v-model="dateSelected" @change="getFtpDate">
          <option v-for="(date ,index) in dateList" :key="index">{{date}}</option>
        </select>
      </div>
      <div style="float: left; width: 100%; height: 38px; text-align:center;align-items:center;vertical-align:middle;display: flex">
        <label>FTPIP过滤：</label><input v-model="ftpipFilter"/>
        <label>厂家过滤：</label><input v-model="venderFilter"/>
        <label>城市过滤：</label><input v-model="cityFilter"/>
        <label>连接失败过滤：</label><input v-model="errorFilter"/>
      </div>
      <div style="float: left; width: 100%; height: 500px; text-align:center; overflow-y: auto; ">
        <div v-show="detailShow" style="position:fixed;z-index:1000;width: 70%;left: 100px; height:400px; overflow-y: auto;">
          <button @click="detailShow =! detailShow">关闭</button>
          <table class='gridtable'>
            <tr>
              <th>index</th>
              <th v-for="(value, key) in ftpDetail[0]" :key="key">{{key}}</th>
            </tr>
            <tr v-for="(fd,index) in ftpDetail" :key="index">
              <td>{{index}}</td>
              <td v-for="(value,key) in fd" :key="key">{{value}}</td>
            </tr>
          </table>
        </div>
        <table class='gridtable'>
          <tr>
              <th v-for='(value,key) in ftpInfos[0]' :key="key">{{key}}
                <button v-if="key==='lostFileCount'" @click="orderFtp">排序</button>
              </th>
          </tr>
          <tr v-for='(ftpinfo, index) in filterFtpInfos' :key="index">
            <td v-for='(value,key) in ftpinfo' :key="key">
              <a v-if="key==='ftpFileCount' || key==='nifiFileCount'" href="#" @click.stop="getFileDetail(ftpinfo,key)" >
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
    name: 'HistoryFTPDimen',
    data () {
      return {
        fileType: [],
        fileTyepSelected: '',
        dateList: [],
        dateSelected: '',
        ftpInfos: [],
        ftpipFilter: '',
        venderFilter: '',
        cityFilter: '',
        orderByLostFtp: 0, // 0表示原顺序，1表示升序，2表示降序
        ftpDetail: [],
        detailShow: false,
        errorFilter: ''
      }
    },
    computed: {
      // 计算属性，对ftpinfos进行过滤与排序
      filterFtpInfos: {
        get: function () {
          const {ftpipFilter, venderFilter, cityFilter, errorFilter, orderByLostFtp} = this
          const fFtpInfos = this.ftpInfos.filter((fp) => {
            return fp.ftpip.indexOf(ftpipFilter) !== -1 && fp.vender.indexOf(venderFilter) !== -1 && fp.city.indexOf(cityFilter) !== -1 && fp.connectionError.indexOf(errorFilter) !== -1
          })
          if (orderByLostFtp !== 0) {
            return fFtpInfos.sort((fp1, fp2) => {
              if (orderByLostFtp === 1) {
                return fp2.lostFileCount - fp1.lostFileCount
              } else {
                return fp1.lostFileCount - fp2.lostFileCount
              }
            })
          } else {
            return fFtpInfos
          }
        },
        set: function (value) {
          console.log('set filterFtpInfos' + value)
        }
      }
    },
    methods: {
      // 初始化时间选择下拉框，参数输入文件类型
      firstDate (fileType) {
        const params = {
          params: {
            dtype: fileType
          }
        }
        this.$http.get(this.$baseUrl + '/myPostgresql/api/history/dateSelect/', params).then((res) => {
          console.log(res.data)
          this.dateList = res.data
          this.dateSelected = res.data[0]
          // 得到默认的文件类型与默认时间后，再调用方法，数据表格
          this.getFtpDate()
        }).catch((res) => {
          alert('ajax is wrong, connect Adminstrator')
          console.log('ajax is wrong')
          console.log(res)
        })
      },
      // 根据选择的fileType,Date时间两个参数，获取ftp信息详细数据
      getFtpDate () {
        console.log('getFtpDate')
        const params = {
          params: {
            dtype: this.fileTyepSelected,
            timesplit: this.dateSelected
          }
        }
        this.$http.get(this.$baseUrl + '/myPostgresql/api/history/ftpFileCount/', params).then((res) => {
          console.log(res.data)
          const ftpInfos = []
          for (var i = 0; i < res.data.ftpip.length; i++) {
            // js={"ftpip":ftpip,"ftpvender":ftpvender,"ftpcity":ftpcity,"ftpFileCount":orgFileCount,"nifiFileCount":nifiFileCount}
            const ftpInfo = { ftpip: res.data.ftpip[i], vender: res.data.ftpvender[i], city: res.data.ftpcity[i], ftpPath: res.data.filePath[i], ftpFileCount: res.data.ftpFileCount[i], nifiFileCount: res.data.nifiFileCount[i], lostFileCount: res.data.ftpFileCount[i] - res.data.nifiFileCount[i], connectionError: res.data.lostFtp[i] }
            ftpInfos.push(ftpInfo)
          }
          this.ftpInfos = ftpInfos
          this.filterFtpInfos = ftpInfos
        }).catch((res) => {
          alert('ajax is wrong, connect Adminstrator')
          console.log('ajax is wrong')
          console.log(res)
        })
      },
      // 对ftp详细信息进行排序
      orderFtp () {
        let tmpI = this.orderByLostFtp
        tmpI = tmpI + 1
        tmpI = tmpI % 3
        this.orderByLostFtp = tmpI
      },
      // 对文件列表进行下钻
      getFileDetail (ftpinfo, key) {
        const params = {
          params: {
            // param["dtype"],param["ip"],param['filetype'] 传3个参数，哪个数据源，哪个ip，是nifi的还是ftp的
            dtype: this.fileTyepSelected,
            date: this.dateSelected,
            ip: ftpinfo.ftpip,
            filetype: key
          }
        }
        this.$http.get(this.$baseUrl + '/myPostgresql/api/history/ftpFileDetail/', params).then((res) => {
          console.log(res.data)
          this.ftpDetail = res.data
          // console.log(document.getElementById('tmpFtpDetail').innerHTML)
          this.detailShow = true
        }).catch((res) => {
          alert('ajax is wrong, connect Adminstrator')
          console.log('ajax is wrong')
          console.log(res)
        })
      }
    },
    mounted () {
      // 初始化文件类型下拉框数据
      this.$http.get(this.$baseUrl + '/myPostgresql/api/history/fileTypeSelect/').then((res) => {
        console.log(res.data)
        this.fileType = res.data
        const fileType = res.data[0]
        this.fileTyepSelected = fileType
        // 调方法，继续查询文件类型对应的可选择的日期
        this.firstDate(fileType)
      }).catch((res) => {
        alert('ajax is wrong, connect Adminstrator')
        console.log('ajax is wrong')
        console.log(res)
      })
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
