<template>
    <div class="illnessPage"> 
        <van-list :finished="loading" @load="loadMore">
            <herder-title :title="title" :isback='true'></herder-title>
            <!-- 标题 导航 定位部分 -->
            <div class='headerBox'>
                <div class='illnessTitle'>
                    <img src="@/assets/images/deer.png" alt=""><span>{{title}}</span>
                </div>
                <div class='swatchTab'>
                    <div v-for='(item,index) in switchArray' @click="switchTab(index)" :key="item">
                        <div class="swiper-tab-list" :class="currentTab==index ? 'active' : ''">
                            {{item}}
                        </div>
                        <div :class='currentTab==index? "borderhover":"border"'></div>
                    </div>
                </div>
            </div>
            <!-- 模块 -->
            <div class='moduleContainer'>
                <!-- 概述 -->
                <summarize v-if='currentTab == 0' :swatchtab="switchTab" :sliceIntroduction='sliceIntroduction' :sliceAttr='sliceAttr' :attr='attr' :Gdata='homeObj'></summarize>
                <!-- 视频 -->
                <video-module v-if='currentTab == 1' :videoList='Gdata[contype[currentTab]]' :isSelf='false'></video-module>
                <!-- 问答 -->
                <answers-module v-if='currentTab == 2' :answersList='Gdata[contype[currentTab]]'></answers-module>
                <!-- 文章 -->
                <article-module v-if='currentTab == 3' :articleList='Gdata[contype[currentTab]]' :isSelf='false'></article-module>
                <!-- 音频 -->
                <audio-module v-if='currentTab == 4' :audioList='Gdata[contype[currentTab]]' :isSelf='false'></audio-module>
            </div>
        </van-list>
    </div>
</template>

<script type="text/ecmascript-6">
    import summarize from '@/components/summarize/summarize';
    export default {
        data() {
            return {
                netName:'',//动态修该接口名称
                illnessId:'',//疾病id
                currentTab:0,//当前选中项
                page:1,//分页
                on_off:false,//分页开关
                loading:false,
                title:'',//标题
                attr:[],//展开后就医指南
                sliceAttr:[],//展开前就医指南
                switchArray:['概述','视频','问答','文章','音频'],
                contype: ['home', 'shipin', 'ask', 'article','yinpin'],
                sliceIntroduction:'',//部分简介
                homeObj:{ //为了不报错 单独把概述内容拎出来
                    shipin: [],
                    ask: [],
                    article: [],
                    yinpin:[]
                },
                Gdata:{
                    /* 
                        这样嵌套 一直警告渲染错误！！
                        home: {
                            illness:{
                                introduction:'',//完整简介
                                // sliceIntroduction:'',//放这里报渲染错误
                            },
                            shipin: [],
                            ask: [],
                            article: [],
                            yinpin:[]
                        }, 
                    */
                    shipin: [],
                    ask: [],
                    article: [],
                    yinpin:[]
                },
            }
        },
        activated(){
            this.LogUtils.log('执行了，activated')
            if(this.$route.query.data.id){ 
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                this.loading = false,
                this.illnessId = this.$route.query.data.id;
                this.currentTab = this.$route.query.data.type;
                this.title = this.$route.query.data.name;
                this.Gdata[this.contype[this.currentTab]] = [];
                this.switchTab(this.currentTab)
            }
        },
        watch: {
        //监听 currentTab 判断展示相对应的内容
            /*    currentTab(val){
                switch (val) {
                        case 0:
                            this.currentTab = val
                            break;
                        case 1:
                            this.currentTab = val
                            break;
                        case 2:
                            this.currentTab = val
                            break;
                        case 3:
                            this.currentTab = val
                            break;
                        case 4:
                            this.currentTab = val
                            break;
                    }
            } 
           */
        },
        created() {
           
        },
        methods: {
             //获取疾病详情
            getIllnessDetaile(currentTab,id){
                let params = new Object();
                params.id = id;
                params.page = this.page;
                this.LoadingUtils.showLoading('加载中');
                this.$Api.getIllnessDetaile(params,this.contype[currentTab]).then(data => {
                    //概述
                    if(this.currentTab==0){
                        this.loading = false
                        this.homeObj = data;//概述内容
                        this.sliceIntroduction = data.illness.introduction.slice(0, 45)//截取45个字
                        this.attr = data.illness.attr;//就医指南数组
                        this.sliceAttr = data.illness.attr.slice(0, 5)
                    }else{
                        if(data[this.contype[currentTab]].length>0){
                            data[this.contype[currentTab]].forEach((val) => {
                                this.Gdata[this.contype[currentTab]].push(val)
                            })
                            this.loading = false
                        }else{
                            this.on_off = true //开启开关
                            this.LogUtils.log('没数据了..')
                        }
                    }
                    // this.LogUtils.jsonLog(this.Gdata[this.contype[currentTab]])
                    // this.LogUtils.jsonLog(data)
                    this.LoadingUtils.hideLoading();
                })
             },
            //tab切换
             switchTab(index){
                 console.log('tab切换')
                 this.currentTab = index;
                 this.page = 1;//分页初始化
                 this.on_off = false //关闭开关
                 document.body.scrollTop = 0;
                 document.documentElement.scrollTop = 0;
                 this.Gdata[this.contype[this.currentTab]] = [];
                 this.getIllnessDetaile(index,this.illnessId)
             },
            //触底加载
             loadMore(){
                 this.LogUtils.log('触底了++')
                 if(this.on_off || this.currentTab == 0){
                    return
                    this.LogUtils.jsonLog('没数据了....');
                }else{
                    this.loading = true
                    this.page++
                    this.getIllnessDetaile(this.currentTab,this.illnessId)
                }
             },
            //点击更多
           /*   moreInfo(e){
                this.LogUtils.log(e)
                this.illnessId = this.$route.query.data.id;
                this.currentTab = e;
                this.page = 1;//分页初始化
                this.on_off = false //关闭开关
                document.body.scrollTop = 0;
                document.documentElement.scrollTop = 0;
                this.title = this.$route.query.data.name;
                this.Gdata[this.contype[this.currentTab]] = [];
                // this.getIllnessDetaile(this.currentTab,this.illnessId)
             } */
        },
        deactivated(){
            this.LogUtils.log('页面卸载了..')
            this.loading = false;
        },
       
        components: {
            'summarize':summarize
        }
    }
</script>

<style scoped lang="scss">
    @import '@/assets/scss/color.scss';
    // .illnessPage{
    //     width: 100%;
    // }
    .van-list{
        width: 100%;
    }
    .headerBox{
        width: 100%;
        position: fixed;
        top: 90px;
        left: 0;
    }
    .illnessTitle{
        width: 100%;
        height: 130px;
        background: $main_style_color;
        display: flex;
        align-items: center;
        color:#FFFFFF;
        font-size:40px;
        font-weight:500;
    }
    .illnessTitle img{
        width: 100px;
        height: 96%;
        margin: 0 40px;
    }
    .swatchTab{
        height: 130px;
        font-size: 32px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background: #FFFFFF;
        box-shadow:0 10px 20px #eee;
    }
    .swatchTab>div{
        position: relative;
    }
    .moduleContainer{
        margin-top: 360px;
    }
</style>
