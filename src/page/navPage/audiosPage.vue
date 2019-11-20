<template>
    <div class='audiosPage'>
            <herder-title :title="title" :isback='true'></herder-title>
            <div class='imgBox'>
                <img src="@/assets/images/yp-banner.jpg" alt="">
            </div>
            <!-- 疾病列表 -->
            <hotillness :inllnessList='inllnessList' :title="illnessTitle" :type='4' :isicon='true'></hotillness>
        <van-list 
            v-model="loading" 
            @load="loadMore()" 
            :finished="on_off" 
            finished-text="没有更多了">
            <!-- 音频列表 -->
            <audio-module :audioList='audioList' :isSelf='false'></audio-module>
        </van-list>
    </div>
</template>

<script>
    export default {
        name:'audiosPage',
        data() {
            return {
                page:1, //分页
                on_off:false,//下拉开关
                loading:false,
                title:'专家音频',
                illnessTitle:'按疾病找音频',
                inllnessList:[],
                audioList:[],
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
                this.$Api.getDoctoraudio(params).then(data => {
                    if(data.illness){
                        this.inllnessList = data.illness
                    }
                    if(data.list.length>0){
                        data.list.forEach((val) => {
                            this.audioList.push(val)
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
                if(this.on_off && !this.loading){
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
    .audiosPage{
        width: 100%;
        min-height: 100vh;
    }
</style>