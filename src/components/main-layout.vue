<template>
    <div>
        <section class="top-menu">
            <span class="left-park">{{$store.getters.username}}</span>
            <span class="right-park">设置</span>
        </section>
        <router-view/>
        <section class="bottom-menu">
            <span @click="locationHash('#/')">消息</span>
            <span></span>
            <span @click="locationHash('#/friend')">好友</span>
        </section>
    </div>
</template>
<script>
    import DialogList from './dialog-list';
    import FriendList from './friend-list';
    export default{
        methods: {
            locationHash(hash){
                location.hash = hash;
            }
        },
        components:{
            DialogList,
            FriendList
        }
    }
</script>
