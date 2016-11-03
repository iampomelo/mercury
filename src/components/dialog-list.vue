<template>
    <section class="middle-content">
        <ul class="dialog-list">
            <li class="dialog-item" v-for="(title,id) in $store.getters.id2title" @click="q(id)">{{title}}</li>
        </ul>
    </section>
</template>
<script>
    export default{
//        data(){
//            return {
//                id2title: {}
//            }
//        },
//        mounted(){
//            this.$http.get('/dialogList').then(res=> {
//                if (res.body.success) {
//                    this.id2title = res.body.id2title;
//                }
//            });
//        },
        methods:{
            q(id){
                alert(id);
            }
        }
    }
</script>
