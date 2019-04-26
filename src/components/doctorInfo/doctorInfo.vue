<template>
    <div class="page">
        <div class='DocInfo'>
            <div class='DocInfo_pic'>
                <img :src="docinfo.avatar" alt="">
            </div>
            <div class='DocInfo_text'>
                <p>
                    <span>{{docinfo.name}}</span>
                    <span>{{docinfo.position}}</span>
                </p>
                <p>
                    <span>{{docinfo.hospital}}</span>
                    <span>{{docinfo.department}}</span>
                </p>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {

            }
        },
        props: {
            // 医生信息
            docinfo:{
                type:Object
            }
        },
        components: {

        }
    }
</script>

<style scoped lang="scss">
    .DocInfo{
        width: 100%;
        padding: 30px 0;
        display: flex;
        align-items: center;
    }
      
    .DocInfo_pic img{
        width: 72px;
        height: 72px;
        border-radius: 50%;
    }
    .DocInfo_text{
        flex: 1;
        margin-left: 20px;
    }
    .DocInfo_text p:nth-child(1)>span:nth-child(1){
        font-size: 32px;
        font-weight: 500;
    }
    .DocInfo_text p:nth-child(1)>span:nth-child(2){
        font-size: 26px;
        padding-left: 10px;
    }
    .DocInfo_text p:nth-child(2){
        margin-top: 10px;
    }
    .DocInfo_text p:nth-child(2)>span{
        font-size: 26px;
        padding-right: 10px;
        color: #999999;
    }
</style>
