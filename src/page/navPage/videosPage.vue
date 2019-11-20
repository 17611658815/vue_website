
<template>
  <div class="videosPage">
    <herder-title :title="title" :isback="true"></herder-title>
    <div class="imgBox">
      <img src="@/assets/images/sp-banner.jpg" alt />
    </div>
    <!-- 疾病列表 -->
    <hotillness :inllnessList="inllnessList" :title="illnessTitle" :type="1" :isicon="true"></hotillness>
    <van-list 
             class='moduleContainer'
            v-model="loading" 
            @load="loadMore()" 
            :finished="on_off"
            finished-text="没有更多了">
      <!-- 视频列表 -->
          <video-module :videoList="videoList" :isSelf="false"></video-module>
      </van-list>
  </div>
</template>

<script>
export default {
  name: "videosPage",
  data() {
    return {
      page: 1, //分页
      on_off: false, //下拉开关
      loading: false,
      title: "科普视频",
      illnessTitle: "按疾病找视频",
      inllnessList: [],
      videoList: []
    };
  },
  created() {
    this.loadList()
  },
  methods: {
    //获取主页视频
    loadList() {
      let params = new Object();
      params.page = this.page;
      this.LoadingUtils.showLoading("加载中");
      this.$Api.getPopularizationVideo(params).then(data => {
        if (data.illness) {
          this.inllnessList = data.illness;
        }
        if (data.list.length > 0) {
          data.list.forEach(val => {
            this.videoList.push(val);
          });
            this.loading = false; 
        } else {
            this.loading = false;
            this.on_off = true;
        }
        this.LogUtils.jsonLog(data);
        this.LoadingUtils.hideLoading();
      });
    },
    //加载更多
    loadMore() {
      this.LogUtils.log("加载了！");
      if (this.on_off && !this.loading) {
        this.loading = false;
        return;
        this.LogUtils.jsonLog("没数据了....");
      } else {
        this.loading = true;
        this.loadList();
        this.page++;
      }
    }
  },
  destroyed() {
    this.loading = false;
  },
  components: {}
};
</script>

<style scoped>
.videosPage {
  width: 100%;
  min-height: 100vh;
}
</style>

