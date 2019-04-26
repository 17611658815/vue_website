<template>
    <div id="app">
        <herder-title :title="title" :isback='true'></herder-title>
        <div class='textareaBox'>
            <textarea placeholder="详细描述您的问题或建议,我们将及时跟进解决。（建议添加相关问题或截图）" placeholder-class="phcolor" name="" id="" cols="30" rows="10"></textarea>
        </div>
        <div class='addImg'>
            <image-upload
                class="image_upload"
                :touch-size = 1
                :multiple = true
                field-name = 'serverImgFile'
                :max-count = 10
                @chooseImages='bindtap_chooseImages'
                />
            <div  v-for="(image , i) in images"  class='imagesPic' :key="i">
                <div>
                    <img :src="image.src" alt="" @click="bingtap_preview(i)">
                    <span @click="bindtap_delete(i)">删除</span>
                </div>
            </div>
        </div>

        <!-- 图片预览 -->
        <image-preview
            style="z-index:200"
            :images="preImages"
            v-model="index"
            :numIsShow="true"
            :deleteIsShow="true"
            @delete="bindtap_delete"
            />
        <div class="submit" @click="bindtap_upload">
                 上传
        </div>

    </div>
</template>

<script>
    /**
     * 图片上传插件 
     */ 
    import {ImageUpload , ImagePreview} from 'vue-image-upload-preview';
    export default {
        name: 'app',
        data () {
            return {
                msg: 'Welcome to Your Vue.js App',
                images:[],
                index:-1,
                title:'意见反馈'
            }
        },
        computed:{
            // 预览图片路径
            preImages(){
            return this.images.map(v=>{return v.src});
            },
        },
        methods:{
            /**
             *  绑定函数 -- 选择图片
             */
            bindtap_chooseImages(res){
                if (Array.isArray(res)) {
                    this.images = this.images.concat(res);
                    console.log(this.images)
                }else {
                    console.log(res);
                }
            },
            /**
             *  绑定函数 -- 删除图片
             */
            bindtap_delete(i){
                this.images.splice(i, 1)
            },
            /**
             *  绑定函数 -- 预览图片
             */
            bingtap_preview(i){
                this.index = i;
            },
            /**
             *  绑定函数 -- 取消预览
             */
            bingtap_hiddenImg() {
                this.index = -1;
            },
            /**
             *  绑定函数 -- 上传图片
             */
            bindtap_upload(){
                this.$refs.imgaeUpload.uploadImages(this.images)
                .then(res => {
                    console.log(res);
                }).catch(err => {
                    console.log(err);
                })
            }
        },
        components: {
            'image-preview':ImagePreview,
            'image-upload':ImageUpload,
        }
    }
</script>

<style scoped lang="scss">
    @import '@/assets/scss/color.scss';
    img{
        height: 120px;
        width: 120px
    }
    .image_upload{ 
        height: 120px; 
        width: 120px;
        /* background: red */
        background-image: url('../../assets/images/add.png');
        background-size:100% 100%;
    }
    .imagesPic{
        display: flex;
        display: inline-block;
        position: relative;
        margin-right: 20px;
    }
    .imagesPic span{
        position: absolute;
        right: 0;
        top: 0;
        background: yellow;
        z-index: 9999;
    }
    .textareaBox{
        width: 100%;
        display: flex;
        padding-top: 50px;
        align-items: center;
        justify-content: center;
        
    }
    .addImg{
        width: 90%;
        margin: auto;
        margin-top: 50px;
    }
    textarea{
        width: 80%;
        height: 350px;
        padding: 40px;
        background: #E6E6E6;
        margin: auto;
        border: none;
        border-radius: 10px;
        font-size: 30px;
        color: #999999
    }
    .submit{
        width: 90%;
        height: 90px;
        margin: 80px auto;
        border-radius: 10px;
        text-align: center;
        line-height: 90px;
        border: none;
        color: #ffffff;
        background:$main_style_color;
    }
</style>