<template>
    <div class="articleListpage">
         <div class='articleContainer' @click="goarticleDetails(item.id,item.title)" v-for='(item,index) in articleList' :key="item.id">
             <div class='recommendation' v-if='isSelf && index==0'>
                相关文章
            </div>
            <div class='articleTitle'>
                <div>{{item.title}}</div>
            </div>
            <div class='articleTxt'>
                <div>{{item.description}}</div>
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
            goarticleDetails(id,title){
                let param = new Object();
                    param.id = id;
                    param.title = title;
                if(this.isSelf){
                    this.changeId(param)
                }else{
                    this.$util.router_push(this,'articleDetailes',param)
                }
            }  
        },
        props:{
            articleList:{
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
    .articleListpage{
        background: #fff;
    }
    .articleContainer{
        width: 95%;
        border-bottom: 1px solid #e2e2e2;
        margin: auto;
        padding: 30px 0;
    }
    .articleTitle,
    .articleTxt{
        width: 100%;
        display: flex;
    }
    .articleTxt{
        padding: 20px 0;
        font-size:28px;
        color:#666666;
    }
    .articleTxt div{
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
    .articleTitle{
        font-size: 32px;
         align-items: center;
    }
</style>
