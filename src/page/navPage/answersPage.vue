<template>
    <div id='answerPages'>
        <van-list :finished="loading" @load="loadMore">
            <herder-title :title="title" :isback='true'></herder-title>
            <div class='imgBox'>
                <img src="@/assets/images/wd-banner.jpg" alt="">
            </div>
            <!-- 疾病列表 -->
            <hotillness :inllnessList='inllnessList' :title="illnessTitle" :type='2' :isicon='true'></hotillness>
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
        created () {
            // this.loadList()
        },
        methods: {
            //获取主页视频
            loadList(){
                let params = new Object();
                params.page = this.page
                this.LoadingUtils.showLoading('加载中');
                this.$Api.getDoctoranswers(params).then(data => {
                    if(data.illness){
                        this.inllnessList = data.illness
                    }
                    if(data.list.length>0){
                        for(let i = 0 ; i < data.list.length;i++){
                            this.answersList.push(data.list[i])
                        }
                        this.loading = false;
                    }else{
                        this.on_off = true
                    }
                    this.LogUtils.jsonLog(data)
                    this.LoadingUtils.hideLoading();
                })
            },
            //加载更多
            loadMore(){
                if(this.on_off){
                    return
                    this.LogUtils.jsonLog('没数据了....');
                }else{
                    this.loading = true;
                    this.loadList()
                    this.page++
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
