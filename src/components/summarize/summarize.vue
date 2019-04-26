<template>
    <div class="page">
         <!-- 疾病简介 -->
        <div class='synopsis'>
            <div v-if='unfold'>
                {{Gdata.illness.introduction}}<span @click="Clickunfold" style="color:#6ea8f7">收起</span>
            </div>
                <div v-else>
                {{sliceIntroduction}}... <span @click="Clickunfold" style="color:#6ea8f7">展开</span>
            </div>
        </div>
        <!-- 就医指南 -->
        <div class="handbook">
            <div class='handbook_title'> 
                <img src="@/assets/images/icon_9.png">
                <span>就医指南</span>
            </div>
            <!-- 展开状态 -->
            <div v-if='handbookunfold'>
                <div class='handbook_item' v-for='(item,index) in attr' :key="index">
                    <span class='handbook_item_name'>{{item.name}}</span>
                    <span>:</span>
                    <span class='handbook_item_val' style="color:#909999">{{item.val}}</span>
                    <span class='span_up' @click="Clickhandbookunfold" v-if='item.name == "是否属于医保"' style="color:#6ea8f7">收起</span>
                </div>
            </div>
            <!-- 收起状态 -->
            <div v-else>
                <div class='handbook_item' v-for='(item,index) in sliceAttr' :key="item.name">
                    <span class='handbook_item_name'>{{item.name}}</span>
                    <span>:</span>
                    <span class='handbook_item_val' style="color:#909999">{{item.val}}</span>
                    <span class='span_up' v-if='index==4' @click="Clickhandbookunfold" style="color:#6ea8f7">展开</span>
                </div>
            </div>
        </div>
        <!-- 视频-音频-文章-问答 -->
        <div class='videoModule' v-if='Gdata.shipin.length >0'>
            <div class='moduleTitle'>
                <div><img src="@/assets/images/icon_12.png" alt=""> <span>视频</span> </div>
                <div @click="swatchtab(1)">更多 > </div>
            </div>
            <video-module :videoList='Gdata.shipin' :isSelf='false'></video-module>
        </div>
        <div class='askModule' v-if='Gdata.ask.length >0'>
            <div class='moduleTitle'>
                <div><img src="@/assets/images/icon_10.png" alt=""> <span>问答</span> </div>
                <div @click="swatchtab(2)">更多 > </div>
            </div>
             <answers-module :answersList='Gdata.ask'></answers-module>
        </div>
        <div class='articleModule' v-if='Gdata.article.length >0'>
            <div class='moduleTitle'>
                <div><img src="@/assets/images/icon_11.png" alt=""> <span>文章</span> </div>
                <div @click="swatchtab(3)">更多 > </div>
            </div>
             <article-module :articleList='Gdata.article' :isSelf='false'></article-module>
        </div>
        <div class='audioModule' v-if='Gdata.yinpin.length >0'>
            <div class='moduleTitle'>
                <div><img src="@/assets/images/icon_8.png" alt=""> <span>音频</span> </div>
                <div @click="swatchtab(4)">更多 > </div>
            </div>
            <audio-module :audioList='Gdata.yinpin' :isSelf='false'></audio-module>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                unfold:false,
                handbookunfold:false
            }
        },
        props: {
            swatchtab:{
                type:Function
            },
            Gdata:{
                type:Object
            },
            //展开前就医指南
            sliceAttr:{
                type:Array
            },
            //展开后就医指南
            attr:{
                type:Array
            },
            sliceIntroduction:{
                type:String
            }
        },
        methods: {
            Clickunfold(){
                this.unfold = !this.unfold
            },
            Clickhandbookunfold(){
                this.handbookunfold = !this.handbookunfold
            },
            more(e){
                this.$emit("swatchtab",e)
            }
        },
        components: {

        }
    }
</script>

<style scoped lang="scss">
    .synopsis{
        background: #FFFFFF;
        padding: 20px 0;
    }
    .synopsis div{
        width: 92%;
        margin: auto;
        font-size:28px;
        padding-bottom:27px;
        border-bottom:1px solid #e2e2e2;
    }
    .handbook{
        width: 100%;
        padding-bottom: 30px;
        display: flex;
        align-items: center;
        flex-direction: column;
        background: #FFFFFF;
    }
    .handbook_title{
        width: 95%;
        font-size:32px;
        color:#000000;
        font-weight:500;
        display: flex;
        align-items: center;
    }
    .handbook_title img{
        width:35px;
        height:35px;
        margin-right: 20px;
        vertical-align: middle;
    }
    .handbook>div{
       width: 95%;
    }
    .handbook_item{
        width: 95%;
        display:flex;
        font-size:28px;
        margin-top:20px;
    }
    .handbook_item .handbook_item_name{
         white-space:nowrap;
    }
    .handbook_item .handbook_item_val{
        white-space:nowrap;
        overflow: hidden;
        text-overflow:ellipsis;
    }
    .span_up{
        margin-left: 20px;
    }
    .videoModule,
    .askModule,
    .articleModule,
    .audioModule{
        width: 100%;
        background: #FFFFFF;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 20px;
    }
    .moduleTitle{
        width: 95%;
        padding-top: 20px;
        color:#000000;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .moduleTitle img{
        width: 34px;
        height: 34px;
        margin-right: 20px;
        vertical-align: middle;
    }
    .moduleTitle>div:nth-child(1){
        display: flex;
        font-size:32px;
        align-items: center;
    }
    .moduleTitle>div:nth-child(2){
        font-size:26px;
        color:#999999;
    }            
</style>
