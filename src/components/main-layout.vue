<template>
    <div>
        <section class="top-menu">
            <span class="left-park">{{$store.getters.username}}</span>
            <span class="right-park"><a href="#/setting">设置</a></span>
        </section>
        <router-view/>
        <section class="bottom-menu">
            <span @click="locationHash('#/')" :class="{'selected':isMessage}">消息</span>
            <span></span>
            <span @click="locationHash('#/friend')" :class="{'selected':!isMessage}">好友</span>
        </section>
    </div>
</template>
<script>
    import DialogList from './dialog-list';
    import FriendList from './friend-list';
    export default{
        data(){
            return {
                isMessage: location.hash != '#/friend'
            }
        },
        methods: {
            locationHash(hash){
                location.hash = hash;
                this.isMessage = hash != '#/friend';
            }
        },
        components: {
            DialogList,
            FriendList
        }
    }
</script>
