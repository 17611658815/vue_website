<template>
    <div class="page">
        <button @click="readyOriginal">开始录音</button>
    </div>
</template>

<script type="text/ecmascript-6">
    import { HZRecorder} from '@/utils/recorder.js';
    export default {
        data() {
            return {
                recorder:''
            }
        },
        mounted() {
            this.$nextTick(() => {
                try {
                    window.AudioContext = window.AudioContext || window.webkitAudioContext;
                    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
                    window.URL = window.URL || window.webkitURL;
                    audio_context = new AudioContext;
                    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
                } catch (e) {
                    alert('No web audio support in this browser!');
                }
                navigator.getUserMedia({audio: true}, function (stream) {
                        this.recorder = new HZRecorder(stream)
                        console.log('初始化完成');
                }, function(e) {
                        console.log('No live audio input: ' + e);
                });
            })
        },
        methods: {
            readyOriginal () {
            if (!this.isVoice) {
                this.recorder && this.recorder.start();
                this.isVoice = true
            } else {
                this.isVoice = false
                this.recorder && this.recorder.stop();
                setTimeout(()=> {
                    var mp3Blob = this.recorder.upload();
                    var fd = new FormData();
                    fd.append('audio', mp3Blob);
                    console.log(mp3Blob)
                    this.$http({
                        header: ({
                            'Content-Type': 'application/x-www-form-urlencodeed'
                        }),
                        method: 'POST',
                        url: 'url',
                        data: fd,
                        withCredentials: true,
                    }).then((res) => { 
                        //  这里做登录拦截
                        if (res.data.isLogin === false) {
                            router.replace('/login');
                        } else {
                            if (res.data.status === 200) {
                                console.log('保存成功')
                            } else {
                                this.returnmsg = '上传失败'
                            }
                        }
                    })
                },1000)
            }
		},

        },
        components: {

        }
    }
</script>

<style scoped lang="scss">
</style>
