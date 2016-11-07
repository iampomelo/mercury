<template>
    <section>
        <section class="top-menu">
            <span class="left-park"><a href="javascript:history.back();">&lt; 返回</a></span>
            <span class="title">设置</span>
        </section>
        <section class="middle-content">
            <input id="logout-button" type="button" value="退出登录" class="large-button" @click="logout"/>
        </section>
    </section>
</template>
<script>
    export default{
        methods:{
            logout(){
                this.$http.get('/logout').then(res=>{
                   if(res.body.success){
                       location.hash = '#/login';
                   }
                });
            }
        }
    }
</script>
