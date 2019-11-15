import {
	GET_HOTILLNESSLIST,

} from './mutation-types.js'

export default {
    // 获取首页热门疾病
    [GET_HOTILLNESSLIST](state, data) {
		state.inllnessList = data;
    },
}
