<template>
    <div v-cloak>
        View Clinic

        <router-link :to="{name: 'clinicsAddAppointment', params:{id: id}}">
            Book Appointment
        </router-link>
    </div>
</template>
<script>
    import pageMixin from '../../../../_Core/Mixins/pageMixin';

    export default {
        mixins: [pageMixin],

        props: {
            uid: String,
            id: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                item: {}
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