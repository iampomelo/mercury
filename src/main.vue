<template>
    <article id="app-main">
        <section class="welcome-page">Mercury</section>
        <router-view/>
    </article>
</template>
<script>
    import MainLayout from './components/main-layout';
    import ChatPage from './components/chat-page';
    import LoginPage from './components/login-page'
    export default{
        components: {
            MainLayout,
            ChatPage,
            LoginPage
        }
    };
</script>
