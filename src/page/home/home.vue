<template>
    <div class="homePage">
       
        <van-list :finished="loading" @load="loadMore">
            <!-- swiper -->
            <div class="swiperContainer">
                <mt-swipe :speed='500' :auto="4000">
                    <mt-swipe-item>
                        <img src="http://img.39yst.com/uploads/mxb/position/20180723063657941.jpg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="http://img.39yst.com/uploads/mxb/position/20180724034718366.jpg">
                    </mt-swipe-item>
                    <mt-swipe-item>
                        <img src="http://img.39yst.com/uploads/mxb/position/20180704105059956.jpg">
                    </mt-swipe-item>
                </mt-swipe>
            </div>
            <!-- 导航部分 -->
            <div class='classNav'>
                <div v-for='item in NavArray' :key="item.name">
                    <router-link class='colorClass' :to="item.name">
                        <img :src="item.icon" alt="">
                        <p>{{item.text}}</p>
                    </router-link>
                </div>
            </div>
            <!-- <van-button type="primary">默认按钮</van-button> -->
            <!-- 热门疾病 -->
            <hotillness :inllnessList='inllnessList' :title='illnessTitle' :type='0' :isicon='false'></hotillness>
            <!-- 视频列表 -->
            <video-module :videoList='videoList' :isSelf='false'></video-module>
         </van-list>
    </div>
</template>

<script>
    export default {
        name: 'home',
        data () {
            return {
                page:1, //分页
                illnessTitle:'热门疾病',
                on_off:false,//下拉开关
                loading:false,
                videoList:[],//视频列表
                inllnessList:[],//热门疾病
                NavArray:[
                    {
                      name:'/videosPage',
                      icon:'https://m.mfk.com/statics/images/icons1.png',
                      text:"科普视频"
                    },
                    {
                      name:'/answersPage',
                      icon:'https://m.mfk.com/statics/images/icons2.png',
                      text:"名医问答"
                    },
                    {
                      name:'/articlePage',
                      icon:'https://m.mfk.com/statics/images/icons3.png',
                      text:"专家文章"
                    },
                    {
                      name:'/audiosPage',
                      icon:'https://m.mfk.com/statics/images/icons4.png',
                      text:"专家音频"
                    }
                ]
            }
        },
        created() {
            this.getHotIllnessList()
        },
        components:{
        },
        methods: {
            //获取主页视频
            getHomeVideo(){
                let params = new Object();
                params.page = this.page
                this.LoadingUtils.showLoading('加载中');
                this.$Api.getHomeVideoList(params).then(data => {
                    if(data.list.length > 0){
                        data.list.forEach((val) => {
                            this.videoList.push(val)
                        })
                        this.loading = false;
                    }else{
                        this.on_off = true;
                    }
                    this.LoadingUtils.hideLoading();
                })
             },
            //下拉加载
            loadMore(){
                if(this.on_off){
                    return
                    this.LogUtils.jsonLog('没数据了....');
                }else{
                    this.loading = true;
                    this.getHomeVideo()
                    this.page++;
                }
            },
            //获取热门疾病
            getHotIllnessList(){
                this.$Api.getHotIllnessList().then(data => {
                    this.inllnessList = data.illness
                })
            },
           
        },
    }
</script>

<style scoped lang='scss'>
     @import '@/assets/scss/color.scss';
    .homePage{
        width: 100%;
        min-height: 100vh;
    }
    .swiperContainer{
        width: 100%;
        height: 350px;
    }
    .swiperContainer img{
        width: 100%;
        height: 100%;
    }
    .classNav{
        width: 100%;
        background: #ffffff;
        padding: 30px 0;
        display: flex;
        align-content: center;
        margin-bottom: 20px;
    }
    .classNav div{
        flex: 1;
        text-align: center;
    }
    .classNav div img{
        width: 100px;
        height: 100px;
    }
    .colorClass{
      color: black
    }
    // 修改van ui按钮样式
    .van-button--primary{
        width: 100%;
        height: 100px;
        background-color: $main_style_color;
        border: 0.013333rem solid $main_style_color;
    }
</style>

