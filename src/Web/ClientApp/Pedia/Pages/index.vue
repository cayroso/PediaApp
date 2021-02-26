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

        <div class="row row-cols-1 row-cols-sm-3 mt-2">

            <div class="col mb-2">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-row justify-content-between align-items-baseline">
                            <h5 class="card-title">Requested</h5>
                            <i class="fas fa-fw fa-lg fa-calendar"></i>
                        </div>
                        <div class="d-flex flex-row justify-content-between">
                            <b>
                                {{item.monthRequested}}
                            </b>
                            <div>
                                Month
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between">
                            <b>
                                {{item.weekRequested}}
                                <i v-if="item.weekRequested>=item.lastWeekRequested" class="fas fa-fw fa-arrow-up text-success"></i>
                                <i v-else class="fas fa-fw fa-arrow-down text-danger"></i>
                            </b>
                            <div>
                                Week
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col mb-2">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-row justify-content-between align-items-baseline">
                            <h5 class="card-title">Cancelled</h5>
                            <i class="fas fa-fw fa-lg fa-calendar"></i>
                        </div>
                        <div class="d-flex flex-row justify-content-between">
                            <b>
                                {{item.monthCancelled}}
                            </b>
                            <div>
                                Month
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between">
                            <b>
                                {{item.weekCancelled}}
                                <i v-if="item.weekCancelled<item.lastWeekCancelled" class="fas fa-fw fa-arrow-up text-success"></i>
                                <i v-else class="fas fa-fw fa-arrow-down text-danger"></i>
                            </b>
                            <div>
                                Week
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="col mb-2">
                <div class="card">
                    <div class="card-body">
                        <div class="d-flex flex-row justify-content-between align-items-baseline">
                            <h5 class="card-title">Completed</h5>
                            <i class="fas fa-fw fa-lg fa-calendar"></i>
                        </div>
                        <div class="d-flex flex-row justify-content-between">
                            <b>
                                {{item.monthCompleted}}
                            </b>
                            <div>
                                Month
                            </div>
                        </div>
                        <div class="d-flex flex-row justify-content-between">
                            <b>
                                {{item.weekCompleted}}
                                <i v-if="item.weekCompleted>=item.lastWeekCompleted" class="fas fa-fw fa-arrow-up text-success"></i>
                                <i v-else class="fas fa-fw fa-arrow-down text-danger"></i>
                            </b>
                            <div>
                                Week
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-2">
            <div class="card border-success">
                <div class="card-header bg-success text-white">
                        <b>Upcoming Appointments</b>
                </div>
                <div class="table-responsive mb-0">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Ref Number</th>
                                <th>Parent</th>
                                <th>Child</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(t,index) in item.upcomingAppointments">
                                <td>{{index+1}}</td>
                                <td>{{t.referenceNumber}}</td>
                                <td>
                                    {{t.child.parent.user.firstName}} {{t.child.parent.user.middleName}} {{t.child.parent.user.lastName}}
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
                    await vm.$util.axios.get(`/api/pedias/default/dashboard`)
                        .then(resp => vm.item = resp.data);

                    //vm.item.upcomingAppointments = [];
                } catch (e) {
                    vm.$util.handleError(e);
                }
            }
        }
    }
</script>