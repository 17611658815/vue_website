import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login/login'
import home from '@/page/home/home'
import videosPage from '@/page/navPage/videosPage'
import answersPage from '@/page/navPage/answersPage'
import articlePage from '@/page/navPage/articlePage'
import audiosPage from '@/page/navPage/audiosPage'
import information from '@/page/information/information'
import audioDetails from '@/page/audioDetails/audioDetails'
import videoDetails from '@/page/videoDetails/videoDetails'
import upimages from '@/page/upimages/upimages'
import recording from '@/page/recording/recording'
import illnessDetails from '@/page/illnessDetails/illnessDetails'
import answersDetaile from '@/page/answersDetaile/answersDetaile'
import articleDetailes from '@/page/articleDetailes/articleDetailes'
import alldisease from '@/page/alldisease/alldisease'
import audioAskList from '@/page/audioAskList/audioAskList'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  // linkActiveClass: 'active', // 更改激活状态的Class值
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta:{keepAlive: false} //页面会被缓存
    },
    //login
    {
      path: '/login',
      name: 'login',
      component: login,
      meta:{keepAlive: false} //页面不会被缓存
    },
    //我的
    {
      path: '/information',
      name: 'information',
      component: information,
      meta:{keepAlive: false} 
    },
    //科普视频
    {  
      path: '/videosPage',
      name: 'videosPage',
      component: videosPage,
      meta:{keepAlive: false}
    },
    //名医问答
    {  
      path: '/answersPage',
      name: 'answersPage',
      component: answersPage,
      meta:{keepAlive: false}
    },
    //专家文章
    {  
      path: '/articlePage',
      name: 'articlePage',
      component: articlePage,
      meta:{keepAlive: false}
    },
    //专家音频
    {  
      path: '/audiosPage',
      name: 'audiosPage',
      component: audiosPage,
      meta:{keepAlive: false}
    },
    //音频详情
    {  
      path: '/audioDetails',
      name: 'audioDetails',
      component: audioDetails,
      meta:{keepAlive: true}
    },
     //视频详情
     {  
      path: '/videoDetails',
      name: 'videoDetails',
      component: videoDetails,
      meta:{keepAlive: true},
    },
    //图片上传
    {  
      path: '/upimages',
      name: 'upimages',
      component: upimages,
      meta:{keepAlive: false}
    },
    //录音页面
    {  
      path: '/recording',
      name: 'recording',
      component: recording,
      meta:{keepAlive: false}
    },
    //疾病详情
    {  
      path: '/illnessDetails',
      name: 'illnessDetails',
      component: illnessDetails,
      meta:{keepAlive: true}
    },
    //问答详情
    {  
      path: '/answersDetaile',
      name: 'answersDetaile',
      component: answersDetaile,
      meta:{keepAlive: true}
    },
    //文章详情
    {  
      path: '/articleDetailes',
      name: 'articleDetailes',
      component: articleDetailes,
      meta:{keepAlive: true}
    },
    //全部疾病
    {  
      path: '/alldisease',
      name: 'alldisease',
      component: alldisease,
      meta:{keepAlive: true}
    },
    //有声问答列表
    {  
      path: '/audioAskList',
      name: 'audioAskList',
      component: audioAskList,
      meta:{keepAlive: false}
    }
  ]
})
