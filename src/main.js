// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/'
//引入mint-ui组件
import Mint from 'mint-ui';
import 'mint-ui/lib/style.css'; 
//全局修改mint-UI样式
import '../src/assets/scss/my-mint_ui.scss';
import '../src/assets/css/common.css';
import VueScroller from 'vue-scroller'
// import '../src/assets/scss/color.scss';
// 设置eventbus传值
window.eventBus = new Vue()

// vant-ui 全局组件
import { PullRefresh,List, Collapse, CollapseItem,Button,Tab, Tabs} from 'vant';

Vue.use(Collapse).use(CollapseItem).use(VueScroller);
Vue.use(PullRefresh).use(List).use(Collapse).use(CollapseItem).use(Button).use(Tab).use(Tabs);
Vue.use(Mint);
// vant-ui
// import Vant from 'vant';
// import 'vant/lib/vant-css/index.css';
// Vue.use(Vant)
// 工具类
import Util from './utils/util';
import LogUtils from './utils/LogUtils';//log日志
import StorageUtils from './utils/StorageUtils';//本地存储
import ToastUtils from './utils/ToastUtils';//提示窗口
import LoadingUtils from './utils/LoadingUtils';//loading
import DialogUtils from './utils/DialogUtils'
// 公共组件
import herderTitle from "@/components/title/title";
import videoModule from '@/components/videoList/videoList';//视频组件
import answersModule from '@/components/answersList/answersList';//问答组件
import articleModule from '@/components/articleList/articleList';//文章组件
import audioModule from '@/components/audioList/audioList';//音频组件
import hotillness from '@/components/hotillness/hotillness';

// api请求
import {Api} from './net/Api.js'
// 单位px转换rem
import "lib-flexible/flexible.js"


// 判断开发环境是否开启代理
import Axios from 'axios';
if (process.env.NODE_ENV == 'development') {
    Axios.defaults.baseURL = '/api';
} else {
    Axios.defaults.baseURL = 'https://api.mfk.com/';
}

window.addEventListener('popstate',function(e){
    router.isBack = true;
},false)

//全局注入
Vue.config.productionTip = false
Vue.prototype.$Api = Api;//定义全局变量(请求)
Vue.prototype.$util = Util;//公共方法
Vue.prototype.LogUtils = LogUtils;//定义全局log工具类 《使用方式：this.LogUtils.jsonLog(data) 》
Vue.prototype.StorageUtils = StorageUtils;//定义全局数据存储类 《使用方式：this.LocalStorage.XXX》
Vue.prototype.ToastUtils = ToastUtils;
Vue.prototype.LoadingUtils = LoadingUtils;//loading
Vue.prototype.DialogUtils = DialogUtils;
// 全局公共组件
Vue.component('herderTitle',herderTitle)
Vue.component('videoModule',videoModule)
Vue.component('answersModule',answersModule)
Vue.component('articleModule',articleModule)
Vue.component('audioModule',audioModule)
Vue.component('hotillness',hotillness)


router.beforeEach((to, from, next) => {
    var userInfo = window.localStorage.getItem('TokenID');//获取浏览器缓存的用户信息
  if (!userInfo && to.name !== 'login') { // 判断是否已经登录且前往的页面不是登录页
        next({
            name: 'login'
        });
    } else if (userInfo && to.name === 'login') { // 判断是否已经登录且前往的是登录页
        next({
            name:"home"
        });
    }else{
      next();
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//挂在vuex
  components: { App },
  template: '<App/>'
})
