import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import appMain from './main.vue';
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
        this.width = this.html.clientWidth > 750 ? 750 : this.html.clientWidth;
        this.html.setAttribute('data-dpr', this.dpr);
        this.html.style.fontSize = 100 * this.width / 750 + 'px';
        this.wpstyle = document.querySelector('.welcome-page').style;
        this.wpstyle.height = this.wpstyle.lineHeight = document.documentElement.clientHeight + 'px';
    }
}

Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(VueResource);

const socket = io('http://172.20.6.108:9999');
const store = new Vuex.Store({
    state: {
        messageArr: []
    },
    mutations: {
        getAllMessages(state, payload){
            state.messageArr = payload.messageArr;
        },
        addMessage(state, payload){
            state.messageArr.push(payload.message);
        },
        sendMessage(state, payload){
            socket.emit('createMessage', payload.content)
        }
    },
    getters: {
        messageArr: state=> {
            return state.messageArr;
        }
    }
});
const routes = [{
    path: '/',
    component: appMain,
    children: [{
        path: '',
        component: appMain.components.MainLayout
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


socket.emit('getAllMessages');
socket.on('allMessages', messageArr=> {
    store.commit('getAllMessages', {
        messageArr
    });
});
socket.on('messageAdded', message=> {
    store.commit('addMessage', {
        message
    });
});

const app = new Vue({
    store,
    router,
    mounted(){
        new __init_page();
    }
}).$mount('#app');