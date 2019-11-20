import Vue from 'vue'
import Router from 'vue-router'
import login from '@/page/login/login'
import home from '@/page/home/home'
import home1 from '@/page/home/home_1'
import home2 from '@/page/home/home_2'
import home3 from '@/page/home/home_3'
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
  base: __dirname,
  // linkActiveClass: 'active', // 更改激活状态的Class值
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
      meta: { keepAlive: true }
      // children:[            
      //   {                                     //二级路由
      //     path:'/home/home_1',
      //     name:'home1',
      //     component:home1,
      //   },
      //   {
      //     path:'/home/home_2',
      //     name:'home2',
      //     component:home2
      //   },
      //   {
      //     path:'/home/home_3',
      //     name:'home3',
      //     component:home3
      //   }

      // ],
    },
    //login
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    //我的
    {
      path: '/information',
      name: 'information',
      component: information,
    },
    //科普视频
    {
      path: '/videosPage',
      name: 'videosPage',
      component: videosPage,
      meta: { keepAlive: true }
    },
    //名医问答
    {
      path: '/answersPage',
      name: 'answersPage',
      component: answersPage,
      meta: { keepAlive: true }
    },
    //专家文章
    {
      path: '/articlePage',
      name: 'articlePage',
      component: articlePage,
      meta: { keepAlive: true }
    },
    //专家音频
    {
      path: '/audiosPage',
      name: 'audiosPage',
      component: audiosPage,
      meta: { keepAlive: true }
    },
    //音频详情
    {
      path: '/audioDetails',
      name: 'audioDetails',
      component: audioDetails,
    },
    //视频详情
    {
      path: '/videoDetails',
      name: 'videoDetails',
      component: videoDetails,
      meta: { keepAlive: true },
    },
    //图片上传
    {
      path: '/upimages',
      name: 'upimages',
      component: upimages,
    },
    //录音页面
    {
      path: '/recording',
      name: 'recording',
      component: recording,
    },
    //疾病详情
    {
      path: '/illnessDetails',
      name: 'illnessDetails',
      component: illnessDetails,
      meta: { keepAlive: true }
    },
    //问答详情
    {
      path: '/answersDetaile',
      name: 'answersDetaile',
      component: answersDetaile,
      meta: { keepAlive: true }
    },
    //文章详情
    {
      path: '/articleDetailes',
      name: 'articleDetailes',
      component: articleDetailes,
      meta: { keepAlive: true }
    },
    //全部疾病
    {
      path: '/alldisease',
      name: 'alldisease',
      component: alldisease,
      meta: { keepAlive: true }
    },
    //有声问答列表
    {
      path: '/audioAskList',
      name: 'audioAskList',
      component: audioAskList,
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
