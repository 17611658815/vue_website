import {Api} from '../net/Api.js'
import {
    GET_HOTILLNESSLIST
} from './mutation-types.js'

export default {

    async getHotIllnessList({
        commit,
        state
    }) {
        await Api.getHotIllnessList().then(data => {
            commit(GET_HOTILLNESSLIST, data.illness)
        });

    },
}