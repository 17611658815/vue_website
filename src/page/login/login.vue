<template>
    <div class="login">
        <!-- mfk logo -->
        <div class='mfklogo'>
            <img src="@/assets/images/mfk.png" alt="">
        </div>
        <div class='loginContiiner'>
            <!-- 手机号 -->
            <div class='phone_item'>
                <span>
                    <i class='icon iconfont icon-mobilephone'></i>
                </span>
                <input type='number' placeholder="请输入手机号" v-model="phone">
            </div>
            <!-- 验证码 -->
             <div class='password_item'>
                <span>
                    <i class='icon iconfont icon-lock'></i>
                </span>
                <input type="number" placeholder="请输入验证码" v-model="password"><span>获取验证码</span>
            </div>
        </div>
        <button class='loginBtn' @click="goHomePage">登录</button>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name:"login",
        data() {
            return {
                phone:'',//手机号
                password:'',//验证码
                popupVisible:false
            }
        },
       
        methods: {
            goHomePage(){
                console.log(this.ToastUtils)
                if(this.phone==''){
                    this.ToastUtils.showToast('请输入手机号');
                }else if(this.password == ''){
                    this.ToastUtils.showToast('请输入验证码');
                }else{
                    this.popupVisible = !this.popupVisible
                    this.StorageUtils.setStringData("TokenID",this.phone);
                    this.$util.router_push(this,'home')
                }
              
            }
        },
        components: {

        }
    }
</script>

<style scoped lang="scss">
    @import '@/assets/scss/color.scss';
    .login{
        height: 100vh;
        background: white;
        text-align: center;
    }
    .mfklogo{
        padding: 200px 0 50px 0;
    }
    .mfklogo img{
        width: 150px;
        height: 150px;
        border-radius: 50%;
    }
    i{
        font-size: 50px;
    }
    input{
        border: none;
        background: none;
        flex: 1;
        height: 100%;
        margin-left: 20px;
        font-size: 30px;
        color: gray;
    }
    .loginContiiner{
        width: 80%;
        margin: auto;
    }
    .loginContiiner div{
        display: flex;
        height: 100px;
        align-items: center;
        border-bottom: 1px solid #D1D1D1;
    }
    .loginBtn{
        width: 80%;
        height: 90px;
        margin: 80px auto;
        border-radius: 20px;
        border: none;
        color: #ffffff;
        background:$main_style_color;
    }
</style>
