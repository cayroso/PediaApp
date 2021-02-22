'use strict';

import VueRouter from 'vue-router';

import index from './Pages/index.vue';

import accountsIndex from './Pages/Accounts/index.vue';

import appointmentsIndex from './Pages/Appointments/index.vue';
import appointmentsAdd from './Pages/Appointments/add.vue';
import appointmentsView from './Pages/Appointments/index.vue';

import parentsIndex from './Pages/Parents/index.vue';
import parentsView from './Pages/Parents/index.vue';

import staffsIndex from './Pages/Staffs/index.vue';
import staffsAdd from './Pages/Staffs/add.vue';
import staffsView from './Pages/Staffs/view.vue';

import clinicIndex from './Pages/Clinic/index.vue';

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

    { path: '/parents', name: "parentsIndex", component: parentsIndex },
    { path: '/parents/view/:id', name: "parentsView", component: parentsView, props: true },

    { path: '/clinic', name: "clinicIndex", component: clinicIndex },

    { path: '/staffs', name: "staffsIndex", component: staffsIndex },
    { path: '/staffs/add', name: "staffsAdd", component: staffsAdd },
    { path: '/staffs/view/:id', name: "staffsView", component: staffsView, props: true },

    { path: '*', component: NotFound },
];

const router = new VueRouter({
    base:'/pedia',
    mode: "history",
    routes: routes,
});

export default router;
