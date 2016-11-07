<template>
    <section>
        <section class="top-menu">
            <span class="left-park"><a href="#/dialog">&lt; 返回</a></span>
            <span class="title">{{title}}</span>
        </section>
        <section class="middle-content">
            <ul class="message-list">
                <li v-for="message in $store.getters.chatRecords"
                    :class="['message-item',message.from==$store.getters.username?'right':'left']">
                    <div class="message-from">{{message.from}}</div>
                    <div class="message-content">{{message.content}}</div>
                    <div class="fn-clear"></div>
                </li>
                <li class="filling-block"/>
            </ul>
        </section>
        <section class="bottom-menu">
            <label for="messageInput"/>
            <input type="text" id="messageInput" v-model="content"/>
            <button @click="send">发送</button>
        </section>
    </section>
</template>
<script>
    export default{
        data(){
            return {
                content: ''
            }
        },
        methods: {
            send(){
                this.$store.commit('__sendMessage', {
                    content: this.content
                });
                this.content = '';
            }
        },
        beforeRouteLeave(to, from, next){
            this.$store.commit('__leaveDialog');
            next();
        },
        mounted(){
            window.scrollTo(0, document.body.scrollHeight);
        },
        updated(){
            window.scrollTo(0, document.body.scrollHeight);
        },
        computed:{
            title(){
               if(this.$store.getters.id2chatinfo[this.$store.getters.chatId].isGroup){
                   return this.$store.getters.id2chatinfo[this.$store.getters.chatId].title;
               }else{
                   var temp = this.$store.getters.chatId.split('&');
                   return temp[0] == this.this.$store.getters.username ? temp[1] : temp[0];
               }
            }
        }
    }
</script>
