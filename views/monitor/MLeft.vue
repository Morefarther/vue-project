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
  // import MSourceMRFile from './datashow/MSourceMRFile'
  // import MSourceMRLostFtp from './datashow/MSourceMRLostFtp'

  export default {
    name: 'MLeft',
    data () {
      return {
        treeData: [{
          label: '数据源监控',
          children: [{
            label: 'MR数据源',
            children: [{
              label: 'MR文件数'
            }, {
              label: 'MR_Lost_FTP'
            }]
          }, {
            label: 'PM数据源',
            children: [{
              label: 'PM文件数'
            }, {
              label: 'PM_Lost_FTP'
            }]
          }, {
            label: 'XDR数据源'
          }]
        }, {
          label: '程序日志监控',
          children: [{
            label: 'SparkMr日志'
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
        if (data.label === 'MR文件数') {
          this.$router.push('/monitor/sourcemrfile')
        } else if (data.label === 'MR_Lost_FTP') {
          this.$router.push('/monitor/sourcemrlostftp')
        } else if (data.label === 'PM文件数') {
          this.$router.push('/monitor/sourcepmfile')
        } else if (data.label === 'PM_Lost_FTP') {
          this.$router.push('/monitor/sourcepmlostftp')
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
