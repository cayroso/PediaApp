<template>
    <div v-cloak>
        <div class="row align-items-center">
            <div class="col">
                <h1 class="h3 mb-sm-0">
                    <i class="fas fa-fw fa-tachometer-alt mr-1"></i>Dashboard
                </h1>
            </div>
            <div class="col-auto">
                <button @click="get" class="btn btn-outline-primary">
                    <i class="fas fa-fw fa-sync"></i>
                </button>
            </div>
        </div>

        <div class="mt-2">
            <div class="card border-success">
                <div class="card-header bg-success text-white">
                    <div class="d-flex flex-row justify-content-between align-items-baseline">
                        <b>Upcoming</b>
                        <i class="fas fa-fw fa-lg fa-user-tie"></i>
                    </div>

                </div>
                <div class="table-responsive mb-0">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ref Number</th>
                                <th>Child</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(t,index) in item.upcomingAppointments">
                                <td>{{index+1}}</td>
                                <td>                                    
                                    <router-link :to="{name: 'clinicsAddAppointment', params:{id:t.clinicId}, query:{appointmentId: t.appointmentId}}">
                                        {{t.referenceNumber}}
                                    </router-link>
                                </td>
                                <td>
                                    {{t.child.firstName}} {{t.child.middleName}} {{t.child.lastName}}
                                </td>

                                <td>{{t.dateStart|moment('calendar')}} - {{t.dateEnd|moment('calendar')}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-7">
                <div class="mt-2">
                    <div class="card border-info">
                        <div class="card-header bg-info text-white">
                            <b>Requested</b>
                        </div>
                        <div class="table-responsive mb-0">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ref Number</th>
                                        <th>Child</th>
                                        <th>Date</th>
                                        <th>Needs My Approval</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(t,index) in item.needsApprovalAppointments">
                                        <td>{{index+1}}</td>
                                        <td>
                                            <router-link :to="{name: 'clinicsAddAppointment', params:{id:t.clinicId}, query:{appointmentId: t.appointmentId}}">
                                                {{t.referenceNumber}}
                                            </router-link>
                                        </td>
                                        <td>
                                            {{t.child.firstName}} {{t.child.middleName}} {{t.child.lastName}}
                                        </td>

                                        <td>{{t.dateStart|moment('calendar')}} - {{t.dateEnd|moment('calendar')}}</td>
                                        <td>
                                            <span v-if="t.status === 2">
                                                Yes
                                            </span>
                                            <span v-else>
                                                No
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md">
                <div class="mt-2">
                    <div class="card border-danger">
                        <div class="card-header bg-danger text-white">
                            <div class="d-flex flex-row justify-content-between align-items-baseline">
                                <b>Overdue</b>
                                <i class="fas fa-fw fa-lg fa-user-tie"></i>
                            </div>

                        </div>
                        <div class="table-responsive mb-0">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Ref Number</th>
                                        <th>Child</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(t,index) in item.overdueAppointments">
                                        <td>{{index+1}}</td>
                                        <td>
                                            <router-link :to="{name: 'clinicsAddAppointment', params:{id:t.clinicId}, query:{appointmentId: t.appointmentId}}">
                                                {{t.referenceNumber}}
                                            </router-link>
                                        </td>
                                        <td>
                                            {{t.child.firstName}} {{t.child.middleName}} {{t.child.lastName}}
                                        </td>

                                        <td>{{t.dateStart|moment('calendar')}} - {{t.dateEnd|moment('calendar')}}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    import pageMixin from '../../_Core/Mixins/pageMixin';

    export default {
        mixins: [pageMixin],

        props: {
            uid: String,
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

            await vm.get();
        },

        methods: {
            async get() {
                const vm = this;

                try {
                    await vm.$util.axios.get(`/api/parents/default/dashboard`)
                        .then(resp => vm.item = resp.data);

                    //vm.item.upcomingAppointments = [];
                } catch (e) {
                    vm.$util.handleError(e);
                }
            }
        }
    }
</script>