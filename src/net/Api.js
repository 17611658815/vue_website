import {postRequest,getRequest} from "@/net/HttpRequest";
import Url from "@/net/Url";

/**
 * 接口请求
 */
export const Api = {
    /**
     * @param paramObj
     * @returns {Promise}
     */

    /**
     * 主页视频列表
     */
    getHomeVideoList: function (paramObj) {
        return getRequest(Url.getHomeListUrl(), paramObj);
    },
    /**
     * 主页热门疾病
     */
    getHotIllnessList: function (paramObj) {
        return getRequest(Url.getHomeIllnessListUrl(), paramObj);
    },
    /**
     * 获取视频详情
     */
    getVideoDetails: function (paramObj) {
        return getRequest(Url.getVideoDetailsUrl(), paramObj);
    },
    /**
     * 获取问答详情
     */
    getAnswerDetails: function (paramObj) {
        return getRequest(Url.getAnswerDetailsUrl(), paramObj);
    },
    /**
     * 获取文章详情
     */
    getArticleDetails: function (paramObj) {
        return getRequest(Url.getArticleDetailsUrl(), paramObj);
    },
    /**
     * 获取音频详情
     */
    getAudioDetails: function (paramObj) {
        return getRequest(Url.getAudioDetailsUrl(), paramObj);
    },
     /**
     * 获取科普视频
     */
    getPopularizationVideo: function (paramObj) {
        return getRequest(Url.popularizationUrl(), paramObj);
    },
     /**
     * 获取名医问答
     */
    getDoctoranswers: function (paramObj) {
        return getRequest(Url.getDoctoranswersUrl(), paramObj);
    },
     /**
     * 获取专家文章
     */
    getDoctorarticle: function (paramObj) {
        return getRequest(Url.getDoctorarticleUrl(), paramObj);
    },
     /**
     * 获取专家音频
     */
    getDoctoraudio: function (paramObj) {
        return getRequest(Url.getDoctoraudioUrl(), paramObj);
    },
     /**
     * 获取疾病详情
     */
    getIllnessDetaile: function (paramObj,name) {
        return getRequest(Url.getHomeillnessUrl(name), paramObj);
    },
     /**
     * 获取疾病详情
     */
    getAllillness: function (paramObj,name) {
        return getRequest(Url.getAllillnessUrl(), paramObj);
    }

}