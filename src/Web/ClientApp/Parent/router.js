'use strict';

import VueRouter from 'vue-router';

import index from './Pages/index.vue';

import accountsIndex from './Pages/Accounts/index.vue';

import contactsIndex from './Pages/Contacts/index.vue';
import contactsAdd from './Pages/Contacts/add.vue';
import contactsView from './Pages/Contacts/View/index.vue';

import childrenIndex from './Pages/Children/index.vue';
import childrenAdd from './Pages/Children/add.vue';
import childrenView from './Pages/Children/view.vue';


import clinicsIndex from './Pages/Clinics/index.vue';
import clinicsView from './Pages/Clinics/View/index.vue';
//import tasksAdd from './Pages/Tasks/add.vue';
//import tasksView from './Pages/Tasks/View/index.vue';

import tripsIndex from './Pages/Trips/index.vue';
import tripsAdd from './Pages/Trips/Add/index.vue';
import tripsView from './Pages/Trips/View/index.vue';

const NotFound = {
    template: '<div>Not found</div>'
};

const routes = [
    { path: '/', name: "index", component: index },

    { path: '/accounts', name: "accounts", component: accountsIndex },

    { path: '/contacts', name: "contacts", component: contactsIndex },
    { path: '/contacts/add', name: "contactsAdd", component: contactsAdd },
    { path: '/contacts/view/:id', name: "contactsView", component: contactsView, props: true },

    { path: '/children', name: "childrenIndex", component: childrenIndex },
    { path: '/children/add', name: "childrenAdd", component: childrenAdd },
    { path: '/children/view/:id', name: "childrenView", component: childrenView, props: true },

    { path: '/clinics', name: "clinicsIndex", component: clinicsIndex },
    //{ path: '/trips/add', name: "tripsAdd", component: tripsAdd },
    { path: '/clinics/view/:id', name: "clinicsView", component: clinicsView, props: true },

    { path: '*', component: NotFound },
];

const router = new VueRouter({
    base:'/parent',
    mode: "history",
    routes: routes,
});

export default router;
