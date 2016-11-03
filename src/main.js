import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import appMain from './main.vue';
import DialogList from './components/dialog-list.vue';
import FriendList from './components/friend-list.vue';
import style from './scss/style.scss';

class __init_page {
    constructor() {
        this.dpr = window.devicePixelRatio >= 1.5 ? 2 : window.devicePixelRatio;
        this.__resize();
        window.addEventListener('resize', this.__resize, false);
        setTimeout(()=> {
            document.querySelector('.welcome-page').style.display = 'none';
        }, 4000);
    }

    __resize() {
        this.html = document.documentElement;
        this.width = this.html.clientWidth > 768 ? 768 : this.html.clientWidth;
        this.html.setAttribute('data-dpr', this.dpr);
        this.html.style.fontSize = 100 * this.width / 768 + 'px';
        this.wpstyle = document.querySelector('.welcome-page').style;
        document.querySelector('#app-main').style.minHeight = this.wpstyle.height = this.wpstyle.lineHeight = document.documentElement.clientHeight + 'px';
    }
}

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);

const socket = io();
const store = new Vuex.Store({
    state: {
        id2title: {},
        username: 'abc'
    },
    mutations: {
        setUsername(state, payload){
            state.username = payload.username;
        },
        setId2title(state, payload){
            state.id2title = payload.id2title;
        }
    },
    getters: {
        id2title: state=> {
            return state.id2title;
        },
        username: state=> {
            return state.username;
        }
    }
});
const routes = [{
    path: '/',
    component: appMain,
    children: [{
        path: '',
        component: appMain.components.MainLayout,
        children: [{
            path: '/dialog',
            component: DialogList
        }, {
            path: '/friend',
            component: FriendList
        }],
        redirect: '/dialog'
    }, {
        path: '/chat',
        component: appMain.components.ChatPage
    }, {
        path: '/login',
        component: appMain.components.LoginPage
    }]
}];
const router = new VueRouter({
    routes
});


const app = new Vue({
    store,
    router,
    beforeCreate(){
        /**
         * Confirm session, Vue-Router SPA has no idea to use middlewares because everything is under '/'
         */
        this.$http.get('/auth').then(res=> {
            if (!res.body.success) {
                location.hash = '#/login';
            } else {
                store.commit('setUsername', {
                    username: res.body.user ? res.body.user.username : ''
                });
                socket.emit('mercury', {
                    action: 'getDialogList',
                    data: {
                        username: store.getters.username
                    }
                });
            }
        });
    },
    mounted(){
        new __init_page();
        socket.on('dialogList', res=> {
            if (res.success) {
                store.commit('setId2title', {
                    id2title: res.id2title
                })
            }
        });
    }
}).$mount('#app');


