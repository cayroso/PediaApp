<template>
    <div v-cloak>
        <app-bar :uid="uid" :appName="appName" :urlProfilePicture="urlProfilePicture" :menus="menus"></app-bar>
        <main class="container-lg main" :style="bottomNavHeightStyle">
            <router-view :uid="uid"></router-view>
        </main>

        <bottom-nav ref="bottomNav" :menus="menus"></bottom-nav>
        <modal-view-chat ref="modalViewChat" :uid="uid"></modal-view-chat>
    </div>
</template>
<script>
    'use strict';
    import appMixin from '../../../_Core/Mixins/appMixin';

    import modalViewChat from '../../../_Core/Modals/Chats/view.vue';

    //import SystemBar from './system-bar.vue';
    import AppBar from './app-bar.vue';
    import NavDrawer from './nav-drawer.vue';
    //import AppFooter from './footer.vue';
    import BottomNav from './bottom-nav.vue';

    export default {
        mixins: [appMixin],
        components: {
            modalViewChat,
            //SystemBar,
            AppBar, NavDrawer,
            //AppFooter,
            BottomNav,

        },
        props: {
            uid: String,
            appName: String,
            urlProfilePicture: String,
        },
        data() {
            return {
                menus: [
                    { to: '/', label: 'Dashboard', icon: 'fas fa-fw fa-tachometer-alt' },
                    { to: '/appointments', label: 'Appointments', icon: 'fas fa-fw fa-calendar' },
                    { to: '/parents', label: 'Parents', icon: 'fas fa-fw fa-user' },
                    { to: '/clinic', label: 'Clinic', icon: 'fas fa-fw fa-clinic-medical' },
                    { to: '/staffs', label: 'Staffs', icon: 'fas fa-fw fa-users' },

                ],
                bottomNavHeightStyle: null
            }
        },
        async mounted() {
            const vm = this;

            vm.setupEventReceivers();
        },
        async created() {
            //const vm = this;
            //let theme = localStorage.getItem('theme') || '';
            //if (theme) {
            //    //debugger;
            //    let style = document.createElement('link');
            //    style.type = "text/css";
            //    style.rel = "stylesheet";
            //    style.href = theme;// 'https://bootswatch.com/4/yeti/bootstrap.min.css';
            //    document.head.appendChild(style);
            //}
        },
        methods: {

            displayToast(resp, variant) {
                const vm = this;
                let content = resp.content;
                content = content.replace(/<b>/g, '');
                content = content.replace(/<\/b>/g, '');
                content = content.replace(/<br\/>/g, '');

                vm.$bvToast.toast(content, {
                    title: resp.title,
                    variant: variant,
                    solid: true
                });
            },

            setupEventReceivers() {
                const vm = this;

                //  parent
                vm.$bus.$on('event:parent-requested', resp => vm.displayToast(resp, 'info'));
                vm.$bus.$on('event:parent-rejected', resp => vm.displayToast(resp, 'danger'));
                vm.$bus.$on('event:parent-accepted', resp => vm.displayToast(resp, 'success'));
                vm.$bus.$on('event:parent-cancelled', resp => vm.displayToast(resp, 'warning'));
                vm.$bus.$on('event:parent-deleted', resp => vm.displayToast(resp, 'danger'));

            },
        }
    }
</script>
