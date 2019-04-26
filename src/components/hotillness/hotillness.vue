/** 
    title  @String 自定义标题；
    isicon @Boolean 控制icon图片显示隐藏；
    type   @Number 判断是从哪里点进的疾病详情 0 首页；1 视频；2 问答；3 文章；4 音频；
    inllnessList @Array 热门疾病
*/

<template>
    <!-- 热门疾病 -->
    <div class="inllness">
        <!-- <button @click="method1">显示传值</button> -->
        <div class='inllnessContainer'>
            <div class='inllness_title'>
                <div>
                    <img v-if='isicon' src="@/assets/images/icon_5.png" alt="">
                    <div>{{title}}</div>
                </div>
                <div @click="goalldisease">更多 > </div>
            </div>
            <span v-for='item in inllnessList' @click="goillnessDetails(type,item.id,item.name)" :key="item.id">
                {{item.name}}
            </span>
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
            title:{
                type:String
            }, 
            inllnessList:{
                type:Array
            },
            isicon:{
                 type:Boolean
            },
            type:{
                type:Number
            }
        },
        methods: {
            // 判断跳转选项
            goillnessDetails(type,id,name){
                let data = new Object();
                data.type = type;
                data.id = id;
                data.name = name
                console.log(data)
                switch (type) {
                    case 0:
                        console.log('主页')
                        this.$util.router_push(this,'illnessDetails',data)
                        break;
                    case 1:
                        console.log('视频')
                        this.$util.router_push(this,'illnessDetails',data)
                        break;
                    case 2:
                        console.log('问答')
                        this.$util.router_push(this,'illnessDetails',data)
                        break;
                    case 3:
                        console.log('文章')
                        this.$util.router_push(this,'illnessDetails',data)
                        break;
                    case 4:
                        console.log('音频')
                        this.$util.router_push(this,'illnessDetails',data)
                        break;
                }
            },
            goalldisease(){
                this.$util.router_push(this,'alldisease')
            },
            method1() {
                //使用on老监听事件
                console.log('接收')
				eventBus.$on('eventBusName', function(val) {　
					console.log("这个是用transimissiontwo的val值为："+val)
				})
			}
        },
        components: {

        }
    }
</script>

<style scoped lang="scss">
    
    .inllness{
        width: 100%;
        background: #ffffff;
        margin-bottom: 20px;
    }
    .inllnessContainer{
        width: 96%;
        margin: auto;
        display: flex;
        align-content: center;
        justify-content: space-around;
        flex-wrap: wrap;
        background: #ffffff;
    }
    .inllnessContainer span{
        width: 21%;
        text-align: center;
        height: 70px;
        line-height: 70px;
        overflow: hidden;
        background: #f8f8f8;
        margin-bottom: 20px;
    }
    .inllness_title{
        width: 95%;
        margin: auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
    }
    .inllness_title img{
        width: 48px;
        height: 45px;
        vertical-align: middle;
        margin-right: 20px;
    }
    .inllness_title>div:nth-child(1){
        flex: 1;
        display: flex;
        align-items: center;
        font-size:36px;
        color:#333333;
        font-weight:600;
    }
    .inllness_title>div:nth-child(2){
        font-size:24px;
        line-height:100px;
        color:#999999;
    }
   
</style>
