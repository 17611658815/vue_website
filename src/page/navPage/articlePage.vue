<template>
    <div class='articlePage'>
        <herder-title :title="title" :isback='true'></herder-title>
        <div class='imgBox'>
            <img src="@/assets/images/wz-banner.jpg" alt="">
        </div>
        <!-- 疾病列表 -->
        <hotillness :inllnessList='inllnessList' :title="illnessTitle" :type='3' :isicon='true'></hotillness>
            <!-- 文章列表 -->
        <van-list 
            v-model="loading" 
            @load="loadMore()" 
            :finished="on_off" 
            finished-text="没有更多了">
            <article-module :articleList='articleList' :isSelf='false'></article-module>
        </van-list>
    </div>
</template>

<script>
    export default {
        name:'articlePage',
        data() {
            return {
                page:1, //分页
                on_off:false,//下拉开关
                loading:false,
                title:'专家文章',
                illnessTitle:'按疾病找文章',
                inllnessList:[],
                articleList:[],
            }
        },
        mounted () {
            this.loadList()
        },
        methods: {
            //获取主页视频
            loadList(){
                let params = new Object();
                params.page = this.page
                this.LoadingUtils.showLoading('加载中');
                this.$Api.getDoctorarticle(params).then(data => {
                    if(data.illness){
                        this.inllnessList = data.illness
                    }
                    if(data.list.length>0){
                        data.list.forEach((val) => {
                            this.articleList.push(val)
                        })
                        this.loading = false;
                    }else{
                        this.loading = false;
                        this.on_off = true
                    }
                    this.LogUtils.jsonLog(data)
                    this.LoadingUtils.hideLoading();
                })
             },
            //加载更多
            loadMore(){
                if(this.on_off){
                    this.loading = false;
                    return
                    this.LogUtils.jsonLog('没数据了....');
                }else{
                    this.loading = true;
                     this.page++
                    this.loadList()
                   
                }
            },
        },
        components: {

        }
    }
</script>

<style scoped lang="scss">
    .articlePage{
        width: 100%;
        min-height: 100vh;
    }
</style>