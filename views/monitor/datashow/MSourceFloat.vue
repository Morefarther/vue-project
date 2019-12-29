<template>
  <div style="position:fixed;z-index:1000;width: 75%;left: 200px; height:510px; overflow-y: auto; background: #d3dce6">
    <button style="background: #01AAED" @click="closeDetail">关闭</button>
    <el-pagination background layout="prev, pager, next" v-on:current-change="changePage" :page-size="pageSize" :total="totalItem"></el-pagination>
    <table class='gridtable'>
      <tr>
        <th>index</th>
        <th v-for="(value, key) in dataDetail[0]" :key="key">{{key}}</th>
      </tr>
      <tr v-for="(dd,index) in dataDetail" :key="index">
        <td v-if="index >= startItem && index < endItem">{{index}}</td>
        <td v-if="index >= startItem && index < endItem" v-for="(value,key) in dd" :key="key">{{value}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  export default {
    name: 'MSourceFloat',
    data () {
      return {
        pageSize: 12,
        currentPage: 1
      }
    },
    props: {
      dataDetail: Array
    },
    watch: {
      dataDetail (val, oldValue) {
        this.currentPage = 1
      }
    },
    methods: {
      closeDetail: function () {
        this.$emit('closeDetail', true)
      },
      changePage: function (currentPage) {
        // console.log(currentPage)
        this.currentPage = currentPage
      }
    },
    computed: {
      totalItem: {
        get: function () {
          return this.dataDetail.length
        }
      },
      startItem: {
        get: function () {
          return (this.currentPage - 1) * this.pageSize
        }
      },
      endItem: {
        get: function () {
          return this.currentPage * this.pageSize
        }
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
