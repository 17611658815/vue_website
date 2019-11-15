export default class Url {
    // target 源地址
    static PATH() { return '/app/api/mfk_shipin_app2.php?type='}
    

    //获取主页列表
    static getHomeListUrl() { return this.PATH() + 'home_list'};
    //首页热门疾病列表
    static getHomeIllnessListUrl() {return this.PATH() + 'hot_illness'};
    //获取视频详情
    static getVideoDetailsUrl() {return this.PATH() + 'details_shipin'};
    //获取视频详情
    static getAnswerDetailsUrl() {return this.PATH() + 'details_ask'};
    //获取文章详情
    static getArticleDetailsUrl() {return this.PATH() + 'details_article'};
    //获取音频详情
    static getAudioDetailsUrl() {return this.PATH() + 'details_yinpin'};
    //获取科普视频列表
    static popularizationUrl() {return this.PATH() + 'home_shipin'};
    //获取名医问答列表
    static getDoctoranswersUrl() {return this.PATH() + 'home_ask'};
    //获取专家文章列表
    static getDoctorarticleUrl() {return this.PATH() + 'home_article'};
    //获取专家音频列表
    static getDoctoraudioUrl() {return this.PATH() + 'home_yinpin'};
    //获取主页疾病详情
    static getHomeillnessUrl(name) {return this.PATH() + 'illness_'+ name};
    //获取全部疾病
    static getAllillnessUrl(name) {return this.PATH() + 'illness_tree'};
 
}