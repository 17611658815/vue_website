<template>
    <div class="videoPage">
      <van-list :finished="loading" @load="onReachBottom">
            <!-- 页面标题 -->
            <herder-title :title="videoObj.shipin.title" :isback='true'></herder-title>
            <!-- 视频部分 -->
            <video id='video' :src="videoObj.shipin.shipin" controls :poster='videoObj.shipin.thumb'></video>
            <div class='videoText'>
                <div class='videoText_auto'>
                    <h1>{{videoObj.shipin.title}}</h1>
                    <div class='videoText_created'>
                        <span>{{videoObj.shipin.created}}</span>
                        <span>{{videoObj.shipin.tote}}人播放</span>
                    </div>
                    <!-- 医生信息 -->
                    <doctor-info :docinfo='videoObj.doctor'></doctor-info>
                    <!-- 视频信息 -->
                    <div class='txtMsg'>
                        <div class='txtMsg_title'>视频内容</div>
                        <div class='txtMsg_P' v-html="videoObj.shipin.content"></div>
                    </div>
                </div>
            </div>
            <video-module :videoList='videoObj.relevant' @changeIds="upPageid" :isSelf='true'></video-module>
            <div class='bottomTost' v-if='on_off'>到底了~</div>
        </van-list>
    </div>
</template>

<script type="text/ecmascript-6">
    import doctorInfo from "@/components/doctorInfo/doctorInfo";
    export default {
        data() {
            return {
                /**
                 * 异步接收返回数据
                 * 如果直接videoObj = data 会报错
                 * 因为异步返回赋值的时候 赋值给 data 数据的信息是不带有 子对象类型标识 
                 * 所以要在data 中先定义子对象名称并确定为对象类型，这样才可以保证不报错，
                 * */ 
                videoObj:{
                    shipin:{},
                    doctor:{},
                    relevant:[]
                },
                id:'',
                title:'',
                page:1,
                on_off:false,
                loading:false
            }
        },
        activated () {
            this.id = this.$route.query.data.id;
            this.LogUtils.log(this.$route.query.data);
            this.LogUtils.log('page=='+this.page);
        },
        watch: {
            id(val){
                /**
                 * 监听id变化 重新加载页面
                 * 初始化时数据
                 * */ 
                this.LogUtils.log('监听')
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                this.page = 1;
                this.on_off = false; 
                this.videoObj.shipin = {};
                this.videoObj.doctor = {};
                this.videoObj.relevant = [];
                this.getVideoDetailsList();
            },
            immediate: true
        },
        methods: {
            // 获取视频信息
            getVideoDetailsList(){
                let params = new Object();
                params.id = this.id;
                this.LoadingUtils.showLoading('加载中');
                this.$Api.getVideoDetails(params).then(data => {
                    this.videoObj = data
                    this.LoadingUtils.hideLoading();
                })
            },
            // 接收子组件参数
            upPageid(e){
                this.LogUtils.log(e)
                this.title = e.title;
                this.id  = e.id;
            },
            // 触底
            onReachBottom(){
                this.LogUtils.log('下拉加载++')
                let params = new Object();
                if(this.on_off){
                    return
                }
                this.loading = true;
                this.page++
                params.id = this.id;
                params.page = this.page
                this.LoadingUtils.showLoading('加载中');
                this.$Api.getVideoDetails(params).then(data => {
                    if(data.relevant.length>0){
                        for (let i = 0; i < data.relevant.length; i++) {
                            this.videoObj.relevant.push(data.relevant[i])
                        }
                        this.loading = false;
                    }else{
                        this.on_off = true
                    }
                    this.LoadingUtils.hideLoading();
                })
            },
        },
        components: {
            'doctor-info':doctorInfo
        }
    }
</script>

<style scoped lang="scss">
    .videoPage{
        width: 100%;
        min-height: 100vh;
    }
    #video{
        width: 100%;
        object-fit: fill;//视频平铺
    }
    .videoText{
        width: 100%;
        min-height: 200px;
        background: white;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .videoText_auto{
        width: 90%;
        padding: 30px 0;
    }
    .videoText_created{
        font-size: 26px;
        color: #999999;
        padding: 20px 0;
    }
    .txtMsg_title{
        font-weight: 500;
        font-size: 32px;
        margin: 20px 20px;
    }
    .txtMsg_P{
        font-size: 28px;
        color: #333;
        line-height: 53px;
        text-align: left;
        text-indent: 2em;
        padding-bottom: 5px;
    }
    .txtMsg_P > p{
        padding-bottom: 50px;
    }
    .bottomTost{
        width: 100%;
        text-align: center;
        height: 60px;
        line-height: 60px;
        font-size: 32px;
        background: #ffffff;
    }
</style>
