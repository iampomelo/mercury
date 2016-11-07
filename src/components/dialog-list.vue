<template>
    <section class="middle-content">
        <ul class="dialog-list">
            <li class="dialog-item" v-for="(chatinfo,id) in $store.getters.id2chatinfo" @click="getChatRecords(id)">
                <span v-if="chatinfo.isGroup">{{chatinfo.title}}</span>
                <span v-else>与{{id | getFriendname}}的对话</span>
            </li>
        </ul>
    </section>
</template>
<script>
    export default{
        methods: {
            getChatRecords(id){
                this.$store.commit('__getChatRecords', {id});
            }
        },
        filters: {
            getFriendname(id){
                var temp = id.split('&');
                return temp[0] == this.$store.getters.username ? temp[1] : temp[0];
            }
        }
    }
</script>
