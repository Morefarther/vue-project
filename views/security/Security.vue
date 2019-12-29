<template>
  <div style="width: 100%; height: 590px; float: left;">
    <div style="width: 100%; height: 200px; float: left;">
      <label>输入扰码：</label><input v-model="iv1">
      <label>输入密码：</label><input v-model="passwd">
      <button @click="setPasswd">加密</button>
      <br><br>
      <label id="label_explan">加密结果为：</label>
      <br>
      <label>{{textResult}}</label>
    </div>
    <br>
    <hr>
    <div style="width: 100%; height: 200px; float: left;">
      <label>输入扰码：</label><input v-model="iv2">
      <label>输入解密字符：</label><input v-model="text">
      <button @click="getPasswd">解密</button>
      <br><br>
      <label id="label_password_explan">解密结果为：</label>
      <br>
      <label>{{passwdResult}}</label>
    </div>
    <br>
    <hr>
    <div style="width: 100%; height: 90px; float: left;">
        <label>命令行使用参考：</label><br>
        <label>curl -s "http://192.168.48.144:8002/myPostgresql/api/getAse/?iv=hello&password=h04jObeC8UJ6RWyq21Bylg%3D%3D" </label><br>
        <label>主要传参：iv=扰码&password=需解密字符串</label>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Security',
    data () {
      return {
        iv1: '',
        passwd: '',
        iv2: '',
        text: '',
        textResult: '',
        passwdResult: ''
      }
    },
    methods: {
      // 加密ajax
      setPasswd: function () {
        const {iv1, passwd} = this
        const params = {
          iv: iv1,
          password: passwd
        }
        this.$http.post(this.$baseUrl + '/myPostgresql/api/setAse/', params).then((res) => {
          console.log(res.data)
          this.textResult = res.data
        }).catch((res) => {
          alert('ajax is wrong, connect Adminstrator')
          console.log('ajax is wrong')
          console.log(res)
        })
      },
      // 解密ajax
      getPasswd: function () {
        const {iv2, text} = this
        const params = {
          params: {
            iv: iv2,
            password: text
          }
        }
        this.$http.get(this.$baseUrl + '/myPostgresql/api/getAse/', params).then((res) => {
          console.log(res.data)
          this.passwdResult = res.data
        }).catch((res) => {
          alert('ajax is wrong, connect Adminstrator')
          console.log('ajax is wrong')
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped>

</style>
