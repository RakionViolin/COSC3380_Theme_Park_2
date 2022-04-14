import router from './router/router.js';
import Nav from './components/nav.js';

var app = new Vue({
    el: '#app',
    components: {
        'navbar': Nav
    },
    router
})
