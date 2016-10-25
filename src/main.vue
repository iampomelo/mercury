<template>
    <article id="app-main">
        <section class="welcome-page">Mercury</section>
        <header-component/>
        <other-component/>
    </article>
</template>
<script>
    import HeaderComponent from './components/header'
    import OtherComponent from './components/other'
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {
            OtherComponent,
            HeaderComponent
        }
    }
</script>
