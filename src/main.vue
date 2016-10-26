<template>
    <article id="app-main">
        <section class="welcome-page">Mercury</section>
        <section class="bottom-menu">
            <span>消息</span>
            <span></span>
            <span>好友</span>
        </section>
    </article>
</template>
<script>
    import MainLayout from './components/main-layout'
    import BottomMenu from './components/bottom-menu'
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {
            MainLayout,
            BottomMenu
        }
    }
</script>
