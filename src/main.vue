<template>
    <div>
        <header-component/>
        <div>this is template body</div>
        <other-component/>
    </div>
</template>
<style>
    body {
        background-color: #afdfe4;
    }
</style>
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
