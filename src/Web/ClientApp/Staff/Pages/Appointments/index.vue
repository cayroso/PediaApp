<template>
    <my-page :uid="uid" :pedia="false"></my-page>
</template>
<script>
    import myPage from './../../../_Common/Components/Clinic/Appointments/index.vue';

    export default {
        components: {
            myPage
        },
        props: {
            uid: String,
        },

        data() {
            return {

            };
        },

        computed: {

        },

        async created() {
            const vm = this;
        },

        async mounted() {
            const vm = this;

        },

        methods: {

        }
    }
</script>