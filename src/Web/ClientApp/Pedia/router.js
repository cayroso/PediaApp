'use strict';

import VueRouter from 'vue-router';

import index from './Pages/index.vue';

import accountsIndex from './Pages/Accounts/index.vue';

//import contactsIndex from './Pages/Contacts/index.vue';

import appointmentsIndex from './Pages/Appointments/index.vue';
import appointmentsAdd from './Pages/Appointments/add.vue';
import appointmentsView from './Pages/Appointments/index.vue';

import clinicIndex from './Pages/Clinic/index.vue';
//import usersAdd from './Pages/Users/add.vue';
//import usersView from './Pages/Users/view.vue';


//import tasksIndex from './Pages/Tasks/index.vue';
//import tasksAdd from './Pages/Tasks/add.vue';
//import tasksView from './Pages/Tasks/View/index.vue';

const NotFound = {
    template: '<div>Not found</div>'
};

const routes = [
    { path: '/', name: "index", component: index },

    { path: '/accounts', name: "accounts", component: accountsIndex },

    //{ path: '/contacts', name: "contacts", component: contactsIndex },

    { path: '/appointments', name: "appointmentsIndex", component: appointmentsIndex },
    { path: '/appointments/add', name: "appointmentsAdd", component: appointmentsAdd },
    { path: '/appointments/view/:id', name: "appointmentsView", component: appointmentsView, props: true },

    { path: '/clinic', name: "clinicIndex", component: clinicIndex },
    //{ path: '/users/add', name: "usersAdd", component: usersAdd },
    //{ path: '/users/view/:id', name: "usersView", component: usersView, props: true },

    //{ path: '/tasks', name: "tasks", component: tasksIndex },

    { path: '*', component: NotFound },
];

const router = new VueRouter({
    base:'/pedia',
    mode: "history",
    routes: routes,
});

export default router;
