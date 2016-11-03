<template>
    <section>
        <ul>
            <li>{{message}}</li>
        </ul>
        <label for="messageInput"></label>
        <input type="text" id="messageInput" v-model="content"/>
        <input type="button" @click="send" value="发送"/>
    </section>
</template>
<script>
    export default{
        data(){
            return {
                content: ''
            }
        },
        methods:{
            send(){
            }
        }
    }
</script>
