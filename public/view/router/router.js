import Home from '../components/home.js';
import Dashboard from '../components/dashboard.js';
import AdminDashboard from '../components/AdminDashboard.js';
import EmployeeDashboard from '../components/EmployeeDashboard.js';
import ManageUser from '../components/ManageUser.js';
import ManageArea from '../components/ManageArea.js';
import ManageRider from '../components/ManageRider.js';
import Register from '../components/register.js';

const routes = [
    { path: '/login', name:'Login', component: Home,
        meta: {
            guest: true
        } },
    { path: '/register', name:'Register', component: Register,
        meta: {
            guest: true
        } },
    { path: '/dashboard', name:'Dashboard', component: Dashboard,
        meta: {
            requiresAuth: true
        }
    },
    { path: '/admin/dashboard', name:'AdminDashboard', component: AdminDashboard,
        meta: {
            requiresAuth: true
        } },
    { path: '/employee/dashboard', name:'EmployeeDashboard', component: EmployeeDashboard ,
        meta: {
            requiresAuth: true
        }},
    { path: '/manage-user', name:'ManageUser', component: ManageUser ,
        meta: {
            requiresAuth: true
        }},
    { path: '/manage-area', name:'ManageArea', component: ManageArea ,
        meta: {
            requiresAuth: true
        }},
    { path: '/manage-raider', name:'ManageRider', component: ManageRider ,
        meta: {
            requiresAuth: true
        }},
    { path: '/home', name:'Home', component: Home ,
        meta: {
            guest: true
        }},
    { path: '/', name:'default', component: Home ,
        meta: {
            guest: true
        }}
];

let router = new VueRouter({
    routes
});

router.beforeEach((to, from, next) => {
    var user = JSON.parse(localStorage.getItem("loggedInUser"));
    console.log(localStorage.getItem('ThemeParkaccessToken'));
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('ThemeParkaccessToken') == null) {
            next({
                path: '/Login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            if(user.user_type == 'Admin' && (to.path =='/dashboard' || to.path =='/employee/dashboard')){
                next({ name: 'AdminDashboard'})
            }else if(user.user_type == 'Employee' && (to.path =='/dashboard' || to.path =='/admin/dashboard')){
                next({ name: 'EmployeeDashboard'})
            }else if(user.user_type == 'Customer' &&  (to.path =='/employee/dashboard' || to.path =='/admin/dashboard')){
                next({ name: 'Dashboard'})
            }else{
                next()
            }
        }
    } else if(to.matched.some(record => record.meta.guest)) {
        if(user == null){
            next()
        }
        else{
            if(user.user_type == 'Admin'){
                next({ name: 'AdminDashboard'})
            }else if(user.user_type == 'Employee'){
                next({ name: 'EmployeeDashboard'})
            }else if(user.user_type == 'Customer'){
                next({ name: 'Dashboard'})
            }else{
                next()
            }
        }
    }else {
        next()
    }
})

export default router;
