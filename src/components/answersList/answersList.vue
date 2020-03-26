<template>
    <div class="answersListpage">
        <div class='answersContainer' 
            v-for='(item,index) in answersList' 
            @click="goanswersDetails(item.id,item.title)" 
            :key="item.id">
            <div class='recommendation' v-if='isSelf && index==0'>
                相关问答
            </div>
            <div class='answerTitle'>
                <img src="@/assets/images/icon_6.png" alt="">
                <div>{{item.title}}</div>
            </div>
            <div class='answerTxt'>
                <img src="@/assets/images/icon_7.png" alt="">
                <div>{{item.question}}</div>
            </div>
            <div class='doctorInfo' v-if='item.doctor != false'>
                <span class='doctor_Pic'>
                    <img :src="item.doctor.avatar" alt="">
                </span>
                <span class='doctor_name'>{{item.doctor.name}}</span>
                <span class='doctor_position'>{{item.doctor.position}}</span>
                <span class='doctor_hospital'>{{item.doctor.hospital}}</span>
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
        methods: {
            changeId(param){
                this.$emit("changeIds",param)
            },
            goanswersDetails(id,title){
                let param = new Object();
                    param.id = id;
                    param.title = title;
                if(this.isSelf){
                    this.changeId(param)
                }else{
                    this.$util.router_push(this,'answersDetaile',param)
                }
            }
        },
        props:{
            answersList:{
                type:Array
            },
            isSelf:{
                type:Boolean
            }
        },
        components: {

        }
    }
</script>

<style scoped lang="scss">
   
    .answersListpage{
        width: 100%;
        background: #fff;
    }
    .answersContainer{
        width: 95%;
        border-bottom: 1px solid #e2e2e2;
        margin: auto;
        padding: 30px 0;
    }
    .answerTitle,
    .answerTxt{
        width: 100%;
        display: flex;
       
    }
    .answerTitle img{
        width: 30px;
        height: 35px;
        margin-right: 20px;
    }
    .answerTxt img{
        width: 30px;
        height: 35px;
        margin-right: 20px;
    }
    .answerTxt{
        padding: 20px 0;
        font-size:28px;
        color:#666666;
    }
    .answerTxt div{
        flex: 1;
        font-size:28px;
        color:#666666;
        word-break:break-all;
        text-overflow:ellipsis;
        display:-webkit-box;
        -webkit-box-orient:vertical;
        -webkit-line-clamp:2;
        overflow:hidden;
        line-height:44px;
    }
    .answerTitle{
        font-size: 32px;
         align-items: center;
    }
</style>
