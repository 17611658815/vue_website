<template>
    <div class="title">
        <mt-header fixed :title="title">
            <router-link to="" slot="left">
                <mt-button @click="$router.go(-1)" icon="back" v-if='isback'></mt-button>
            </router-link>
        </mt-header>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                
            }
        },
        props: {
            title: {
                type: String,
            },
            isback: {
                type: Boolean,
            },
        },
        watch: {
            
            
        },
        components: {

        }
    }
</script>

<style scoped>
    .title{
        margin-bottom: 90px;
    }
</style>
