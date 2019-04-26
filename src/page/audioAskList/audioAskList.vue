<template>
    <div class="page">
        <herder-title :title="title" :isback='true'></herder-title>
        <van-tabs class="swatchTab" title-active-color='#6ea8f7' title-inactive-color='#333333' v-model="active" swipeable sticky>
            <van-tab v-for="(item,index) in tabArry" :title="item" :key="index">
                <component :is="contentView"></component> <!--:is实现多个组件实现同一个挂载点-->
            </van-tab>
        </van-tabs>
    </div>
</template>

<script type="text/ecmascript-6">
    import tabitem1 from "@/page/audioAskList/tab_item/tab_item_1";//全部
    import tabitem2 from "@/page/audioAskList/tab_item/tab_item_2";//审核中
    import tabitem3 from "@/page/audioAskList/tab_item/tab_item_3";//未通过
    import tabitem4 from "@/page/audioAskList/tab_item/tab_item_4";//已通过
    export default {
        data() {
            return {
                title:'我的有声问答',
                contentView:'tabitem1',//默认展示第一个组件
                active:0,
                tabArry:['全部','审核中','未通过','已通过']
            }
        },
        components: {
            tabitem1,
            tabitem2,
            tabitem3,
            tabitem4,
        },
        watch: {
            active(val){
               switch (val) {
                    case 0:
                        this.contentView = "tabitem1";
                        break;
                    case 1:
                        this.contentView = "tabitem2";
                        break;
                    case 2:
                        this.contentView = "tabitem3";
                        break;
                    case 3:
                        this.contentView = "tabitem4";
                        break;
                }
            }
        },
        
    }
</script>

<style lang='scss'>
    .van-tabs__line{
        z-index: 1;
        left: 0;
        bottom: 0.2rem;
        height: 0.05rem;
        position: absolute;
        border-radius: 0.04rem;
        background-color: #6ea8f7!important;
    }
    .van-tabs--line .van-tabs__wrap{
        height: 80px!important;
        padding: 0;
    }
    .van-tabs__content{
        margin-top: 40px;
    }
    .van-ellipsis{
        height: 100%;
        line-height: 80px;
        font-size: 30px;
        font-weight: 500;
    }
    .van-tabs__wrap{
        position: fixed;
        top: 90px;
        left: 0;
    }
</style>
