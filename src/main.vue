<template>
    <article id="app-main">
        <section class="welcome-page"><img src="../resources/mercury-logo.png"/></section>
        <router-view/>
    </article>
</template>
<script>
    import MainLayout from './components/main-layout';
    import ChatPage from './components/chat-page';
    import LoginPage from './components/login-page';
    import SettingPage from './components/setting-page';
    export default{
        components: {
            MainLayout,
            ChatPage,
            LoginPage,
            SettingPage
        }
    };
</script>
