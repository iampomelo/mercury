<template>
    <section class="login-field">
        <h2>登录以使用</h2>
        <label for="username"/>
        <input type="text" id="username" v-model="username"/>
        <label for="password"/>
        <input type="password" id="password" v-model="password"/>
        <input type="button" :value="isLoading?'登录中...':'登录'" :class="{'loading': isLoading}" @click="load"/>
    </section>
</template>
<script>
    export default{
        data(){
            return {
                username: '',
                password: '',
                isLoading: false
            }
        },
        methods: {
            load(){
                this.isLoading = true;
                this.$http.post('/login', {
                    username: this.username,
                    password: this.password
                }).then(res=> {
                    if (res.body.success) {
                        location.hash = '#/';
                        this.isLoading = false;
                    }
                });
            }
        }
    }
</script>
