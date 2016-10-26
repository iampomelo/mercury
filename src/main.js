import Vue from 'vue';
import appMain from './main.vue';
import style from './scss/style.scss';

class __init_page {
    constructor(){
        this.originWidth = 414;
        this.__resize();
        window.addEventListener('resize', this.__resize, false);
        setTimeout(()=>{document.querySelector('.welcome-page').style.display = 'none';}, 4000);
    }
    __resize(){
        this.currClientWidth = document.documentElement.clientWidth;
        if (this.currClientWidth > 640) this.currClientWidth = 640;
        if (this.currClientWidth < 320) this.currClientWidth = 320;
        this.fontValue = ((62.5 * this.currClientWidth) / this.originWidth).toFixed(2);
        document.documentElement.style.fontSize = this.fontValue + '%';
        this.currClientHeight = document.documentElement.clientHeight;
        this.style = document.querySelector('.welcome-page').style;
        this.style.height = this.style.lineHeight = this.currClientHeight + 'px';
    }
}

new Vue({
    el: '#app',
    mounted(){
        new __init_page();
    },
    components: {
        appMain
    }
});