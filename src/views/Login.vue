<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">管理系统</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="email">
                    <el-input v-model="param.email" placeholder="请输入注册邮箱">
                        <el-button slot="prepend" icon="el-icon-user"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        placeholder="请输入密码"
                        v-model="param.password"
                        @keyup.enter.native="submitForm()"
                    >
                        <el-button slot="prepend" icon="el-icon-view"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">登录</el-button>
                </div>
                <span class="goto-register" @click="gotoRegister()">创建账号</span>
            </el-form>
        </div>
    </div>
</template>

<script>
import { submitLogin } from '../api/index';
export default {
    data: function() {
        return {
            param: {
                email: '',
                password: '',
            },
            rules: {
                email: [{ required: true, message: '请输入注册邮箱', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    const {email,password} = this.param
                    submitLogin({email,password}).then(res=>{
                        if(res.code===0){
                            this.$message.success('登录成功');
                            sessionStorage.setItem('user', JSON.stringify(res.data));
                            this.$router.push('/');
                        }else{
                            this.$message.error(res.msg)
                        }
                    }).catch(err=>{
                        this.$message.error(err);
                    })
                } else {
                    this.$message.error('请输入账号和密码');
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        gotoRegister(){
            this.$router.push('/register');
        }
    },
};
</script>

<style scoped>
.login-wrap {
    position: relative;
    width: 100%;
    height: 100%;
    background-size: 100%;
    padding: 200px 0;
}
.ms-title {
    width: 100%;
    line-height: 50px;
    text-align: center;
    font-size: 20px;
    color: #666;
}
.ms-login {
    position: absolute;
    width: 350px;
    left: 0;
    right: 0;
    margin: auto;
    border-radius: 5px;
    box-shadow: 0 0 12px rgba(100, 100, 100, 0.3);
    padding: 24px;
}
.login-btn {
    text-align: center;
}
.login-btn button {
    width: 100%;
    height: 36px;
    margin-bottom: 10px;
}
.goto-register{
    font-size: 14px;
    color: #409EFF;
    cursor: pointer;
}

</style>