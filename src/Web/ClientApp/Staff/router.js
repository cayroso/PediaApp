'use strict';

import VueRouter from 'vue-router';

import index from './Pages/index.vue';

import accountsIndex from './Pages/Accounts/index.vue';

import appointmentsIndex from './Pages/Appointments/index.vue';

import childrenIndex from './Pages/Children/index.vue';
import childrenView from './Pages/Children/view.vue';

import parentsIndex from './Pages/Parents/index.vue';
import parentsView from './Pages/Parents/view.vue';

const NotFound = {
    template: '<div>Not found</div>'
};

const routes = [
    { path: '/', name: "index", component: index },

    { path: '/accounts', name: "accounts", component: accountsIndex },

    //{ path: '/contacts', name: "contacts", component: contactsIndex },

    { path: '/appointments', name: "appointmentsIndex", component: appointmentsIndex },
    //{ path: '/appointments/add', name: "appointmentsAdd", component: appointmentsAdd },
    //{ path: '/appointments/view/:id', name: "appointmentsView", component: appointmentsView, props: true },

    { path: '/children', name: "childrenIndex", component: childrenIndex },
    { path: '/children/view/:id', name: "childrenView", component: childrenView, props: true },

    { path: '/parents', name: "parentsIndex", component: parentsIndex },
    { path: '/parents/view/:id', name: "parentsView", component: parentsView, props: true },

    { path: '*', component: NotFound },
];

const router = new VueRouter({
    base: '/staff',
    mode: "history",
    routes: routes,
});

export default router;
