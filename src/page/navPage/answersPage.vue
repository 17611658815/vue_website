<template>
    <div id='answerPages'>
            <herder-title :title="title" :isback='true'></herder-title>
            <div class='imgBox'>
                <img src="@/assets/images/wd-banner.jpg" alt="">
            </div>
            <!-- 疾病列表 -->
            <hotillness :inllnessList='inllnessList' :title="illnessTitle" :type='2' :isicon='true'></hotillness>
            <van-list 
                v-model="loading" 
                @load="loadMore()" 
                :finished="on_off" 
                finished-text="没有更多了">
            <!-- 问答列表 -->
            <answers-module :answersList='answersList'></answers-module>
        </van-list>
    </div>
</template>

<script>
    export default {
        name:'answersPage',
        data() {
            return {
                page:1, //分页
                on_off:false,//下拉开关
                loading:false,
                title:'名医问答',
                illnessTitle:'按疾病找问答',
                inllnessList:[],
                answersList:[],
            }
        },
        mounted () {
            this.loadList()
        },
        methods: {
            //获取主页视频
            loadList(){
                let params = new Object();
                params.page = this.page;
                this.LoadingUtils.showLoading('加载中');
                this.$Api.getDoctoranswers(params).then(data => {
                    if(data.illness){
                        this.inllnessList = data.illness
                    }
                    if(data.list.length>0){
                        data.list.forEach((val) => {
                            this.answersList.push(val)
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
                    this.LogUtils.jsonLog('没数据了....')
                    this.loading = true;
                    this.loadList();
                }
            },

        },
        components: {

        }
    }
</script>

<style scoped lang="scss">
     #answerPages{
        width: 100%;
        min-height: 100vh;
    }
</style>
