<template>
  <div class="homePage">
    <div class="swiperContainer">                                                  
      <mt-swipe :speed="500" :auto="4000">
        <mt-swipe-item>
          <img src="http://img.39yst.com/uploads/mxb/position/20180723063657941.jpg" />
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="http://img.39yst.com/uploads/mxb/position/20180724034718366.jpg" />
        </mt-swipe-item>
        <mt-swipe-item>
          <img src="http://img.39yst.com/uploads/mxb/position/20180704105059956.jpg" />
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <div class="classNav">
      <div v-for="item in NavArray" :key="item.name">
        <router-link class="colorClass" :to="item.name">
          <img :src="item.icon" alt />
          <p>{{item.text}}</p>
        </router-link>
      </div>  
    </div>
    <hotillness 
      :inllnessList="inllnessList" 
      :title="illnessTitle" 
      :type="0" 
      :isicon="false"></hotillness>
    <van-list 
      v-model="loading" 
      @load="loadMore()" 
      :finished="on_off" 
      finished-text="没有更多了">
      <video-module :videoList="videoList" :isSelf="false"></video-module>
    </van-list>
    
    <!-- <div  v-for='item in ruleForm1.tableData'>
      <input type="text" v-model="item.weightCoefficient" name="" id="" > <span>{{item.num}}</span>
    </div> -->
    

  </div>
</template>

<script>
import { InfiniteScroll } from "mint-ui";
import { mapState, mapActions } from "vuex";
import wx from 'weixin-js-sdk'
export default {
  name: "home",
  data() {
    return {
     ruleForm1:{
       maxScore:40,
       tableData: [
        {
         weightCoefficient:0.2,
         num:0
        },
        {
         weightCoefficient:0.5,
         num:0
        },
       ]
      },
      
       page: 1, //分页
      illnessTitle: "热门疾病",
      on_off: false, //下拉开关
      loading: false,
      videoList: [], //视频列表
      NavArray: [
        {
          name: "/videosPage",
          icon: "https://m.mfk.com/statics/images/icons1.png",
          text: "科普视频"
        },
        {
          name: "/answersPage",
          icon: "https://m.mfk.com/statics/images/icons2.png",
          text: "名医问答"
        },
        {
          name: "/articlePage",
          icon: "https://m.mfk.com/statics/images/icons3.png",
          text: "专家文章"
        },
        {
          name: "/audiosPage",
          icon: "https://m.mfk.com/statics/images/icons4.png",
          text: "专家音频"
        }
      ] 
    };
  },
  watch:{
    "ruleForm1.tableData": {
        handler(newValue, oldValue) {
　　　　　　for (let i = 0; i < newValue.length; i++) {
              console.log(newValue)
              newValue[i].num = newValue[i].weightCoefficient/1*this.ruleForm1.maxScore
　　　　　　}
　　　　},
　　　　deep: true
    }
  },
  created(){  
    
  },
  mounted() {
    this.getHotIllnessList();
    this.$nextTick(function() {
    });
  },
  components: {},
  computed: {
    ...mapState(["inllnessList"]) //调用vuex数据
  },
  methods: {
    ...mapActions(["getHotIllnessList"]), //调用vuex方法
    //获取主页视频
    getHomeVideo() {
      let params = new Object();
      params.page = this.page;
      this.$Api.getHomeVideoList(params).then(data => {
        if (data.list.length > 0) {
          data.list.forEach(val => {
            this.videoList.push(val); //push新数据
          });
          this.loading = false;
        } else {
          this.on_off = true; //分页开关
          this.loading = false;
        }
      });
    },
    //下拉加载
    loadMore() {
      if (this.on_off) {
        return;
        this.LogUtils.jsonLog("没数据了....");
      } else {
        this.loading = true;
        this.getHomeVideo();
        this.page++;
      }
    },
    scrollWindow() {
      window.scrollTo(100, 500);
    }

    //获取热门疾病
    // getHotIllnessList() {
    //   this.$Api.getHotIllnessList().then(data => {
    //     this.inllnessList = data.illness;
    //   });
    // }
  }
};
</script>

<style scoped lang='scss'>
@import "@/assets/scss/color.scss";
.homePage {
  width: 100%;
  min-height: 100vh;
}
.swiperContainer {
  width: 100%;
  height: 350px;
}
.swiperContainer img {
  width: 100%;
  height: 100%;
}
.classNav {
  width: 100%;
  background: #ffffff;
  padding: 30px 0;
  display: flex;
  align-content: center;
  margin-bottom: 20px;
}
.classNav div {
  flex: 1;
  text-align: center;
}
.classNav div img {
  width: 100px;
  height: 100px;
}
.colorClass {
  color: black;
}
// 修改van ui按钮样式
.van-button--primary {
  width: 100%;
  height: 100px;
  background-color: $main_style_color;
  border: 0.013333rem solid $main_style_color;
}

#pageLayout {
  display: flex;
  background: yellow;
  padding-left: 500px;
  position: relative;
}
iframe {
  margin: 0;
  border-style: none;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  transform: rotateZ(90deg);
}

.videoContainer {
  width: 100%;
  padding: 20px 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}
.videoContainer div {
  width: 95%;
}
.video_cover img {
  width: 100%;
  height: 390px;
}
.video_title {
  margin: 20px 0;
  font-size: 32px;
}
.doctorInfo {
  display: flex;
  align-items: center;
}
</style>

