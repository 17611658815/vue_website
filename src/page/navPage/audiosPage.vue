<template>
    <div class='audiosPage'>
        <van-list :finished="loading" @load="loadMore">
            <herder-title :title="title" :isback='true'></herder-title>
            <div class='imgBox'>
                <img src="@/assets/images/yp-banner.jpg" alt="">
            </div>
            <!-- 疾病列表 -->
            <hotillness :inllnessList='inllnessList' :title="illnessTitle" :type='4' :isicon='true'></hotillness>
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
        created () {
            // this.loadList()
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
                        for(let i = 0 ; i < data.list.length;i++){
                            this.audioList.push(data.list[i])
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
                
                if(this.on_off && !this.loading){
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
    .audiosPage{
        width: 100%;
        min-height: 100vh;
    }
</style>