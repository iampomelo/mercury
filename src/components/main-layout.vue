<template>
    <div>
        <section class="top-menu">
            <span class="left-park">{{$store.getters.username}}</span>
            <span class="right-park">设置</span>
        </section>
        <section class="bottom-menu">
            <span @click="message">消息</span>
            <span></span>
            <span>好友</span>
        </section>
    </div>
</template>
<script>
    export default{
        methods: {
            message(){
                location.hash = '#/chat';
            }
        }
    }
</script>
