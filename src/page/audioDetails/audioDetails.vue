<template>
  <div class="audioDetailsPage">
      <herder-title :title="audioObj.yinpin.title" :isback="true"></herder-title>
      <div class="headerContainer">
        <div class="titleTxt">
          <div>{{audioObj.yinpin.title}}</div>
          <div>{{audioObj.yinpin.created}}</div>
          <doctor-info :docinfo="audioObj.doctor"></doctor-info>
          <div class="ofplayBox">
            <!-- audio播放组件 -->
            <audio ref="audio" @timeupdate="onTimeupdate" :src="audioObj.yinpin.yinpin"></audio>
            <div class="isPlayImg">
              <!--开始播放-->
              <img v-if="!playflg" @click="play()" src="@/assets/images/play.png" />
              <!--暂停-结束播放-->
              <img v-if="playflg" @click="stop()" src="@/assets/images/puse.png" />
            </div>
            <!--slider进度条-->
            <div class="progress">
              <mt-range
                v-model="rangeValue"
                @change="changeEvent(rangeValue)"
                :value="rangeValue"
                :step="10"
                :max="offset"
              ></mt-range>
              <div class="duration">
                <span>{{starttime}}</span>
                <span>{{audioObj.yinpin.yinpin_duration}}</span>
                <!-- 
                    转换时间格式
                    <span class="right-timer">{{"0" + (((duration)/60)|Int)}}:{{(duration)%60 < 10 ? "0"+((duration)%60) : ((duration)%60)}}</span>
                -->
              </div>
            </div>
          </div>
          <div class="audioMsg">音频内容</div>
          <div class="audioText" v-html="audioObj.yinpin.content"></div>
        </div>
      </div>
        <van-list v-model="loading" @load="onReachBottom()" :finished="on_off" finished-text="没有更多了">
      <audio-module :audioList="audioObj.relevant" @changeIds="upPageid" :isSelf="true"></audio-module>
    </van-list>
  </div>
</template>

<script type="text/ecmascript-6">
import doctorInfo from "@/components/doctorInfo/doctorInfo";
export default {
  name: "audioDetails",
  data() {
    return {
      audioObj: {
        //添加对应项 不然赋值会报错
        yinpin: {},
        doctor: {},
        relevant: []
      },
      id: "",
      page: 1,
      on_off: false,
      loading: false,
      playflg: false, //当前是否正在播放
      rangeValue: 0, //滑块进度条
      starttime: "00:00", //正在播放时长
      duration: "", //总时长
      offset: 0
    };
  },
  created(){
    this.id = this.$route.query.data.id;  
    // this.getAudioDetailsList();
  },
  activated() {
   /*  this.id = this.$route.query.data.id;
    this.getAudioDetailsList();
    this.LogUtils.log(this.$route.query.data); */
  },
  watch: {
    id(val) {
      /**
       * 监听id变化 重新加载页面
       * 初始化时数据
       * */
      console.log("监听");
  /*     document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0; */
      this.page = 1;
      this.on_off = false;
      this.audioObj.yinpin = {};
      this.audioObj.doctor = {};
      this.audioObj.relevant = [];
      this.playflg = false; //当前是否正在播放
      this.rangeValue = null; //滑块进度条
      this.starttime = "00:00"; //正在播放时长
      this.duration = ""; //总时长
      this.offset = 0;
      this.stop(); //关闭播放音频
      this.getAudioDetailsList();
    },
    immediate: true
  },
  methods: {
    // 获取视频信息
    getAudioDetailsList() {
      let params = new Object();
      params.id = this.id;
      this.LoadingUtils.showLoading("加载中");
      this.$Api.getAudioDetails(params).then(data => {
        this.audioObj = data;
        this.LogUtils.log(this.audioObj);
        this.LoadingUtils.hideLoading();
      });
    },
    // 接收子组件参数
    upPageid(e) {
      this.title = e.title;
      this.id = e.id;
    },
    onReachBottom() {
      let params = new Object();
      if (this.on_off) {
        return;
      }
      this.loading = true;
      this.page++;
      params.id = this.id;
      params.page = this.page;
      this.LoadingUtils.showLoading("加载中");
      this.$Api.getAudioDetails(params).then(data => {
        if (data.relevant.length > 0) {
          data.relevant.forEach(item => {
            this.audioObj.relevant.push(item);
          });
          this.loading = false;
        } else {
          this.loading = false;
          this.on_off = true;
        }
        this.LoadingUtils.hideLoading();
      });
    },
    //开始播放
    play() {
      this.LoadingUtils.showLoading("加载中");
      this.$refs.audio.play();
      this.playflg = true;
      this.offset = parseInt(this.$refs.audio.duration);
      console.log("开始播放-时长=" + this.$refs.audio.duration);
      console.log(Math.ceil(this.offset));
      if ((this.playflg = true)) {
        this.timer = setInterval(() => {
          var min = "0" + parseInt(this.$refs.audio.currentTime / 60); //音频播放当前时间
          var max = parseInt(this.$refs.audio.duration); //音频总时长
          var sec = parseInt(this.$refs.audio.currentTime % 60);
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.starttime = min + ":" + sec; /*  00:00  */
          this.rangeValue = parseInt(this.$refs.audio.currentTime);
          if (this.rangeValue >= this.offset) {
            this.rangeValue = 0; /*播放结束后进度条归零*/
            this.starttime = "00:00"; /*播放结束后时间归零*/
            this.stop();
            clearInterval(this.timer);
          }
        }, 1000);
      }
    },

    //暂停-结束
    stop() {
      this.$refs.audio.pause();
      this.playflg = false;
      this.LogUtils.log("暂停播放");
    },
    onTimeupdate(e) {
      if (e) {
        this.LoadingUtils.hideLoading();
      }
    },

    // 拖拽进度
    changeEvent(val) {
      this.$refs.audio.currentTime = val;
    },
    inputEvent(e) {
      // console.log(e)
    }
  },
  //页面卸载时 清除定时器
  beforeDestroy() {
    clearInterval(this.timer);
  },
  components: {
    "doctor-info": doctorInfo
  }
};
</script>

<style scoped lang="scss">
.audioDetailsPage {
  width: 100%;
  min-height: 100vh;
}
.headerContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  margin-bottom: 20px;
}
.titleTxt {
  width: 92%;
  padding: 36px 0 50px 0;
}
.titleTxt > div:nth-child(1) {
  font-size: 36px;
  color: #000000;
  margin-bottom: 10px;
}
.titleTxt > div:nth-child(2) {
  padding: 20px 0 40px 0;
  font-size: 26px;
  color: #999999;
  border-bottom: 1px solid #e2e2e2;
}
.audioOff {
  width: 100%;
  padding: 0.4rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.ofplayBox {
  width: 100%;
  height: 1.5rem;
  background: #f6f7f7;
  display: flex;
  border-radius: 0.1rem;
}

.isPlayImg {
  width: 1rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
}

.isPlayImg img {
  width: 0.9rem;
  height: 0.9rem;
}
.mt-range-content {
  margin-right: 0.8rem;
}
.progress {
  flex: 1;
  height: 0.66rem;
  margin-left: 0.2rem;
  font-size: 0.26rem;
  margin-top: 0.3rem;
  position: relative;
  padding-right: 20px;
}
.mt-range-thumb {
  background-color: #fff;
  position: absolute;
  left: 0;
  top: 0.15rem;
  width: 0.26rem !important;
  height: 0.26rem !important;
  border-radius: 100%;
  cursor: move;
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.duration {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.audioMsg {
  padding: 20px 0;
  font-size: 32px;
  color: #000000;
}
.audioText {
  font-size: 0.373333rem;
  color: #666666;
  text-indent: 2em;
  line-height: 1.8;
  letter-spacing: 0.013333rem;
  padding-bottom: 0.666667rem;
}
</style>
