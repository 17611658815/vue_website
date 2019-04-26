<template>
    <div class="answerpage">
        <van-list :finished="loading" @load="onReachBottom">
        <!-- 页面标题 -->
        <herder-title :title="answerObj.ask.title" :isback='true'></herder-title>
        <div class='headerContainer'>
            <div>{{answerObj.ask.title}}</div>
            <div>{{answerObj.ask.created}}</div>
            <div>问题描述</div>
            <div>{{answerObj.ask.question}}</div>
            <div>医生回答</div>
            <doctor-info :docinfo='answerObj.doctor'></doctor-info>
            <div class='headerContainer_answer'>{{answerObj.ask.answer}}</div>
        </div>
        <answers-module :answersList='answerObj.relevant' @changeIds="upPageid" :isSelf='true'></answers-module>
        <!-- <div class='bottomTost' v-if='on_off'>到底了~</div> -->
        </van-list>
    </div>  
</template>

<script type="text/ecmascript-6">
    import doctorInfo from "@/components/doctorInfo/doctorInfo";
    export default {
        name:"answersDetaile",
        data() {
            return {
                answerObj:{
                    ask:{},
                    doctor:{},
                    relevant:[]
                },
                id:'',
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
                console.log('监听')
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                this.page = 1;
                this.on_off = false; 
                this.answerObj.ask = {};
                this.answerObj.doctor = {};
                this.answerObj.relevant = [];
                this.getAnswerDetailsList();
            },
            immediate: true
        },
        methods: {
            // 获取视频信息
            getAnswerDetailsList(){
                let params = new Object();
                params.id = this.id;
                this.LoadingUtils.showLoading('加载中');
                this.$Api.getAnswerDetails(params).then(data => {
                    this.answerObj = data
                    this.LoadingUtils.hideLoading();
                })
            },
            // 接收子组件参数
            upPageid(e){
                console.log(e)
                this.title = e.title;
                this.id  = e.id;
            },
            onReachBottom(){
                let params = new Object();
                if(this.on_off){
                    return
                }
                this.loading = true;
                this.page++;
                params.id = this.id;
                params.page = this.page;
                this.LoadingUtils.showLoading('加载中');
                this.$Api.getAnswerDetails(params).then(data => {
                    if(data.relevant.length>0){
                        for (let i = 0; i < data.relevant.length; i++) {
                            this.answerObj.relevant.push(data.relevant[i])
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
    .answerpage{
        width: 100%;
        min-height: 100vh;
    }
    .van-list{
        width: 100%;
        height: 100%;
    }
    .headerContainer{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background: #ffffff;
        margin-bottom: 20px;
    }
    .headerContainer div{
        width: 95%;
    }
    .headerContainer div:nth-child(1){
        font-size:34px;
        color:#000000;
        margin-top:50px;
    }
    .headerContainer div:nth-child(2){
        font-size:25px;
        margin-top:20px;
        color:#999999;
    }
    .headerContainer div:nth-child(3){
        font-size:34px;
        color:#000000;
        margin-top:40px;
    }
    .headerContainer div:nth-child(4){
        font-size:28px;
        margin-top:18px;
        color:#666666;
        padding-bottom:40px;
        line-height:1.5;
        border-bottom:1px solid #e2e2e2;
    }
    .headerContainer div:nth-child(5){
        font-size:34px;
        margin:50px 20px 0;
        color:#000000;
    }
    .headerContainer .headerContainer_answer{
        font-size:28px;
        color:#666666;
        text-indent:2em;
        line-height:1.8;
        letter-spacing:1px;
        padding-bottom:50px;
    }



</style>
