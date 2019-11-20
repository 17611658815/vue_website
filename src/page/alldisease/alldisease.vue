<template>
    <div class="alldiseasePage">
        <herder-title :title="title" :isback='true'></herder-title>
        <!-- <ul>
            <li v-for="(item,index) in stairillnessList" :key="item.id">
				<div @click="_isFold(item.id,index)">
					<span :class="item.id==ksid  ? 'active':''">{{item.name}}</span>
				<img v-if='item.id==ksid && isUp' src="@/assets/images/icon_14.png"/>
				<img v-else src="@/assets/images/icon_13.png"/>
				</div>
				<div v-if='item.id == ksid && isUp'>
					<div v-for='(item,index) in secondillnessList' @click="goillnessDetails(item.id,item.name)" :key="item.id">{{item.name}}</div>
				</div>
			</li>
		</ul> -->
        <van-collapse  @change='_isFold(item.id,index)' v-for="(item,index) in stairillnessList" :key="item.id" v-model="activeName" accordion>
            <van-collapse-item  :title-class="activeName == item.id ? 'active':'' " :title="item.name" :name="item.id">
                    <div class="collapse-item">
                        <span v-for="(item,index) in secondillnessList" @click="goillnessDetails(item.id,item.name)" :key="item.id">{{item.name}}</span>
                    </div>
            </van-collapse-item>
        </van-collapse>
        </div>
</template>
<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                activeName: '42',
                stairillnessList:[],// 一级科室
                secondillnessList:[],//二级科室
                isUp:true,//展开收起
                ksid:'42',//默认第一个科室的id
                title:'全部疾病'
            }
        },
        created() {
            this.getAllinnness()
        },
        methods:{
            getAllinnness(){
                let params = new Object();
                    params.id = this.id;
                this.LoadingUtils.showLoading('加载中');
                this.$Api.getAllillness(params).then(data => {
                    this.stairillnessList = data;//全部科室疾病
                    this.secondillnessList = data[0].son;//默认展示首个科室疾病
                    this.stairillnessList.forEach((_item) => {
                          if(_item.son == undefined){
                            _item.son=[
                                {
                                    name: `${_item.name}全科`,
                                    id: _item.id
                                }
                            ]
                        }
                    })
                    this.LogUtils.log(data)
                    this.LoadingUtils.hideLoading();
                })
            },
            //展开
            _isFold(id,index){
                if (id == this.stairillnessList[index].id && this.stairillnessList[index].son != undefined) {
                    this.secondillnessList = this.stairillnessList[index].son;
                }
            },
            goillnessDetails(id,name){
                console.log(id)
                let data = new Object()
                data.id = id;
                data.type = 0;
                data.name = name
                this.$util.router_push(this,'illnessDetails',data)
            },
        },
        components:{
        },
    }
</script>

<style lang="scss">
    .alldiseasePage{
        width: 100%;
        min-height: 100vh;
    }
    .van-collapse-item{
        padding: 20px 0;
        background: #ffffff;
    }
    .van-collapse-item__content{
        display: flex;
    }
    .collapse-item{
        width: 100%;
        display: flex;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
        padding: 0.2rem 0;
    }
    .collapse-item>span{
        width: 33%;
        padding: 0.2rem 0;
        font-size: 0.28rem;
    }
    .van-cell{
        font-size: 0.36rem;
    }
    .collapse-item > span{
         font-size: 0.32rem;
    }
    .van-cell__left-icon, .van-cell__right-icon  {
        font-size: 0.513333rem !important;
    }
    // li > div:nth-child(1) {
    //     display: flex;
    //     justify-content: space-between;
    //     align-items: center;
    //     padding: 0.4rem 0;
    //     border-bottom: 0.01rem solid #e2e2e2;
    // }
    // li > div:nth-child(2) {
    //     display: flex;
    //     flex-wrap: wrap;
    //     border-bottom: 0.2rem solid #f7f7f7;
    //     padding: 0.2rem 0;
    //     padding-left: 0.2rem;
    // }
    // li > div:nth-child(2) > div {
    //     width: 33%;
    //     padding: 0.2rem 0;
    //     font-size: 0.28rem;
    // }
    // li span {
    //     font-size: 0.3rem;
    //     margin-left: 0.2rem;
    // }
    // li img {
    //     font-size: 0.3rem;
    //     margin-right: 0.2rem;
    //     width: 0.3rem;
    //     height: 0.18rem;
    // }
    .active {
        color: #53a2ef;
    }

</style>
