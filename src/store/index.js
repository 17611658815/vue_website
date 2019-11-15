import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
    inllnessList:[],//首页热门疾病
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})