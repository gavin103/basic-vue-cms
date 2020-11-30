<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">注册中心</div>
            <el-form :model="param" :rules="rules" ref="login" label-width="0px" class="ms-content">
                <el-form-item prop="email">
                    <el-input v-model="param.email" placeholder="请输入邮箱名">
                        <el-button slot="prepend" icon="el-icon-message"></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item prop="name">
                    <el-input v-model="param.name" placeholder="请输入用户名">
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
                <el-form-item prop="newPassword">
                    <el-input
                        type="password"
                        placeholder="请再次输入密码"
                        v-model="param.newPassword"
                        @keyup.enter.native="submitForm()"
                        @change="verifyPw()"
                    >
                        <el-button slot="prepend" icon="el-icon-view"></el-button>
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm()">注册</el-button>
                </div>
                <span class="goto-login" @click="gotoLogin()">已有账号</span>
            </el-form>
        </div>
    </div>
</template>

<script>
import { submitRegister } from '../api/index';
export default {
    data: function() {
        return {
            param: {
                email: '',
                name: '',
                password: '',
                newPassword: ''
            },
            rules: {
                email: [{ required: true, message: '请输入邮箱名', trigger: 'blur' }],
                name: [{ required: true, message: '请输入用户', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
                newPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }],
            },
        };
    },
    methods: {
        submitForm() {
            this.$refs.login.validate(valid => {
                if (valid) {
                    const {email,name,password} = this.param
                    if(this.verifyPw()){
                        submitRegister({email,name,password}).then(res=>{
                            if(res.code===0){
                                this.$message.success('注册成功');
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
                }
            });
        },
        gotoLogin(){
            this.$router.push('/login');
        },
        verifyPw(){
            const {password,newPassword} = this.param;
            if(password!==newPassword){
                this.$message.error('两次输入密码不匹配');
                return false
            }else{
                return true
            }
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
.goto-login{
    font-size: 14px;
    color: #409EFF;
    cursor: pointer;
}
</style>