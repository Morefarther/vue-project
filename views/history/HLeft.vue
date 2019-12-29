<template>
  <div  style="width: 20%; height: 590px; float: left; overflow-x: auto; overflow-y: scroll">
    <el-tree
    :data="treeData"
    :props="defaultProps"
    accordion
    @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script>
  // import Vue from 'vue'
  // import {Tree} from 'element-ui'
  //
  // Vue.component(Tree.name, Tree)
  export default {
    name: 'HLeft',
    data () {
      return {
        treeData: [{
          label: '维度统计',
          children: [{
            label: 'Zabbix时间维度'
          }, {
            label: '时间维度'
          }, {
            label: 'ftp维度'
          }, {
            label: '地市维度'
          }]
        }, {
          label: '数据趋势',
          children: [{
            label: 'MR数据走势'
          }, {
            label: 'PM数据走势'
          }]
        }, {
          label: '任务日志统计',
          children: [{
            label: 'Spark任务日志',
            children: [{
              label: 'MR定位日志',
              children: [{
                label: 'fileLength'
              }, {
                label: 'complete'
              }, {
                label: 'precision'
              }]
            }]
          }]
        }, {
          label: '程序日志',
          children: [{
            label: 'yarn日志'
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      handleNodeClick (data) {
        console.log(data)
        if (data.label === '时间维度') {
          this.$router.push('/history/timedimen')
        } else if (data.label === 'Zabbix时间维度') {
          this.$router.push('/history/zabbixtimedimen')
        } else if (data.label === 'ftp维度') {
          this.$router.push('/history/ftpdimen')
        } else if (data.label === '地市维度') {
          this.$router.push('/history/citydimen')
        } else if (data.label === 'yarn日志') {
          this.$router.push('/history/yarnlog')
        } else if (data.label === 'fileLength') {
          this.$router.push('/history/sparklogmrlocationfilelength')
        } else if (data.label === 'complete') {
          this.$router.push('/history/sparklogmrlocationcomplete')
        } else if (data.label === 'precision') {
          this.$router.push('/history/sparklogmrlocationprecision')
        }
        // else {
        //   this.$router.push('/history')
        // }
      }
    }
  }
</script>

<style scoped src="../../../node_modules/element-ui/lib/theme-chalk/index.css">

</style>
