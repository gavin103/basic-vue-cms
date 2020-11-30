<template>
  <div class="avatar">
      <div class="avatar-img">
        <img width="80" height="80" :src="avatar">
      </div>
      <p>{{name}}</p>
      <p>{{email}}</p>
      <el-button @click="signOut">注销</el-button>
  </div>
</template>

<script>
const user = JSON.parse(sessionStorage.getItem('user'))
export default {
  data() {
      return {
          name: user.name||'暂无用户名',
          email: user.email,
          avatar: user.avatar
      };
  },
  methods: {
      signOut(){
          sessionStorage.clear()
          this.$router.push('/login');
      }
  }
}
</script>


<style>
.avatar{
  text-align: center;
  color:#ccc;
  margin: 20px 0;
}
.avatar p{
  font-size: 14px;
  height:30px;
  line-height: 30px;
}
.avatar .el-button{
  height:24px;
  line-height: 2px;
}
.avatar-img{
  width: 80px;
  height: 80px;
  background-color: #eee;
  border: 1px solid #999;
  border-radius: 5px;
  margin: auto;
  overflow: hidden;
  margin-bottom: 12px;
}
</style>