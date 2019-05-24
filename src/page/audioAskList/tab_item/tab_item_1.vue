<template>
	<div class="page">
		<div class="audioList">
			<audio 
			:src="url"
			ref="audios" 
			muted="muted" 
			@ended="onEnded"
			@timeupdate="onTimeupdate" 
			controls 
			autoplay="autoplay" 
			hidden="true">
			 </audio>
			<div class="audioList_item" v-for="(item, index) in audioList" :key="index">
				<div class="audioContent">
					<div class="audioList_item_left">
						<div>{{ item.title }}</div>
						<div>
							<span>审核中</span>
							<span>{{ item.created }}</span>
						</div>
					</div>
					<div class="audioList_item_right">
						<img src="@/assets/images/puse.png" @click="stop(index)" v-if="item.isplay" />
						<img src="@/assets/images/play.png" @click="gotoPlay(item.record, index, item.duration)" v-else />
					</div>
				</div>
				<div class="audioPlayer" v-if="item.isplay">
					<span>{{ starttime }}</span>
					<mt-range v-model="rangeValue" @change="changeEvent(rangeValue)" :value="rangeValue" :step="10" :max="offset"></mt-range>
					<span>{{ duration }}</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import data from './data.json';
export default {
	data() {
		return {
			url: null,
			page: 1,
			on_off: false,
			loading: false,
			playflg: false, //当前是否正在播放
			rangeValue: 0, //滑块进度条
			starttime: '', //正在播放时长
			duration: '', //总时长
			offset: 0,
			audioList: [],
			index: '',
			timer: null
		};
	},
	created() {
		
	},
	mounted() {
		this.getdata();
	},
	computed:{
		
	},
	methods: {
		//转换时间格式

		getdata(){
			let arr = data.data;
			this.audioList = arr.map(item => {
				item.isplay = false;
				return item
			})
		},
		onTimeupdate(e) {
			if (e) {
				this.LoadingUtils.hideLoading();
				console.log(this.$refs)
				var min = '0' + parseInt(this.$refs.audios.currentTime / 60); //音频播放当前时间
				var max = parseInt(this.$refs.audios.duration); //音频总时长
				var sec = parseInt(this.$refs.audios.currentTime % 60);
				if (sec < 10) {
					sec = '0' + sec;
				}
				this.starttime = min + ':' + sec; //00:00
				this.rangeValue = parseInt(this.$refs.audios.currentTime)
				this.offset = parseInt(this.$refs.audios.duration)
			}
		},
		//开始播放
		gotoPlay(path, index, duration) {
			this.index = index;
			this.rangeValue = 0;
			this.audioList.forEach((item,i)=>{
				if(i == index){
					this.url = item.record;//音频地址
					if(this.url == ''|| this.url==undefined){
						this.ToastUtils.showToast('未找到资源路径，请重试');
					}else{
						item.isplay = true;//播放标识
						this.playflg = true; //播放中
						this.duration = this.$util.timeToMinute(duration);// 00:00格式
						this.$refs.audios.play();
					}
				}else{
					item.isplay = false;
				}
			})
		},
		//暂停-结束
		stop(index) {
			 this.$refs.audios.pause();
			 console.log(index)
			 this.audioList[index].isplay = false
			 this.playflg = false; //播放中
			 this.rangeValue = 0;
			 this.url = ''
		},
		onError(e) {
			console.log('播放错误');
		},
		onEnded() {
			this.stop(this.index)
			console.log('播放结束');
		},
		changeEvent() {
			console.log('111');
		}
	},
	watch: {},
	components: {}
};
</script>

<style scoped>
.page {
	width: 100%;
	background: #ffffff;
}
.audioList {
	width: 95%;
	margin: auto;
}
.audioList_item_right {
	display: flex;
	align-items: center;
	justify-content: center;
}
.audioList_item_right img {
	width: 60px;
	height: 60px;
}
.audioList_item {
	display: flex;
	padding: 40px 0;
	flex-direction: column;
	border-bottom: 1px solid #e2e2e2;
}
.audioContent {
	display: flex;
	justify-content: space-between;
}
.audioList_item_left > div:nth-child(1) {
	font-size: 32px;
	color: #333333;
}
.audioList_item_left > div:nth-child(2) {
	display: flex;
	align-items: center;
	margin-top: 20px;
}
.audioList_item_left > div:nth-child(2) > span:nth-child(1) {
	display: block;
	width: 80px;
	height: 30px;
	text-align: center;
	line-height: 35px;
	background: #f78735;
	color: #ffffff;
	border-radius: 20px;
	font-size: 20px;
	margin-right: 30px;
}
.audioList_item_left > div:nth-child(2) > span:nth-child(2) {
	color: #999999;
	font-size: 24px;
}

.audioPlayer {
	margin-top: 30px;
	display: flex;
	align-items: center;
}
.mt-range {
	flex: 1;
	margin: 0 20px;
}
</style>
