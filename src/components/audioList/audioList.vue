<template>
    <div class="audioPage" v-if='audioList.length>0'>
       <div class='audioContainer' @click="goaudioDetails(item.id,item.title)" v-for='(item,index) in audioList' :key="item.id">
            <div class='recommendation' v-if='isSelf && index==0'>
                相关音频
            </div>
            <div class='audioTitle'>
                <img src="@/assets/images/icon_6.png">
                <div>{{item.title}}</div>
            </div>
            <div class='audioTxt'>
                <img src="@/assets/images/icon_7.png">
               <div class='audioTxt_left'>
                   <div>
                       <img src="@/assets/images/icon_8.png">
                   </div>
                   <div>语音时长</div>
                   <div>{{item.yinpin_duration}}</div>
               </div>
               <div class='audioTxt_right'>
                   <img src="@/assets/images/headset.png">
                    <span>{{item.pv}}</span>
               </div>
            </div>
            <div class='doctorInfo'>
                <span class='doctor_Pic' v-if='item.doctor != false'>
                    <img :src="item.doctor.avatar">
                </span>
                <span class='doctor_name'>{{item.doctor.name}}</span>
                <span class='doctor_position'>{{item.doctor.position}}</span>
                <span class='doctor_hospital'>{{item.doctor.hospital}}</span>
            </div>
        </div>
    </div>
    <div class="audioPage" v-else>
        没数据
    </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {

            }
        },
        props:{
            audioList:{
                type:Array
            },
            isSelf:{
                type:Boolean
            }
        },
        methods: {
            changeId(param){
                this.$emit("changeIds",param)
            },
            goaudioDetails(id,title){
                let param = new Object();
                    param.id = id;
                    param.title = title;
                if(this.isSelf){
                    this.changeId(param)
                }else{
                    this.$util.router_push(this,'audioDetails',param)
                }
            }    
        },
        components: {

        }
    }
</script>

<style scoped lang="scss">
    .audioPage{
        width: 100%;
        background: #fff;
    }
    .audioContainer{
        width: 95%;
        border-bottom: 1px solid #e2e2e2;
        margin: auto;
        padding: 30px 0;
    }
    .audioTitle,
    .audioTxt{
        width: 100%;
        display: flex;
    }
    .audioTxt{
        padding: 20px 0;
        font-size:28px;
        color:#666666;
        display: flex;
    }
    .audioTxt_left{
        width:424px;
        height:64px;
        display:flex;
        justify-content:center;
        align-items:center;
        background:#f3f3f3;
        border-radius:8px;
    }
     .audioTxt_left div{
         margin-left: 20px;
     }
    .audioTxt_left div:nth-child(1)>img{
        width: 32px;
        height: 32px;
        vertical-align: middle;
    }
    .audioTxt_left div:nth-child(2){
       font-size:24px;
       color:#333333;
    }
    .audioTxt_left div:nth-child(3){
       font-size:24px;
       color:#f19536;
    }
    .audioTxt_right{
        display: flex;
        justify-content: center;
        align-items: center;
        margin-left: 50px;
        font-size:22px;
        color:#999999;
    }
    .audioTitle img{
        width: 30px;
        height: 35px;
        margin-right: 20px;
    }
    .audioTxt>img{
        width: 30px;
        height: 35px;
        margin-right: 20px;
    }
    .audioTxt_right img{
        width:40px;
        height:22px;
        margin-right: 10px;
    }
    .audioTitle{
        font-size: 32px;
        align-items: center;
        vertical-align: middle;
    }
   
</style>
