<template>
    <div class="articleDetailesPage">
        <!-- 页面标题 -->
        <herder-title :title="articleObj.article.title" :isback='true'></herder-title>
        <div class='headerContainer'>
            <div class="titleTxt">
                <div>{{articleObj.article.title}}</div>
                <div>{{articleObj.article.created}}</div>
                <doctor-info :docinfo='articleObj.doctor'></doctor-info>
                <div class='txtMsg' v-html="content"></div>
            </div>
        </div>
        <van-list 
            v-model="loading" 
            @load="onReachBottom()" 
            :finished="on_off" 
            finished-text="没有更多了">
            <article-module :articleList='articleObj.relevant' @changeIds="upPageid" :isSelf='true'></article-module>
        </van-list>
    </div>
</template>

<script type="text/ecmascript-6">
    import doctorInfo from "@/components/doctorInfo/doctorInfo";
    export default {
        name:'articleDetailesPage',
        data() {
            return {
                articleObj:{
                    article:{},
                    doctor:{},
                    relevant:[]
                },
                content:'',
                id:'',
                page:1,
                on_off:false,
                loading:false

            }
        },
        activated () {
            this.id = this.$route.query.data.id;
            this.LogUtils.log(this.$route.query.data);
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
                this.articleObj.article = {};
                this.articleObj.doctor = {};
                this.articleObj.relevant = [];
                this.getArticleDetailsList();
            },
            immediate: true
        },
        methods: {
            // 获取视频信息
            getArticleDetailsList(){
                let params = new Object();
                params.id = this.id;
                this.LoadingUtils.showLoading('加载中');
                this.$Api.getArticleDetails(params).then(data => {
                    this.LogUtils.log(data);
                    this.content = data.article.content.replace(/<\/?(img|a)[^>]*>/gi, ''); //过滤img标签
                    this.articleObj = data;
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
                this.$Api.getArticleDetails(params).then(data => {
                    if(data.relevant.length>0){
                        data.relevant.forEach((item)=>{
                            this.articleObj.relevant.push(item)
                        })
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

<style scoped lang='scss'>
    .articleDetailesPage{
        width: 100%;
        min-height: 100vh;
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
    .titleTxt{
        width: 92%;
        padding: 36px 0 50px 0;
        
    }
    .titleTxt div:nth-child(1){
        font-size:36px;
        color:#000000;
        margin-bottom:10px;

    }
    .titleTxt div:nth-child(2){
        padding: 20px 0 40px 0;
        font-size:26px;
        color:#999999;
        border-bottom:1px solid #e2e2e2;
    }
    .txtMsg{
        width: 100%;
        font-size: 0.373333rem;
        color: #666666;
        text-indent: 2em;
        line-height: 1.8;
        letter-spacing: 0.013333rem;
        padding-bottom: 0.666667rem;
        
    }
</style>
