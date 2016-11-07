<template>
    <section class="middle-content">
        <ul class="friend-list">
            <li class="friend-item" v-for="item in $store.getters.friends" @click="enterDialog(item)"><img
                    src="../../resources/avator.png"/>{{item}}
            </li>
        </ul>
    </section>
</template>
<script>
    export default{
        created(){
            this.$store.commit('__getFriendList');
        },
        methods: {
            enterDialog(friendName){
                this.$store.commit('__enterDialog', {friendName});
            }
        }
    }
</script>