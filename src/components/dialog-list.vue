<template>
    <section class="middle-content">
        <ul class="dialog-list">
            <li class="dialog-item" v-for="(title,id) in $store.getters.id2title" @click="getChatRecords(id)">{{title}}
            </li>
        </ul>
    </section>
</template>
<script>
    export default{
        methods: {
            getChatRecords(id){
                this.$store.commit('__getChatRecords', {id});
                location.hash = '#chat';
            }
        }
    }
</script>
