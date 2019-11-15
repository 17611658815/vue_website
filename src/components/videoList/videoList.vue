<template>
  <div class="videoPage">
    <!-- <button @click="get">兄弟传值</button> -->
      <div
        class="videoContainer"
        v-for="(item,index) in videoList"
        :key="index+item.id"
        @click="goVideoDetails(item.id,item.title)"
      >
        <div class="recommendation" v-if="isSelf && index==0">相关视频</div>
        <div class="video_cover">
          <img :src="item.thumb" v-lazy="item.thumb" alt />
        </div>
        <div class="video_title">
          <span>{{item.title}}</span>
        </div>
        <div class="doctorInfo" v-if="item.doctor != false">
          <span class="doctor_Pic">
            <img :src="item.doctor.avatar" alt />
          </span>
          <span class="doctor_name">{{item.doctor.name}}</span>
          <span class="doctor_position">{{item.doctor.position}}</span>
          <span class="doctor_hospital">{{item.doctor.hospital}}</span>
        </div>
      </div>
  </div>
</template>

<script>
import { InfiniteScroll } from "mint-ui";
export default {
  data() {
    return {};
  },
  props: {
    //视频列表
    videoList: {
      type: Array
    },
    //下拉开关
    on_off: {
      type: Boolean
    },
    isSelf: {
      type: Boolean
    }
  },
  methods: {
    changeId(param) {
      this.$emit("changeIds", param);
    },
    goVideoDetails(id, title) {
      let param = new Object();
      param.id = id;
      param.title = title;
      if (this.isSelf) {
        this.changeId(param);
      } else {
        this.$util.router_push(this, "videoDetails", param);
      }
    },
    get() {
      console.log("触发了");
      eventBus.$emit("eventBusName", "hellokugou");
    }
  }
};
</script>

<style  scoped lang="scss">
@import "@/assets/scss/color.scss";
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

