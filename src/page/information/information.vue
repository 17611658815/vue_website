<template>
    <div>
        <!-- 头像信息 -->
        <div class='headerUserinfo'>
            <div class='userInfobox'>
                <div class='userinfo'>
                    <img src="@/assets/images/mfk.png"> 
                    <div class="userinfo_item">
                        <p>五年</p>
                        <p>{{phone}}</p>
                    </div>
                </div>
                <div class='rightPic'>
                    <img src="@/assets/images/icon_right.png">
                </div>
            </div>
        </div>
        <div class="personal_center">
            <div class='personal_center_item' v-for='item in centeritem' :key="item.name">
                <router-link class='personal_center_item' :to='{name:item.name}'>
                    <span><img :src="item.icon" alt=""></span>
                    <div class='righText'><span>{{item.text}}</span>
                        <img src="@/assets/images/icon_right_gray.png">
                    </div>
                </router-link>
            </div>
        </div>
        <button @click="logOut">退出登录</button>
    </div>
</template>

<script>
    export default {
        name:'information',
        data() {
            return {
                title:'我的',
                phone:'',
                centeritem:[
                    {
                        name:'audioAskList',
                        icon:require("@/assets/images/icon_2.png"),
                        text:'有声问答'
                    },
                    {
                        name:'upimages',
                        icon:require("@/assets/images/icon_1.png"),
                        text:'意见反馈'
                    },
                    {
                        name:'articlePage',
                        icon:require("@/assets/images/icon_3.png"),
                        text:'客服电话'
                    },
                    {
                        name:'audioDetails',
                        icon:require("@/assets/images/icon_3.png"),
                        text:'音频详情'
                    },
                    {
                        name:'recording',
                        icon:require("@/assets/images/icon_3.png"),
                        text:'音频录制'
                    }
                ]
            }
        },
        methods: {
            logOut(){
                this.LoadingUtils.showLoading('注销登录');
                this.StorageUtils.removeItemData('TokenID')
                setTimeout(()=>{
                    this.LoadingUtils.hideLoading();
                    this.ToastUtils.showToast('注销成功');
                    this.phone = this.StorageUtils.getStringData("TokenID")
                    setTimeout(()=>{
                         this.$util.router_push(this,'login')
                    },1000)
                },4000)
            }, 
        },
        created() {
            this.phone = this.StorageUtils.getStringData("TokenID")
            console.log(this.phone)
        },
    }
</script>

<style scoped lang="scss">
    @import '@/assets/scss/color.scss';
    .headerUserinfo{
        width: 100%;
        height: 260px;
        background-color: $main_style_color;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: url('../../assets/images/bg.png');
        background-size: 100% 100%;
    }
    .userInfobox{
        width: 95%;
        padding: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .userinfo{
        display: flex;
        align-items: center;
    }
    .userinfo img{
        width: 130px;
        height: 130px;
        border-radius: 10px;
        border: 5px solid #eee;
    }
    .userinfo_item{
        margin-left: 20px;
    }
    .userinfo_item>P:nth-child(1){
        font-size: 32px;
        color: #ffffff;
    }
    .userinfo_item>P:nth-child(2){
        padding: 8px 10px;
        background: rgba(255,255,255,.1);
        font-size: 18px;
        border-radius: 45px;
        border: 1px solid #eee;
        margin-top: 20px;
        color: floralwhite;
    }
    .rightPic img{
        width: 50px;
        height: 50px;
    }
    .personal_center{
        width:100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    .personal_center>div:nth-child(3){
        margin-top: 20px;
    }
    .personal_center_item{
        width: 100%;
        height: 100px;
        font-size: 30px;
        color: #000000;
        display: flex;
        background: #ffffff;
        align-items: center;
    }
    .personal_center_item img{
       width: 45px;
       height: 45px;
       margin-left: 20px;
    }
    .righText{
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%;
        border-bottom: 1px solid #eee;
        margin-left: 20px;
    }
</style>