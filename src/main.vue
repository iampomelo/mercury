<template>
    <article id="app-main">
        <section class="welcome-page">Mercury</section>
        <main-layout></main-layout>
        <chat-page></chat-page>
    </article>
</template>
<script>
    import MainLayout from './components/main-layout'
    import ChatPage from './components/chat-page'
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {
            MainLayout,
            ChatPage
        }
    }
</script>
