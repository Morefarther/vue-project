<template>
  <div style="float: left; width: 100%; height: 550px; text-align:center; overflow-y: auto;">
    <table class='gridtable'>
      <tr>
        <th v-for='(value,key) in tableDataComputed[0]' :key="key">{{key}}</th>
      </tr>
      <tr v-for='(td, index) in tableDataComputed' :key="index">
        <td v-for='(value,key) in td' :key="key">{{value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'HistoryZabbixTimeDimen',
    data () {
      return {
        tableData: []
      }
    },
    computed: {
      tableDataComputed: {
        get: function () {
          const tableData = this.tableData
          let tmpData = []
          for (var i = 0; i < tableData.length; i++) {
            let mrFive = 0
            let pmFive = 0
            // let xdrFive = 0
            let times = 1
            console.log('i:' + i)
            for (var j = 0; j < 5; j++) {
              console.log('j:' + j)
              if (i - j < 0) {
                break
              } else {
                mrFive = mrFive + tableData[i - j].mrFileCount
                pmFive = pmFive + tableData[i - j].pmFileCount
              }
              if (j === 4) {
                times = 5
              } else {
                times = j + 1
              }
            }
            mrFive = mrFive / times
            pmFive = pmFive / times

            tmpData.push({'day': tableData[i].day, 'mrFileCount': tableData[i].mrFileCount, 'mrLastFive': mrFive.toFixed(2), 'mrSurge': (Math.abs(tableData[i].mrFileCount - mrFive) / mrFive * 100).toFixed(2) + '%', 'pmFileCount': tableData[i].pmFileCount, 'pmLastFive': pmFive.toFixed(2), 'pmSurge': (Math.abs(tableData[i].pmFileCount - pmFive) / pmFive * 100).toFixed(2) + '%'})
          }
          return tmpData
        },
        set: function (value) {
          console.log(value)
        }
      }
    },
    mounted () {
      this.$http.get(this.$baseUrl + '/myPostgresql/api/history/historyZabbixTime/').then((res) => {
        // console.log(res.data)
        this.tableData = res.data
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
