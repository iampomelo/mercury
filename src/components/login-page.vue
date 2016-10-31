<template>
    <section>
        <h2>登录以使用</h2>
        <label for="username"/>
        <input type="text" id="username" v-model="username"/>
        <label for="password"/>
        <input type="text" id="password" v-model="password"/>
        <input type="button" :value="isLoading?'登录':'登录中'" @click="load"/>
    </section>
</template>
<script>
    export default{}
</script>
