'use strict';

import VueRouter from 'vue-router';

import index from './Pages/index.vue';

import accountsIndex from './Pages/Accounts/index.vue';

import appointmentsIndex from './Pages/Appointments/index.vue';
//import contactsAdd from './Pages/Contacts/add.vue';
import appointmentsView from './Pages/Appointments/view.vue';

import childrenIndex from './Pages/Children/index.vue';
import childrenAdd from './Pages/Children/add.vue';
import childrenView from './Pages/Children/view.vue';


import clinicsIndex from './Pages/Clinics/index.vue';
import clinicsView from './Pages/Clinics/View/index.vue';
import clinicsAddAppointment from './Pages/Clinics/View/add-appointment.vue';
//import tasksAdd from './Pages/Tasks/add.vue';
//import tasksView from './Pages/Tasks/View/index.vue';

import calendarIndex from './Pages/Calendar/index.vue';
//import tripsAdd from './Pages/Trips/Add/index.vue';
//import tripsView from './Pages/Trips/View/index.vue';

const NotFound = {
    template: '<div>Not found</div>'
};

const routes = [
    { path: '/', name: "index", component: index },

    { path: '/accounts', name: "accountsIndex", component: accountsIndex },

    { path: '/calendar', name: "calendarIndex", component: calendarIndex },

    { path: '/appointments', name: "appointmentsIndex", component: appointmentsIndex },    
    { path: '/appointments/view/:id', name: "appointmentsView", component: appointmentsView, props: true },

    { path: '/children', name: "childrenIndex", component: childrenIndex },
    { path: '/children/add', name: "childrenAdd", component: childrenAdd },
    { path: '/children/view/:id', name: "childrenView", component: childrenView, props: true },

    { path: '/clinics', name: "clinicsIndex", component: clinicsIndex },
    
    { path: '/clinics/view/:id', name: "clinicsView", component: clinicsView, props: true },
    { path: '/clinics/view/:id/add-appointment', name: "clinicsAddAppointment", component: clinicsAddAppointment, props: true },

    


    { path: '*', component: NotFound },
];

const router = new VueRouter({
    base:'/parent',
    mode: "history",
    routes: routes,
});

export default router;
